#!/usr/bin/env node
// Build the gallery index for the AI Safety & Society exhibition.
//
// Scans every in-repo exhibit (exhibits/<slug>/exhibit.json) plus the
// externally-hosted registry (registry/external-exhibits.json), validates each
// manifest, and writes the combined list to exhibits.json — which gallery.html
// renders client-side.
//
// Zero dependencies: Node built-ins only, so contributors never run `npm install`.
//
//   node scripts/build-gallery.mjs          # regenerate exhibits.json
//   node scripts/build-gallery.mjs --check   # validate only; fail if exhibits.json is stale (used in CI)

import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const EXHIBITS_DIR = join(ROOT, 'exhibits');
const REGISTRY_FILE = join(ROOT, 'registry', 'external-exhibits.json');
const OUTPUT_FILE = join(ROOT, 'exhibits.json');

// Canonical topic tags (must match the topics named on the landing page).
const TOPICS = new Set([
  'alignment', 'interpretability', 'deception', 'persuasion', 'deepfakes',
  'misinformation', 'bias', 'fairness', 'autonomy', 'oversight',
  'governance', 'policy', 'economy', 'relationships', 'reward-hacking',
  'catastrophic-risk', 'existential-risk', 'evaluation', 'robustness', 'other',
]);

const REQUIRED = ['title', 'slug', 'summary', 'topics', 'author', 'thumbnail', 'license'];
const errors = [];

function fail(where, msg) {
  errors.push(`${where}: ${msg}`);
}

function validate(manifest, where, { external }) {
  for (const field of REQUIRED) {
    if (manifest[field] === undefined || manifest[field] === '') fail(where, `missing required field "${field}"`);
  }
  if (manifest.author && typeof manifest.author === 'object' && !manifest.author.name) {
    fail(where, 'author.name is required');
  }
  if (!Array.isArray(manifest.topics) || manifest.topics.length === 0) {
    fail(where, 'topics must be a non-empty array');
  } else {
    for (const t of manifest.topics) {
      if (!TOPICS.has(t)) fail(where, `unknown topic "${t}" (see TOPICS in scripts/build-gallery.mjs)`);
    }
  }
  if (manifest.slug && !/^[a-z0-9][a-z0-9-]*$/.test(manifest.slug)) {
    fail(where, `slug "${manifest.slug}" must be lowercase kebab-case`);
  }
  if (external && !manifest.url) fail(where, 'external exhibits require a "url"');
}

// --- In-repo exhibits ------------------------------------------------------
const inRepo = [];
if (existsSync(EXHIBITS_DIR)) {
  for (const name of readdirSync(EXHIBITS_DIR).sort()) {
    if (name.startsWith('_') || name.startsWith('.')) continue; // skip _template etc.
    const dir = join(EXHIBITS_DIR, name);
    if (!statSync(dir).isDirectory()) continue;
    const manifestPath = join(dir, 'exhibit.json');
    if (!existsSync(manifestPath)) {
      fail(`exhibits/${name}`, 'missing exhibit.json');
      continue;
    }
    let manifest;
    try {
      manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    } catch (e) {
      fail(`exhibits/${name}/exhibit.json`, `invalid JSON: ${e.message}`);
      continue;
    }
    validate(manifest, `exhibits/${name}`, { external: false });
    if (manifest.slug && manifest.slug !== name) {
      fail(`exhibits/${name}`, `slug "${manifest.slug}" must match folder name "${name}"`);
    }
    const entry = manifest.entry || 'index.html';
    if (!existsSync(join(dir, entry))) fail(`exhibits/${name}`, `entry file "${entry}" not found`);
    if (manifest.thumbnail && !existsSync(join(dir, manifest.thumbnail))) {
      fail(`exhibits/${name}`, `thumbnail "${manifest.thumbnail}" not found`);
    }
    inRepo.push({
      ...manifest,
      external: false,
      path: `exhibits/${name}/${entry}`,
      thumbnail: `exhibits/${name}/${manifest.thumbnail}`,
    });
  }
}

// --- External registry -----------------------------------------------------
const external = [];
if (existsSync(REGISTRY_FILE)) {
  let list;
  try {
    list = JSON.parse(readFileSync(REGISTRY_FILE, 'utf8'));
  } catch (e) {
    fail('registry/external-exhibits.json', `invalid JSON: ${e.message}`);
    list = [];
  }
  if (!Array.isArray(list)) {
    fail('registry/external-exhibits.json', 'must be a JSON array');
    list = [];
  }
  for (const manifest of list) {
    const where = `registry/${manifest.slug || '?'}`;
    validate(manifest, where, { external: true });
    external.push({ ...manifest, external: true });
  }
}

// --- Emit ------------------------------------------------------------------
if (errors.length) {
  console.error(`\n✗ ${errors.length} validation error(s):\n`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error('');
  process.exit(1);
}

const all = [...inRepo, ...external].sort((a, b) => (b.added || '').localeCompare(a.added || ''));
const output = {
  generated: 'run `node scripts/build-gallery.mjs` to regenerate',
  count: all.length,
  exhibits: all,
};
const serialized = JSON.stringify(output, null, 2) + '\n';

if (process.argv.includes('--check')) {
  const current = existsSync(OUTPUT_FILE) ? readFileSync(OUTPUT_FILE, 'utf8') : '';
  if (current !== serialized) {
    console.error('✗ exhibits.json is out of date. Run `node scripts/build-gallery.mjs` and commit the result.');
    process.exit(1);
  }
  console.log(`✓ exhibits.json is up to date (${all.length} exhibit(s)).`);
} else {
  writeFileSync(OUTPUT_FILE, serialized);
  console.log(`✓ Wrote exhibits.json — ${inRepo.length} in-repo, ${external.length} external, ${all.length} total.`);
}
