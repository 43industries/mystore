import { getSupabaseServerClient } from "@/lib/supabaseServer";

type Listing = {
  id: string;
  title: string;
  storage_type: string;
  description: string;
  size: number | null;
  size_unit: string;
  price_per_day: number | null;
  price_per_week: number | null;
  price_per_month: number | null;
  rating: number | null;
  review_count: number | null;
  city: string;
  county: string;
  created_at: string;
};

function formatMoney(value: number) {
  try {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `KES ${Math.round(value).toLocaleString()}`;
  }
}

function priceLabel(l: Listing) {
  if (l.price_per_day != null) return `${formatMoney(l.price_per_day)}/day`;
  if (l.price_per_week != null) return `${formatMoney(l.price_per_week)}/week`;
  if (l.price_per_month != null) return `${formatMoney(l.price_per_month)}/month`;
  return null;
}

export default async function HomePage() {
  let listings: Listing[] = [];
  let listingsError: string | null = null;

  try {
    const sb = getSupabaseServerClient();
    const { data, error } = await sb
      .from("listings")
      .select(
        "id,title,storage_type,description,size,size_unit,price_per_day,price_per_week,price_per_month,rating,review_count,city,county,created_at"
      )
      .order("created_at", { ascending: false })
      .limit(6);

    if (error) {
      listingsError = error.message;
    } else {
      listings = (data ?? []) as Listing[];
    }
  } catch (e) {
    listingsError = String(e);
  }

  return (
    <main>
      <div className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-10rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-emerald-400/25 via-cyan-300/10 to-fuchsia-400/20 blur-3xl" />
          <div className="absolute bottom-[-14rem] left-[-10rem] h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-zinc-700/40 via-zinc-800/20 to-emerald-400/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-xs text-zinc-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Live: Next.js + Supabase ready
              </div>

              <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
                Find your perfect countryside stay.
              </h1>
              <p className="mt-4 text-pretty text-base leading-relaxed text-zinc-300 sm:text-lg">
                MyStoreke connects travelers with unique listings—simple,
                fast, and ready for real data via Supabase.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  className="rounded-xl bg-zinc-50 px-5 py-3 text-sm font-semibold text-zinc-950 shadow-sm shadow-black/30 hover:bg-zinc-200"
                  href="/api/listings"
                >
                  Browse listings API
                </a>
                <a
                  className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-3 text-sm font-semibold text-zinc-50 hover:bg-zinc-900"
                  href="/api/drivers"
                >
                  Driver applications API
                </a>
              </div>

              <p className="mt-6 text-xs leading-relaxed text-zinc-500">
                To enable DB-backed routes, set{" "}
                <code className="rounded bg-zinc-950 px-1.5 py-0.5 text-zinc-200">
                  SUPABASE_URL
                </code>{" "}
                and{" "}
                <code className="rounded bg-zinc-950 px-1.5 py-0.5 text-zinc-200">
                  SUPABASE_SERVICE_ROLE_KEY
                </code>
                .
              </p>
            </div>

            <div className="w-full max-w-xl">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 shadow-2xl shadow-black/40">
                <h2 className="text-sm font-semibold text-zinc-200">
                  What you can build next
                </h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-zinc-800/60 bg-zinc-950/30 p-4">
                    <p className="text-sm font-medium text-zinc-100">
                      Listings
                    </p>
                    <p className="mt-1 text-xs text-zinc-400">
                      Store and search stays from Supabase.
                    </p>
                  </div>
                  <div className="rounded-xl border border-zinc-800/60 bg-zinc-950/30 p-4">
                    <p className="text-sm font-medium text-zinc-100">
                      Driver onboarding
                    </p>
                    <p className="mt-1 text-xs text-zinc-400">
                      Collect applications securely server-side.
                    </p>
                  </div>
                  <div className="rounded-xl border border-zinc-800/60 bg-zinc-950/30 p-4">
                    <p className="text-sm font-medium text-zinc-100">
                      Admin tools
                    </p>
                    <p className="mt-1 text-xs text-zinc-400">
                      Review, approve, and moderate content.
                    </p>
                  </div>
                  <div className="rounded-xl border border-zinc-800/60 bg-zinc-950/30 p-4">
                    <p className="text-sm font-medium text-zinc-100">
                      Payments
                    </p>
                    <p className="mt-1 text-xs text-zinc-400">
                      Add checkout when you’re ready to launch.
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-zinc-800/70 bg-zinc-950/40 p-4">
                  <p className="text-xs font-semibold text-zinc-300">
                    Quick links
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <a
                      className="rounded-lg border border-zinc-800 px-2 py-1 text-zinc-300 hover:bg-zinc-900"
                      href="/api/listings?limit=5"
                    >
                      /api/listings?limit=5
                    </a>
                    <a
                      className="rounded-lg border border-zinc-800 px-2 py-1 text-zinc-300 hover:bg-zinc-900"
                      href="/api/drivers?limit=5"
                    >
                      /api/drivers?limit=5
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="mt-14">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-zinc-50">
                  Featured listings
                </h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Latest stays pulled from your Supabase database.
                </p>
              </div>
              <a
                className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-2 text-xs font-semibold text-zinc-200 hover:bg-zinc-900"
                href="/api/listings"
              >
                View all (JSON)
              </a>
            </div>

            {listingsError ? (
              <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 text-sm text-zinc-300">
                <p className="font-semibold text-zinc-200">
                  Listings are not connected yet.
                </p>
                <p className="mt-1 text-zinc-400">
                  Set{" "}
                  <code className="rounded bg-zinc-950 px-1.5 py-0.5 text-zinc-200">
                    SUPABASE_URL
                  </code>{" "}
                  and{" "}
                  <code className="rounded bg-zinc-950 px-1.5 py-0.5 text-zinc-200">
                    SUPABASE_SERVICE_ROLE_KEY
                  </code>{" "}
                  to enable database-backed listings.
                </p>
                <details className="mt-3">
                  <summary className="cursor-pointer text-xs font-semibold text-zinc-300">
                    Show error
                  </summary>
                  <pre className="mt-2 overflow-auto rounded-xl bg-zinc-950/60 p-3 text-[11px] leading-relaxed text-zinc-300">
                    {listingsError}
                  </pre>
                </details>
              </div>
            ) : listings.length === 0 ? (
              <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 text-sm text-zinc-300">
                <p className="font-semibold text-zinc-200">
                  No listings yet.
                </p>
                <p className="mt-1 text-zinc-400">
                  Add a row to <code className="rounded bg-zinc-950 px-1.5 py-0.5 text-zinc-200">public.listings</code>{" "}
                  in Supabase, then refresh.
                </p>
              </div>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {listings.map((l) => {
                  const price = priceLabel(l);
                  const subtitle = `${l.city}, ${l.county}`;
                  const size =
                    l.size != null ? `${l.size} ${l.size_unit}` : null;

                  return (
                    <article
                      key={l.id}
                      className="group rounded-2xl border border-zinc-800 bg-zinc-900/35 p-5 shadow-sm shadow-black/20 transition hover:-translate-y-0.5 hover:bg-zinc-900/55"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-semibold text-zinc-50">
                            {l.title}
                          </h3>
                          <p className="mt-1 truncate text-xs text-zinc-400">
                            {subtitle}
                          </p>
                        </div>
                        {price ? (
                          <div className="shrink-0 rounded-xl border border-zinc-800 bg-zinc-950/40 px-2 py-1 text-xs font-semibold text-zinc-200">
                            {price}
                          </div>
                        ) : null}
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-zinc-300">
                        <span className="rounded-lg border border-zinc-800 bg-zinc-950/30 px-2 py-1">
                          {l.storage_type}
                        </span>
                        {size ? (
                          <span className="rounded-lg border border-zinc-800 bg-zinc-950/30 px-2 py-1">
                            {size}
                          </span>
                        ) : null}
                        {l.rating != null ? (
                          <span className="rounded-lg border border-zinc-800 bg-zinc-950/30 px-2 py-1">
                            {Number(l.rating).toFixed(1)}★{" "}
                            <span className="text-zinc-500">
                              ({l.review_count ?? 0})
                            </span>
                          </span>
                        ) : (
                          <span className="rounded-lg border border-zinc-800 bg-zinc-950/30 px-2 py-1 text-zinc-400">
                            New
                          </span>
                        )}
                      </div>

                      <p className="mt-4 line-clamp-3 text-xs leading-relaxed text-zinc-400">
                        {l.description}
                      </p>

                      <div className="mt-5 flex items-center justify-between">
                        <a
                          className="text-xs font-semibold text-emerald-300 hover:text-emerald-200"
                          href={`/api/listings?limit=1`}
                        >
                          View via API
                        </a>
                        <span className="text-[11px] text-zinc-500">
                          {new Date(l.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

