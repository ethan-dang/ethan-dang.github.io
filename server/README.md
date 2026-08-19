# Contact Form API

Small Express + TypeScript API that powers the contact form on the site. GitHub Pages only serves static
files, so this backend needs to run somewhere else (Render, Railway, Fly.io, a VPS, etc.) and the frontend
calls it over HTTPS.

## Endpoints

- `POST /api/contact` — body `{ name, email, message }`, emails the submission to `CONTACT_TO_EMAIL`.
- `GET /api/health` — returns `{ status: "ok" }`.

## Local development

```bash
cd server
npm install
cp .env.example .env   # then fill in your Resend API key
npm run dev             # runs on http://localhost:3000
```

Without `RESEND_API_KEY` set, `/api/contact` responds with `503` and logs the submission instead of
failing silently — useful for local testing without real email.

Email delivery goes through [Resend](https://resend.com)'s HTTP API rather than SMTP. Many hosts (Render's
free tier included) block outbound SMTP ports (25/465/587) to prevent abuse, which makes Gmail/SMTP
unreachable regardless of credentials — HTTPS-based email APIs sidestep that entirely. Sign up for a free
Resend account and create an API key; no domain verification is needed since the default
`onboarding@resend.com` sender can deliver to your own account email (i.e. `CONTACT_TO_EMAIL`), which is
exactly this form's use case.

## Deploying

1. Push this repo (or just the `server/` folder) to your host of choice.
2. Set the environment variables from `.env.example` in the host's dashboard:
   - `PORT` (most hosts set this automatically)
   - `ALLOWED_ORIGINS` — include `https://ethan-dang.github.io`
   - `CONTACT_TO_EMAIL`
   - `RESEND_API_KEY` (and optionally `RESEND_FROM_EMAIL` once you've verified a custom domain on Resend)
3. Build and start commands: `npm run build` then `npm start`.
4. Once deployed, update `CONTACT_API_URL` in [`src/ts/main.ts`](../src/ts/main.ts) at the project root to
   your API's public URL (e.g. `https://your-api.onrender.com/api/contact`), then rebuild the frontend
   (`npm run build` at the repo root) and commit the updated `js/main.js`.

## Rate limiting

A minimal in-memory limiter caps submissions to 5 per IP per 10 minutes. It resets on restart and won't
scale across multiple server instances — fine for a personal contact form, not meant for high traffic.
