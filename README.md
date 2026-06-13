<div align="center">

# AI Safety &amp; Society — An Exhibition

**An open-source museum exhibition making AI safety tangible for everyone.**

[**🔵 Live site →**](https://museum-ai-safety.vercel.app) &nbsp;·&nbsp;
[**🖐 Exhibits →**](https://museum-ai-safety.vercel.app/gallery.html) &nbsp;·&nbsp;
[**✋ Contribute an exhibit →**](#contributing) &nbsp;·&nbsp;
[**🙋 Volunteer →**](https://docs.google.com/forms/d/e/1FAIpQLSckGPa53Gh9MHLsXTkYyg_25DlB224IwXPU-QxoMdaZR34zOw/viewform)

Berlin · Est. 2026 · Open source from the start

</div>

---

Artificial intelligence is reshaping how we live, work, and decide together. **AI Safety &amp;
Society** is a hands-on exhibition in Berlin where anyone can experience AI up close — question
how it works, see where it fails, and understand what's at stake.

It's **open source from the start**: the exhibitions, research, designs, and code are published
openly, so any community anywhere can adapt, remix, and build on what we make. This repository is
where the exhibition is built in public — and where **you can contribute an interactive exhibit**.

## What lives here

| | |
|---|---|
| [`index.html`](index.html) | The exhibition's front door — the landing page (also where founding volunteers sign up). |
| [`gallery.html`](gallery.html) | The exhibit gallery — every interactive, browsable and filterable by topic. |
| [`exhibits/`](exhibits/) | One folder per **in-repo interactive exhibit**, each self-contained. Start from [`exhibits/_template/`](exhibits/_template/). |
| [`registry/`](registry/external-exhibits.json) | **Externally-hosted exhibits** — pieces that live on someone else's site but are part of the collection. |
| [`scripts/build-gallery.mjs`](scripts/build-gallery.mjs) | Zero-dependency script that validates every exhibit and regenerates `exhibits.json`. |
| `exhibits.json` | Generated index the gallery reads. Don't edit by hand — run the build. |

## Try it locally

It's a static site — no framework, no install.

```bash
git clone https://github.com/justinshenk/museum-ai-safety.git
cd museum-ai-safety
python3 -m http.server 8000      # then open http://localhost:8000
```

To (re)generate the gallery index after adding or editing an exhibit:

```bash
npm run build        # = node scripts/build-gallery.mjs
npm run validate     # checks manifests and that exhibits.json is up to date (also runs in CI)
```

Node's only used for that build step; the site itself ships as plain static files.

<a id="contributing"></a>
## Contribute an interactive exhibit

This is the heart of the project. An exhibit is **one self-contained interactive** — no framework,
no build step. There are two ways to add one:

1. **Host it here (recommended).** Copy [`exhibits/_template/`](exhibits/_template/) to
   `exhibits/<your-slug>/`, build your interactive in `index.html`, fill in `exhibit.json`, run
   `npm run build`, and open a pull request. It deploys with the museum at
   `museum-ai-safety.vercel.app/exhibits/<your-slug>/`.
2. **Link an externally-hosted piece.** Add an entry to
   [`registry/external-exhibits.json`](registry/external-exhibits.json) and open a PR.

Full step-by-step instructions, the manifest schema, and review criteria are in
**[CONTRIBUTING.md](CONTRIBUTING.md)**. New contributors and students are explicitly welcome — you
need curiosity, not museum experience.

> **Featured seed exhibit:** [**The Proxy Trap**](exhibits/reward-hacking/) — turn up the
> optimization pressure and watch a cleaning robot maximize the reward it can measure while the
> goal you actually wanted falls apart. A hands-on intro to reward hacking and Goodhart's Law.

## Topics we explore

Alignment · Interpretability · Deception &amp; persuasion · Deepfakes &amp; misinformation ·
Bias &amp; fairness · Autonomy &amp; human oversight · AI governance &amp; policy ·
Work &amp; the economy · Human–AI relationships · Catastrophic &amp; existential risk

## Ways to get involved (beyond exhibits)

Founding volunteers work directly with the core team and partner network, ~2–5 hrs/week,
remote-friendly, rooted in Berlin. Roles:

- **Exhibition &amp; Experience Design** — prototype installations and interactives.
- **Research &amp; Curation** — translate AI safety research into stories the public can grasp.
- **Programs &amp; Events** — shape and host talks, workshops, community evenings.
- **Communications &amp; Story** — give the museum its public voice.
- **Operations &amp; Partnerships** — fundraising, logistics, institution-building.

👉 **[Become a founding volunteer](https://docs.google.com/forms/d/e/1FAIpQLSckGPa53Gh9MHLsXTkYyg_25DlB224IwXPU-QxoMdaZR34zOw/viewform)**

## Partners

[Foresight Institute](https://foresight.org) · Berlin AI Safety Office · Æthos · AI Salon Berlin

## Organizer

[**Justin Shenk**](https://justinshenk.com) — AI researcher and community builder in Berlin.

## License

Dual-licensed so both the code and the exhibition content can be reused:

- **Code** — [MIT](LICENSE) (build scripts, site/gallery markup, exhibit program logic).
- **Content** — [CC BY 4.0](LICENSE-CONTENT) (exhibit text, designs, visuals, educational substance),
  unless an individual exhibit declares otherwise in its manifest.

By contributing, you agree to release your code under MIT and your content under CC BY 4.0
(or the license you set in your exhibit's manifest). See [CONTRIBUTING.md](CONTRIBUTING.md).

## Deployment

The site auto-deploys to [Vercel](https://vercel.com) as a static site on push to `main`. See
[DEPLOY.md](DEPLOY.md). Anyone can fork it and deploy their own exhibition the same way.
