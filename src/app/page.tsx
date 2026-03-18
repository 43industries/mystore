export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 shadow-2xl shadow-black/40">
          <p className="text-sm font-medium tracking-wide text-zinc-400">
            Next.js app is running
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            MyStoreke
          </h1>
          <p className="mt-3 text-zinc-300">
            API endpoints:
            <code className="mx-2 rounded bg-zinc-950 px-2 py-1 text-zinc-200">
              /api/listings
            </code>
            and
            <code className="mx-2 rounded bg-zinc-950 px-2 py-1 text-zinc-200">
              /api/drivers
            </code>
            .
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
              href="/api/listings"
            >
              View listings JSON
            </a>
            <a
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-50 hover:bg-zinc-800"
              href="/api/drivers"
            >
              View drivers JSON
            </a>
          </div>

          <p className="mt-8 text-xs text-zinc-500">
            Set{" "}
            <code className="rounded bg-zinc-950 px-1.5 py-0.5">
              SUPABASE_URL
            </code>{" "}
            and{" "}
            <code className="rounded bg-zinc-950 px-1.5 py-0.5">
              SUPABASE_SERVICE_ROLE_KEY
            </code>{" "}
            to enable DB-backed routes.
          </p>
        </div>
      </div>
    </main>
  );
}

