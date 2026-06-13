# Deployment

The site is a **static site** hosted on [Vercel](https://vercel.com). There is no build framework —
the repository root is served as-is, so `index.html`, `gallery.html`, `exhibits.json`, and every
`exhibits/<slug>/` folder are published directly.

Live: **https://museum-ai-safety.vercel.app**

## Continuous deployment (push → live)

The Vercel project is connected to this GitHub repository's Git integration:

- **Push to `main`** → Vercel builds and promotes a new **production** deploy automatically.
- **Open a pull request** → Vercel posts a **preview** deployment URL so changes can be reviewed
  live before merging.

No CLI step is needed for day-to-day updates — just merge to `main`.

### How the connection was set up (one-time)

The local project is linked to Vercel (`.vercel/project.json`, gitignored). To bind it to the
GitHub repo for auto-deploys:

```bash
vercel git connect          # connects the linked project to its GitHub remote
```

Or in the Vercel dashboard: **Project → Settings → Git → Connect Git Repository**, then pick
`justinshenk/museum-ai-safety`.

### Build & output settings (Vercel dashboard)

Because there's no framework, the defaults work:

| Setting          | Value                          |
|------------------|--------------------------------|
| Framework Preset | **Other**                      |
| Build Command    | *(empty)* — or `npm run build` to regenerate `exhibits.json` at deploy time |
| Output Directory | *(empty / repo root)*          |
| Install Command  | *(empty)* — no dependencies    |

> `exhibits.json` is committed, so a build command is optional. Setting it to `npm run build`
> guarantees the gallery index always matches the committed exhibits.

## Fork & host your own

This exhibition is open source — fork it and deploy your own in minutes:

1. Fork the repo on GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) (Framework Preset: **Other**).
3. Deploy. Your copy is live; add or remove exhibits and push.

## Local preview

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```
