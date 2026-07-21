# ethan-dang.github.io

Personal one-page website for Ethan Dang — IT Consultant & AI/Automation enthusiast.

Built with plain HTML, CSS, and TypeScript (compiled to JS) for the site, plus a small Express/TypeScript
backend for the contact form. Deployed as a static site via GitHub Pages.

## Project structure

```
index.html              Page markup (content sections are rendered by JS from src/ts/data.ts)
css/styles.css          Styling (light/dark theme, responsive, animations)
src/ts/data.ts          All profile content: experience, education, skills, extracurricular, etc.
src/ts/main.ts          Rendering + interactivity (nav, theme toggle, scroll effects, contact form)
js/                     Compiled output of src/ts — this is what index.html actually loads
server/                 Express + TypeScript API that emails contact form submissions (see server/README.md)
```

## Editing content

Everything on the page — experience, education, certifications, skills, languages, and the (currently
empty) extracurricular activities list — comes from [`src/ts/data.ts`](src/ts/data.ts). Edit that file,
then rebuild:

```bash
npm install     # first time only
npm run build   # compiles src/ts -> js/
```

Commit the updated files in `js/` along with your `src/ts` changes — GitHub Pages serves the repo as-is
with no build step, so the compiled JS must be committed.

To preview locally:

```bash
npm run serve   # serves the site at http://localhost:8080
```

## Contact form backend

The contact form posts to an API defined in `server/`. GitHub Pages can't run server code, so that API
needs to be deployed separately (Render, Railway, etc.) — see [`server/README.md`](server/README.md) for
setup and deployment steps. Until it's deployed and `CONTACT_API_URL` in `src/ts/main.ts` is pointed at
it, form submissions will fail gracefully with an error message pointing visitors to email directly.

## Deployment

Pushing to `main` triggers `.github/workflows/static.yml`, which publishes the repository root to GitHub
Pages. No build step runs in CI, so always run `npm run build` locally and commit the result before
pushing.
