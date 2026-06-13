# Contributing to AI Safety &amp; Society

Thank you for helping build an open-source museum exhibition on AI safety. The most valuable thing
you can contribute is an **interactive exhibit** — but copy edits, bug fixes, new topics, and
externally-hosted submissions are all welcome too.

You don't need museum experience or a research background. You need curiosity and a few hours.

## Ways to contribute

1. **Add an in-repo interactive exhibit** (recommended) — a self-contained piece hosted with the museum.
2. **Register an externally-hosted exhibit** — a great interactive that lives on your own site.
3. **Improve the site or tooling** — landing page, gallery, build script, docs.
4. **Propose an idea** — open an [exhibit proposal issue](../../issues/new/choose) before building.

---

## 1. Add an in-repo interactive exhibit

An exhibit is **one folder, self-contained, no framework, no build step**. It must work when served
as plain static files.

### Steps

```bash
# 1. Fork & clone, then copy the template
cp -r exhibits/_template exhibits/your-slug

# 2. Build your interactive in exhibits/your-slug/index.html
#    (inline or folder-local CSS/JS/assets only — no calls to private services)

# 3. Fill in exhibits/your-slug/exhibit.json  (schema below)

# 4. Add a thumbnail (SVG or small PNG, ~16:10)

# 5. Regenerate and validate the gallery index
npm run build          # writes exhibits.json
npm run validate       # must pass — CI runs this on your PR

# 6. Test it locally
python3 -m http.server 8000
#   open http://localhost:8000/gallery.html  and  /exhibits/your-slug/

# 7. Commit exhibits/your-slug/** AND the updated exhibits.json, then open a PR
```

See [`exhibits/_template/README.md`](exhibits/_template/README.md) for a field-by-field walkthrough,
and [`exhibits/reward-hacking/`](exhibits/reward-hacking/) for a complete working reference.

### Manifest schema (`exhibit.json`)

| Field       | Required | Description |
|-------------|----------|-------------|
| `title`     | ✓ | Display name. |
| `slug`      | ✓ | Lowercase kebab-case. **Must equal the folder name.** |
| `summary`   | ✓ | One sentence for the gallery card. |
| `topics`    | ✓ | Array of one or more [canonical topics](#canonical-topics). |
| `author`    | ✓ | `{ "name": "...", "url": "..." }` — `name` required, `url` optional. |
| `thumbnail` | ✓ | Path to an image within your folder. |
| `entry`     |   | Entry file; defaults to `index.html`. |
| `license`   | ✓ | SPDX id for your content — `CC-BY-4.0` recommended. |
| `added`     |   | `YYYY-MM-DD`; newest exhibits sort first. |

### What makes a good exhibit

- **Hands-on.** The visitor *does* something and sees a consequence — not a slideshow.
- **One idea, done well.** A single concept (reward hacking, a classifier's blind spot, a
  jailbreak, an oversight gap) explored clearly beats a sprawling demo.
- **Honest.** Make the real dynamics visible; no hype, no doom. Cite sources where relevant.
- **Self-contained & lightweight.** Loads fast, works offline, degrades gracefully on mobile.
- **Accessible.** Readable contrast, keyboard-usable controls, alt text on meaningful images.
- **On-brand (optional but nice).** Reuse the shared palette/fonts from the template so the
  collection feels of-a-piece.

---

## 2. Register an externally-hosted exhibit

If your interactive already lives somewhere great, add it to
[`registry/external-exhibits.json`](registry/external-exhibits.json) — a JSON array. Each entry uses
the same fields as a manifest, plus a full `"url"`:

```json
{
  "title": "Your Interactive",
  "slug": "your-interactive",
  "summary": "One sentence for the card.",
  "topics": ["interpretability"],
  "author": { "name": "You", "url": "https://you.example" },
  "thumbnail": "https://you.example/thumb.png",
  "url": "https://you.example/your-interactive/",
  "license": "CC-BY-4.0",
  "added": "2026-06-13"
}
```

Then `npm run build && npm run validate` and open a PR. We may link any publicly accessible,
on-topic interactive; inclusion isn't an endorsement of the host.

<a id="canonical-topics"></a>
## Canonical topics

`alignment`, `interpretability`, `deception`, `persuasion`, `deepfakes`, `misinformation`, `bias`,
`fairness`, `autonomy`, `oversight`, `governance`, `policy`, `economy`, `relationships`,
`reward-hacking`, `catastrophic-risk`, `existential-risk`, `evaluation`, `robustness`, `other`.

Need a new one? Add it to the `TOPICS` set in
[`scripts/build-gallery.mjs`](scripts/build-gallery.mjs) in the same PR.

## Pull request checklist

- [ ] `npm run validate` passes locally.
- [ ] `exhibits.json` is committed and up to date (run `npm run build`).
- [ ] New/changed exhibit tested via a local server.
- [ ] Thumbnail included and referenced correctly.
- [ ] You're OK releasing code under **MIT** and content under your manifest's `license`
      (default **CC BY 4.0**).

## Licensing of contributions

By submitting, you agree your **code** is offered under [MIT](LICENSE) and your **content** under
the license in your exhibit's manifest — [CC BY 4.0](LICENSE-CONTENT) by default. Only contribute
work you have the right to license this way, and credit any third-party assets.

## Code of conduct

Participation is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). Be kind; assume good faith.

## Questions

Open an [issue](../../issues), or reach the organizer via [justinshenk.com](https://justinshenk.com).
