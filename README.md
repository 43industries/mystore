# MyHost

Find your perfect stay — discover unique places to stay in the countryside. Connecting countryside homeowners with travelers.

## Tech stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **FastAPI (Python)** (added)

## Getting started

```bash
# Install dependencies (if needed)
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Python version (FastAPI)

This workspace also includes a Python backend you can run instead of Node.

1. Create env file:
   - Copy `.env.example` to `.env` and fill `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`
2. Install Python deps:

```bash
python -m pip install -r requirements.txt
```

If you prefer `pip` directly from `pyproject.toml`:

```bash
python -m pip install .
```

3. Run the server:

```bash
python -m uvicorn app.main:app --reload --port 8000
```

Open `http://localhost:8000` and `http://localhost:8000/docs`.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — build for production
- `npm run start` — run production build locally
- `npm run lint` — run ESLint

## Deploy on Vercel

1. Push this repo to GitHub: `https://github.com/43industries/myhost`
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **Add New** → **Project** and import `43industries/myhost`.
4. Deploy. Vercel will build and host the site.

To redeploy, push to the connected branch (e.g. `main`).

## Project structure

- `src/app/page.tsx` — main landing page
- `src/app/layout.tsx` — root layout and metadata
- `src/app/globals.css` — global styles and CSS variables
- `app/main.py` — FastAPI entrypoint (Python)
- `templates/index.html` — Python landing page

## Supabase database

This project is ready to use Supabase for real listings and driver applications:

- Database schema: see `supabase-schema.sql` (run it once in the Supabase SQL editor).
- Server client: `src/lib/supabaseServer.ts` (reads `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`).

For **local development**:

1. Copy `.env.local.example` to `.env.local`.
2. In Supabase, create a project and run `supabase-schema.sql`.
3. From Supabase → **Settings → API**, copy:
   - `SUPABASE_URL`
   - `service_role` key into `SUPABASE_SERVICE_ROLE_KEY` (keep this secret, server-side only).
4. Run `npm run dev` and test `/api/listings` and `/api/drivers`.

For **Vercel deployment**:

1. In your Vercel project → **Settings → Environment Variables**, add:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_BASE_URL` = your production URL (e.g. `https://mystoreke-com.vercel.app`).
2. Redeploy from Vercel so the new env vars are picked up.
