import { debugLog } from "../../stores/debug/useDebugStore";
import { fetchWithTimeout } from "../../utils/fetchWithTimeout";
import type {
  PageViewsResponse,
  WikiQueryResponse,
  WikipediaSummary,
} from "./wikipedia.types";

const WIKI_FR = "https://fr.wikipedia.org";
const WIKIMEDIA = "https://wikimedia.org/api/rest_v1";

function encodeWikiTitle(title: string): string {
  return encodeURIComponent(title.replace(/ /g, "_"));
}

export async function fetchPersonSummary(
  title: string,
): Promise<WikipediaSummary> {
  const url = `${WIKI_FR}/api/rest_v1/page/summary/${encodeWikiTitle(title)}`;
  debugLog("Wikipedia", "info", `Summary → ${title}`);

  const res = await fetchWithTimeout(url, {}, 15_000);
  if (!res.ok) {
    debugLog("Wikipedia", "error", `Summary échoué : ${title}`, `HTTP ${res.status}`);
    throw new Error(`Page Wikipédia introuvable : ${title}`);
  }

  const data: WikipediaSummary = await res.json();
  debugLog(
    "Wikipedia",
    data.thumbnail?.source ? "success" : "warn",
    `Summary OK : ${data.title}`,
    data.thumbnail?.source ? "image présente" : "PAS D'IMAGE — carte ignorée",
  );
  return data;
}

export async function fetchWikibaseId(title: string): Promise<string> {
  const params = new URLSearchParams({
    action: "query",
    titles: title,
    prop: "pageprops",
    ppprop: "wikibase_item",
    format: "json",
    origin: "*",
  });

  const res = await fetch(`${WIKI_FR}/w/api.php?${params}`);
  if (!res.ok) {
    throw new Error(`Impossible de récupérer l'identifiant Wikidata : ${title}`);
  }

  const data: WikiQueryResponse = await res.json();
  const page = Object.values(data.query.pages)[0];

  if (page.missing || !page.pageprops?.wikibase_item) {
    throw new Error(`Aucun identifiant Wikidata pour : ${title}`);
  }

  return page.pageprops.wikibase_item;
}

export async function fetchArticleSize(title: string): Promise<number> {
  const params = new URLSearchParams({
    action: "query",
    titles: title,
    prop: "revisions",
    rvprop: "size",
    format: "json",
    origin: "*",
  });

  const res = await fetch(`${WIKI_FR}/w/api.php?${params}`);
  if (!res.ok) {
    return 0;
  }

  const data: WikiQueryResponse = await res.json();
  const page = Object.values(data.query.pages)[0];
  return page.revisions?.[0]?.size ?? 0;
}

export async function fetchPageViews(
  title: string,
  months = 3,
): Promise<number> {
  const end = new Date();
  const start = new Date();
  start.setMonth(start.getMonth() - months);

  const formatDate = (date: Date) =>
    date.toISOString().slice(0, 10).replace(/-/g, "");

  const url = `${WIKIMEDIA}/metrics/pageviews/per-article/fr.wikipedia/all-access/user/${encodeWikiTitle(title)}/monthly/${formatDate(start)}00/${formatDate(end)}00`;

  const res = await fetch(url);
  if (!res.ok) {
    return 0;
  }

  const data: PageViewsResponse = await res.json();
  return (
    data.items?.reduce((sum, item) => sum + item.views, 0) ?? 0
  );
}
