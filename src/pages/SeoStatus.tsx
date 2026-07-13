import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, AlertCircle, Clock, ExternalLink } from "lucide-react";

type DomainStatus = {
  url: string;
  role: string;
  verified: boolean;
  owner?: string;
  verificationTokenStaged?: boolean;
  sitemap: {
    url: string;
    lastSubmitted: string | null;
    isPending: boolean;
    errors: number;
    warnings: number;
  };
  indexing: null | Record<string, {
    verdict: string;
    coverageState: string;
    robotsTxtState: string;
    indexingState: string;
    lastCrawlTime: string;
  }>;
};

type SeoStatus = {
  generatedAt: string;
  canonicalDomain: string;
  domains: DomainStatus[];
};

const fmt = (iso: string | null) =>
  iso ? new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }) : "—";

const SeoStatus = () => {
  const [data, setData] = useState<SeoStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/seo-status.json")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>SEO Status — GCC Playbook</title>
        <meta name="description" content="Search Console verification, sitemap submission time, and indexing status for GCC Playbook domains." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://gcc-playbook.kalilurrahman.com/seo-status" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold gradient-text-accent">SEO Status</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Google Search Console verification, sitemap submissions, and indexing snapshots.
          </p>
          {data && (
            <p className="text-xs text-muted-foreground mt-1">
              Snapshot generated {fmt(data.generatedAt)} · Canonical: {data.canonicalDomain}
            </p>
          )}
        </header>

        {error && (
          <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm">
            Failed to load SEO status: {error}
          </div>
        )}

        {!data && !error && <p className="text-muted-foreground">Loading…</p>}

        {data && (
          <div className="space-y-5">
            {data.domains.map((d) => (
              <article key={d.url} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-primary hover:underline inline-flex items-center gap-1"
                    >
                      {d.url} <ExternalLink className="w-4 h-4" />
                    </a>
                    <p className="text-xs text-muted-foreground mt-0.5">{d.role}</p>
                  </div>
                  <span
                    className={
                      "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full " +
                      (d.verified
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/30")
                    }
                  >
                    {d.verified ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                    {d.verified ? "Verified" : "Pending verification"}
                  </span>
                </div>

                <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  {d.owner && (
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-muted-foreground">Owner</dt>
                      <dd className="font-mono">{d.owner}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">Sitemap</dt>
                    <dd className="font-mono break-all">{d.sitemap.url}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">Last submitted</dt>
                    <dd>
                      {fmt(d.sitemap.lastSubmitted)}
                      {d.sitemap.isPending && (
                        <span className="ml-2 text-xs text-amber-400">(pending)</span>
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">Sitemap health</dt>
                    <dd>
                      {d.sitemap.errors === 0 && d.sitemap.warnings === 0 ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" /> Clean
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-amber-400">
                          <AlertCircle className="w-4 h-4" /> {d.sitemap.errors} errors · {d.sitemap.warnings} warnings
                        </span>
                      )}
                    </dd>
                  </div>
                </dl>

                {d.indexing && (
                  <div className="mt-4 border-t border-border pt-4">
                    <h2 className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                      Indexing snapshot
                    </h2>
                    {Object.entries(d.indexing).map(([page, ix]) => (
                      <div key={page} className="rounded-lg bg-background/50 border border-border p-3 text-xs space-y-1">
                        <div className="font-mono text-foreground">/{page === "home" ? "" : page}</div>
                        <div><span className="text-muted-foreground">Coverage:</span> {ix.coverageState}</div>
                        <div><span className="text-muted-foreground">Robots:</span> {ix.robotsTxtState}</div>
                        <div><span className="text-muted-foreground">Indexing:</span> {ix.indexingState}</div>
                        <div><span className="text-muted-foreground">Last crawled:</span> {fmt(ix.lastCrawlTime)}</div>
                      </div>
                    ))}
                  </div>
                )}

                {!d.verified && d.verificationTokenStaged && (
                  <p className="mt-4 text-xs text-amber-400/90">
                    META token staged in <code>index.html</code>. Verification will complete on the next publish.
                  </p>
                )}
              </article>
            ))}
          </div>
        )}

        <footer className="mt-10 text-xs text-muted-foreground">
          Data updated at deploy time from Google Search Console API. To refresh, ask Lovable to
          re-run verification and sitemap submission.
        </footer>
      </div>
    </div>
  );
};

export default SeoStatus;
