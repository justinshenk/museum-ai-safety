# Exhibit template

Copy this folder to `exhibits/<your-slug>/` and make it yours. An exhibit is a
**self-contained interactive** — one folder, no build step, no framework required.

## Checklist

1. **Copy the folder.** `cp -r exhibits/_template exhibits/your-slug`
2. **Edit `exhibit.json`** — the manifest the gallery reads. Fields:

   | Field       | Required | Notes |
   |-------------|----------|-------|
   | `title`     | yes      | Display name. |
   | `slug`      | yes      | Lowercase kebab-case. **Must equal the folder name.** |
   | `summary`   | yes      | One sentence for the gallery card. |
   | `topics`    | yes      | One or more tags from the canonical list (see below). |
   | `author`    | yes      | `{ "name": "...", "url": "..." }` — `name` required, `url` optional. |
   | `thumbnail` | yes      | Path within your folder (an SVG or small PNG). |
   | `entry`     | no       | Defaults to `index.html`. |
   | `license`   | yes      | `CC-BY-4.0` for content (recommended), or another SPDX id. |
   | `added`     | no       | `YYYY-MM-DD`; controls gallery ordering (newest first). |

3. **Build your interactive in `index.html`.** Keep it self-contained: inline or
   folder-local CSS/JS and assets. No network calls to private services. It must
   work when served as a plain static file at `/exhibits/your-slug/`.
4. **Add a `thumbnail.svg`** (or PNG) — roughly 16:10, readable as a small card.
5. **Regenerate the index:** `npm run build` (or `node scripts/build-gallery.mjs`).
   This validates your manifest and rewrites `exhibits.json`. Commit that too.
6. **Open a PR.** CI re-runs validation. See [`CONTRIBUTING.md`](../../CONTRIBUTING.md).

## Canonical topics

`alignment`, `interpretability`, `deception`, `persuasion`, `deepfakes`,
`misinformation`, `bias`, `fairness`, `autonomy`, `oversight`, `governance`,
`policy`, `economy`, `relationships`, `reward-hacking`, `catastrophic-risk`,
`existential-risk`, `evaluation`, `robustness`, `other`.

Need a topic that isn't here? Add it to the `TOPICS` set in
`scripts/build-gallery.mjs` in the same PR.

## Licensing

Code you add is offered under **MIT**; exhibit content (text, visuals, the
interactive itself) under **CC BY 4.0** unless your `license` field says otherwise.
See the repo root [`LICENSE`](../../LICENSE) and [`LICENSE-CONTENT`](../../LICENSE-CONTENT).
