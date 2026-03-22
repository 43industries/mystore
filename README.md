# MyStoreKE (`mystore`)

Find your perfect stay — discover unique places to stay in the countryside. This repo ships a **Next.js** frontend with **Supabase**-backed API routes and an optional **FastAPI** server in the `app/` Python package.

## Tech stack

- **Next.js 16** (App Router) — UI and `/api/*` routes live under **`src/app/`**
- **TypeScript** & **Tailwind CSS**
- **Supabase** for listings and driver applications
- **FastAPI (Python)** — `app/main.py` (same folder name as the Python package; **not** Next.js routes)

## Important: two different `app` folders

- **`src/app/`** — Next.js App Router (pages, layouts, `src/app/api/*`). This is what Vercel builds.
- **`app/`** (at repo root) — Python package only (`main.py`, `supabase_client.py`, …). Do not put Next.js `page.tsx` / `layout.tsx` here, or they will not be used when `src/app` exists.

## Getting started (Next.js)

```bash
npm install
cp .env.example .env.local
# Fill SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY from Supabase → Settings → API
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Python (FastAPI)

1. Copy `.env.example` to `.env` and set `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`.
2. Install deps: `python -m pip install -r requirements.txt`
3. Run: `python -m uvicorn app.main:app --reload --port 8000`

Open [http://localhost:8000](http://localhost:8000) and [http://localhost:8000/docs](http://localhost:8000/docs).

## Scripts

- `npm run dev` — Next dev server
- `npm run build` — production build
- `npm run start` — run production build locally
- `npm run lint` — ESLint

## Deploy on Vercel

1. Import **[43industries/mystore](https://github.com/43industries/mystore)** (not `myhost`).
2. **Root Directory** — repository root (default).
3. **Environment Variables** — add from `.env.example`: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and optionally `NEXT_PUBLIC_BASE_URL` (your production URL, e.g. `https://mystoreke-com.vercel.app`).
4. Deploy. **Node** should be **20.x** (see `engines` in `package.json`).

## Project structure

- `src/app/page.tsx` — main landing page (listings from Supabase)
- `src/app/layout.tsx` — root layout and metadata
- `src/app/globals.css` — global styles
- `src/app/api/*` — Next.js API routes
- `app/main.py` — FastAPI entrypoint
- `templates/index.html` — Python landing page
- `supabase-schema.sql` — database schema

## Supabase

- Run `supabase-schema.sql` once in the Supabase SQL editor.
- Server-side client: `src/lib/supabaseServer.ts` (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`).
