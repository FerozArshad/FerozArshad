/**
 * Server-side fetch helpers for the /admin/analytics dashboard.
 *
 * Per Spenzio playbook (`01_GOOGLE_ANALYTICS_AND_SEARCH_CONSOLE.md`):
 *
 *  - Direct `googleapis` OAuth2 — NOT MCP, NOT an analytics SDK.
 *  - One OAuth2 client built from GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET,
 *    `setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN })` (refresh token
 *    scoped to analytics.readonly + webmasters.readonly).
 *  - `google.analyticsdata({version: 'v1beta', auth}).properties.runReport`
 *    for GA4.
 *  - `google.webmasters({version: 'v3', auth}).searchanalytics.query` for GSC.
 *  - All return-types are deliberately defensive: missing-env, network blip,
 *    or zero-data all surface as `{ ok: false, reason }` so the admin page
 *    can render an empty state instead of crashing.
 */

import { google } from "googleapis";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN || "";
const GA_PROPERTY_ID = process.env.GA_PROPERTY_ID || ""; // e.g. "properties/404268178"
const GSC_SITE_URL = process.env.GSC_SITE_URL || ""; // e.g. "sc-domain:ferozarshad.com"

function envOk(): boolean {
  return Boolean(
    GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET && GOOGLE_REFRESH_TOKEN
  );
}

function getAuth() {
  const client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
  client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });
  return client;
}

// ─────────────────────────────────────────────────────────────────────────────
// GA4
// ─────────────────────────────────────────────────────────────────────────────

export type GaKpi = {
  activeUsers: number;
  newUsers: number;
  sessions: number;
  engagedSessions: number;
  averageSessionDuration: number; // seconds
  conversions: number;
  generateLeadCount: number;
};

export type GaTopRow = { dimension: string; users: number; sessions: number };

export type GaSummary = {
  kpi: GaKpi;
  topPages: GaTopRow[];
  topSources: GaTopRow[];
  trafficByCountry: GaTopRow[];
};

export type GaResult =
  | { ok: true; summary: GaSummary }
  | { ok: false; reason: string };

/** Sum metric values across rows (defensive against missing rows / strings). */
function sumMetric(rows: any[] | undefined, idx: number): number {
  if (!rows) return 0;
  let total = 0;
  for (const r of rows) {
    const v = Number(r?.metricValues?.[idx]?.value ?? 0);
    if (!isNaN(v)) total += v;
  }
  return total;
}

export async function fetchGa(days = 30): Promise<GaResult> {
  if (!envOk()) return { ok: false, reason: "missing-env" };
  if (!GA_PROPERTY_ID) return { ok: false, reason: "missing-ga-property-id" };

  try {
    const ga = google.analyticsdata({ version: "v1beta", auth: getAuth() });
    const dateRange = { startDate: `${days}daysAgo`, endDate: "today" };

    // Headline KPIs — one report with multiple metrics, no dimensions
    const kpiRes = await ga.properties.runReport({
      property: GA_PROPERTY_ID,
      requestBody: {
        dateRanges: [dateRange],
        metrics: [
          { name: "activeUsers" },
          { name: "newUsers" },
          { name: "sessions" },
          { name: "engagedSessions" },
          { name: "averageSessionDuration" },
          { name: "conversions" },
        ],
      },
    });

    const r = kpiRes.data.rows?.[0]?.metricValues;
    const kpiBase = {
      activeUsers: Number(r?.[0]?.value ?? 0),
      newUsers: Number(r?.[1]?.value ?? 0),
      sessions: Number(r?.[2]?.value ?? 0),
      engagedSessions: Number(r?.[3]?.value ?? 0),
      averageSessionDuration: Number(r?.[4]?.value ?? 0),
      conversions: Number(r?.[5]?.value ?? 0),
    };

    // generate_lead event count (the canonical lead conversion event)
    const leadRes = await ga.properties.runReport({
      property: GA_PROPERTY_ID,
      requestBody: {
        dateRanges: [dateRange],
        dimensions: [{ name: "eventName" }],
        metrics: [{ name: "eventCount" }],
        dimensionFilter: {
          filter: {
            fieldName: "eventName",
            stringFilter: { matchType: "EXACT", value: "generate_lead" },
          },
        },
      },
    });
    const generateLeadCount = sumMetric(leadRes.data.rows ?? [], 0);

    // Top pages by users
    const topPagesRes = await ga.properties.runReport({
      property: GA_PROPERTY_ID,
      requestBody: {
        dateRanges: [dateRange],
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "activeUsers" }, { name: "sessions" }],
        orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
        limit: "10",
      },
    });
    const topPages: GaTopRow[] = (topPagesRes.data.rows || []).map((row) => ({
      dimension: row.dimensionValues?.[0]?.value ?? "(unknown)",
      users: Number(row.metricValues?.[0]?.value ?? 0),
      sessions: Number(row.metricValues?.[1]?.value ?? 0),
    }));

    // Top traffic sources
    const sourcesRes = await ga.properties.runReport({
      property: GA_PROPERTY_ID,
      requestBody: {
        dateRanges: [dateRange],
        dimensions: [{ name: "sessionSourceMedium" }],
        metrics: [{ name: "activeUsers" }, { name: "sessions" }],
        orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
        limit: "10",
      },
    });
    const topSources: GaTopRow[] = (sourcesRes.data.rows || []).map((row) => ({
      dimension: row.dimensionValues?.[0]?.value ?? "(unknown)",
      users: Number(row.metricValues?.[0]?.value ?? 0),
      sessions: Number(row.metricValues?.[1]?.value ?? 0),
    }));

    // Top countries
    const countriesRes = await ga.properties.runReport({
      property: GA_PROPERTY_ID,
      requestBody: {
        dateRanges: [dateRange],
        dimensions: [{ name: "country" }],
        metrics: [{ name: "activeUsers" }, { name: "sessions" }],
        orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
        limit: "10",
      },
    });
    const trafficByCountry: GaTopRow[] = (countriesRes.data.rows || []).map((row) => ({
      dimension: row.dimensionValues?.[0]?.value ?? "(unknown)",
      users: Number(row.metricValues?.[0]?.value ?? 0),
      sessions: Number(row.metricValues?.[1]?.value ?? 0),
    }));

    return {
      ok: true,
      summary: {
        kpi: { ...kpiBase, generateLeadCount },
        topPages,
        topSources,
        trafficByCountry,
      },
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, reason: msg.slice(0, 240) };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Search Console
// ─────────────────────────────────────────────────────────────────────────────

export type GscRow = {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number; // 0..1
  position: number;
};

export type GscSummary = {
  totalClicks: number;
  totalImpressions: number;
  avgCtr: number;
  avgPosition: number;
  topQueries: GscRow[];
  topPages: GscRow[]; // page dimension reused into the same shape
};

export type GscResult =
  | { ok: true; summary: GscSummary }
  | { ok: false; reason: string };

function ymdDaysAgo(days: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

export async function fetchGsc(days = 28): Promise<GscResult> {
  if (!envOk()) return { ok: false, reason: "missing-env" };
  if (!GSC_SITE_URL) return { ok: false, reason: "missing-gsc-site-url" };

  try {
    const sc = google.webmasters({ version: "v3", auth: getAuth() });
    const startDate = ymdDaysAgo(days);
    const endDate = ymdDaysAgo(1); // GSC is always 1-3 days behind

    const queriesRes = await sc.searchanalytics.query({
      siteUrl: GSC_SITE_URL,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["query"],
        rowLimit: 50,
      },
    });
    const queriesRows = (queriesRes.data.rows || []).slice(0, 25);
    const topQueries: GscRow[] = queriesRows.map((row) => ({
      query: row.keys?.[0] ?? "(no query)",
      clicks: row.clicks ?? 0,
      impressions: row.impressions ?? 0,
      ctr: row.ctr ?? 0,
      position: row.position ?? 0,
    }));

    const pagesRes = await sc.searchanalytics.query({
      siteUrl: GSC_SITE_URL,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["page"],
        rowLimit: 25,
      },
    });
    const topPages: GscRow[] = (pagesRes.data.rows || []).map((row) => ({
      query: row.keys?.[0] ?? "(no page)",
      clicks: row.clicks ?? 0,
      impressions: row.impressions ?? 0,
      ctr: row.ctr ?? 0,
      position: row.position ?? 0,
    }));

    const totalClicks = topQueries.reduce((a, b) => a + b.clicks, 0);
    const totalImpressions = topQueries.reduce((a, b) => a + b.impressions, 0);
    const avgCtr = totalImpressions > 0 ? totalClicks / totalImpressions : 0;
    const avgPosition =
      topQueries.length > 0
        ? topQueries.reduce((a, b) => a + b.position, 0) / topQueries.length
        : 0;

    return {
      ok: true,
      summary: { totalClicks, totalImpressions, avgCtr, avgPosition, topQueries, topPages },
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, reason: msg.slice(0, 240) };
  }
}
