import { fetchGa, fetchGsc } from "@/lib/analytics";
import {
  IconUsers,
  IconActivity,
  IconBolt,
  IconClock,
  IconTrendingUp,
  IconSearch,
  IconExternalLink,
} from "@tabler/icons-react";

export const dynamic = "force-dynamic"; // refetch fresh on every visit
export const revalidate = 0;
export const metadata = { title: "Analytics" };

function fmt(n: number): string {
  return new Intl.NumberFormat("en-US").format(Math.round(n));
}

function fmtDuration(seconds: number): string {
  if (!seconds || isNaN(seconds)) return "0s";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function fmtPct(ratio: number): string {
  if (!ratio || isNaN(ratio)) return "0.0%";
  return `${(ratio * 100).toFixed(2)}%`;
}

export default async function AnalyticsPage() {
  const [ga, gsc] = await Promise.all([fetchGa(30), fetchGsc(28)]);

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-foreground tracking-tight mb-2">
          Analytics
        </h1>
        <p className="text-muted-foreground">
          Last 30 days from Google Analytics 4 · last 28 days from Search Console.
          Refreshes on every visit.
        </p>
      </header>

      {/* ── GA4 ───────────────────────────────────────────────────────── */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold tracking-tight">
            Audience · last 30 days
          </h2>
          <span className="text-xs uppercase tracking-widest text-primary font-mono">
            GA4
          </span>
        </div>

        {!ga.ok ? (
          <ErrorCard
            title="Couldn't load GA4 data"
            reason={ga.reason}
            hint={
              ga.reason === "missing-env"
                ? "Set GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_REFRESH_TOKEN in Vercel and redeploy."
                : ga.reason === "missing-ga-property-id"
                ? "Set GA_PROPERTY_ID (e.g. properties/404268178) in Vercel and redeploy."
                : "Check that your OAuth consent screen is in Production status and the refresh token hasn't been revoked."
            }
          />
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <KpiTile icon={IconUsers} label="Active users" value={fmt(ga.summary.kpi.activeUsers)} />
              <KpiTile icon={IconActivity} label="Sessions" value={fmt(ga.summary.kpi.sessions)} />
              <KpiTile icon={IconBolt} label="generate_lead events" value={fmt(ga.summary.kpi.generateLeadCount)} accent />
              <KpiTile icon={IconClock} label="Avg session" value={fmtDuration(ga.summary.kpi.averageSessionDuration)} />
              <KpiTile icon={IconTrendingUp} label="New users" value={fmt(ga.summary.kpi.newUsers)} />
              <KpiTile icon={IconActivity} label="Engaged sessions" value={fmt(ga.summary.kpi.engagedSessions)} />
              <KpiTile icon={IconBolt} label="Total conversions" value={fmt(ga.summary.kpi.conversions)} />
              <KpiTile
                icon={IconTrendingUp}
                label="Conv. rate"
                value={
                  ga.summary.kpi.sessions > 0
                    ? fmtPct(ga.summary.kpi.generateLeadCount / ga.summary.kpi.sessions)
                    : "0.0%"
                }
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              <RankTable
                title="Top pages"
                rows={ga.summary.topPages}
                colLabel="Path"
              />
              <RankTable
                title="Top sources"
                rows={ga.summary.topSources}
                colLabel="Source / medium"
              />
              <RankTable
                title="Top countries"
                rows={ga.summary.trafficByCountry}
                colLabel="Country"
              />
            </div>
          </>
        )}
      </section>

      {/* ── Search Console ────────────────────────────────────────────── */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold tracking-tight">
            Organic search · last 28 days
          </h2>
          <span className="text-xs uppercase tracking-widest text-primary font-mono">
            GSC
          </span>
        </div>

        {!gsc.ok ? (
          <ErrorCard
            title="Couldn't load Search Console data"
            reason={gsc.reason}
            hint={
              gsc.reason === "missing-env"
                ? "Set GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_REFRESH_TOKEN in Vercel."
                : gsc.reason === "missing-gsc-site-url"
                ? "Set GSC_SITE_URL (e.g. sc-domain:ferozarshad.com) in Vercel."
                : "Check that the GSC property is registered under the same Google account that minted the refresh token."
            }
          />
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <KpiTile icon={IconExternalLink} label="Clicks" value={fmt(gsc.summary.totalClicks)} />
              <KpiTile icon={IconSearch} label="Impressions" value={fmt(gsc.summary.totalImpressions)} />
              <KpiTile icon={IconBolt} label="Avg CTR" value={fmtPct(gsc.summary.avgCtr)} />
              <KpiTile icon={IconTrendingUp} label="Avg position" value={gsc.summary.avgPosition.toFixed(1)} />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <GscTable title="Top queries" rows={gsc.summary.topQueries} firstHeader="Query" />
              <GscTable title="Top pages" rows={gsc.summary.topPages} firstHeader="Page" trimUrl />
            </div>
          </>
        )}
      </section>
    </div>
  );
}

// ─── tile components ────────────────────────────────────────────────────────

function KpiTile({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`p-5 rounded-xl border bg-card transition ${
        accent ? "border-primary/40" : "border-border"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-widest font-mono text-muted-foreground">
          {label}
        </span>
        <Icon className={`w-4 h-4 ${accent ? "text-primary" : "text-muted-foreground"}`} />
      </div>
      <div className={`text-3xl font-bold tracking-tight ${accent ? "text-primary" : "text-foreground"}`}>
        {value}
      </div>
    </div>
  );
}

function RankTable({
  title,
  rows,
  colLabel,
}: {
  title: string;
  rows: { dimension: string; users: number; sessions: number }[];
  colLabel: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border">
        <h3 className="font-semibold tracking-tight">{title}</h3>
      </div>
      {rows.length === 0 ? (
        <div className="px-4 py-10 text-center text-sm text-muted-foreground">
          No data yet for this period.
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">
              <th className="text-left px-4 py-2 font-mono font-medium">{colLabel}</th>
              <th className="text-right px-4 py-2 font-mono font-medium">Users</th>
              <th className="text-right px-4 py-2 font-mono font-medium">Sessions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="px-4 py-2 truncate max-w-[240px]" title={r.dimension}>
                  {r.dimension}
                </td>
                <td className="px-4 py-2 text-right font-mono">{fmt(r.users)}</td>
                <td className="px-4 py-2 text-right font-mono">{fmt(r.sessions)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function GscTable({
  title,
  rows,
  firstHeader,
  trimUrl,
}: {
  title: string;
  rows: { query: string; clicks: number; impressions: number; ctr: number; position: number }[];
  firstHeader: string;
  trimUrl?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border">
        <h3 className="font-semibold tracking-tight">{title}</h3>
      </div>
      {rows.length === 0 ? (
        <div className="px-4 py-10 text-center text-sm text-muted-foreground">
          No data yet for this period.
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">
              <th className="text-left px-4 py-2 font-mono font-medium">{firstHeader}</th>
              <th className="text-right px-4 py-2 font-mono font-medium">Clicks</th>
              <th className="text-right px-4 py-2 font-mono font-medium">Imps</th>
              <th className="text-right px-4 py-2 font-mono font-medium">CTR</th>
              <th className="text-right px-4 py-2 font-mono font-medium">Pos</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const display = trimUrl
                ? r.query.replace(/^https?:\/\/[^/]+/, "") || "/"
                : r.query;
              return (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="px-4 py-2 truncate max-w-[260px]" title={r.query}>
                    {display}
                  </td>
                  <td className="px-4 py-2 text-right font-mono">{fmt(r.clicks)}</td>
                  <td className="px-4 py-2 text-right font-mono">{fmt(r.impressions)}</td>
                  <td className="px-4 py-2 text-right font-mono">{fmtPct(r.ctr)}</td>
                  <td className="px-4 py-2 text-right font-mono">{r.position.toFixed(1)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

function ErrorCard({
  title,
  reason,
  hint,
}: {
  title: string;
  reason: string;
  hint: string;
}) {
  return (
    <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-6">
      <h3 className="text-lg font-bold text-amber-400 mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-3">
        Reason: <code className="font-mono text-foreground">{reason}</code>
      </p>
      <p className="text-sm text-muted-foreground">{hint}</p>
    </div>
  );
}
