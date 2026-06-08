import type { GameConfig } from "../../types/game";
import { debugLog } from "../../stores/debug/useDebugStore";
import { fetchWithTimeout } from "../../utils/fetchWithTimeout";
import type {
  RandomHumanCandidate,
  WikiRandomQueryResponse,
  WikidataClaimsResponse,
} from "./wikipedia.types";

const WIKI_FR = "https://fr.wikipedia.org";
const WIKIDATA_API = "https://www.wikidata.org/w/api.php";
const WIKIDATA_HUMAN = "Q5";

type WikiPage = {
  title: string;
  wikidataId: string;
};

export async function isHuman(wikidataId: string): Promise<boolean> {
  const entities = await fetchWikidataEntities([wikidataId]);
  return isHumanEntity(entities[wikidataId]);
}

function parseWikidataYear(time: string): number | null {
  const match = time.match(/^([+-]?\d+)-/);
  return match ? Number.parseInt(match[1], 10) : null;
}

function isHumanEntity(
  entity: WikidataClaimsResponse["entities"][string] | undefined,
): boolean {
  if (!entity || entity.missing) return false;
  const instanceOf = entity.claims?.P31 ?? [];
  return instanceOf.some(
    (claim) => claim.mainsnak.datavalue?.value.id === WIKIDATA_HUMAN,
  );
}

function getBirthYear(
  entity: WikidataClaimsResponse["entities"][string] | undefined,
): number | null {
  const time = entity?.claims?.P569?.[0]?.mainsnak.datavalue?.value.time;
  if (!time) return null;
  const year = parseWikidataYear(time);
  if (year === null || year <= 1400 || year >= 2010) return null;
  return year;
}

function getSitelinkCount(
  entity: WikidataClaimsResponse["entities"][string] | undefined,
): number {
  return entity?.sitelinks ? Object.keys(entity.sitelinks).length : 0;
}

async function fetchWikidataEntities(
  ids: string[],
): Promise<WikidataClaimsResponse["entities"]> {
  if (ids.length === 0) return {};

  const params = new URLSearchParams({
    action: "wbgetentities",
    ids: ids.join("|"),
    props: "claims|sitelinks",
    format: "json",
    origin: "*",
  });

  const res = await fetchWithTimeout(`${WIKIDATA_API}?${params}`, {}, 15_000);
  if (!res.ok) {
    throw new Error(`Wikidata API HTTP ${res.status}`);
  }

  const data: WikidataClaimsResponse = await res.json();
  return data.entities;
}

async function fetchRandomFrenchPages(batchSize: number): Promise<WikiPage[]> {
  const params = new URLSearchParams({
    action: "query",
    generator: "random",
    grnnamespace: "0",
    grnlimit: String(Math.min(batchSize, 50)),
    prop: "pageprops",
    ppprop: "wikibase_item",
    format: "json",
    origin: "*",
  });

  debugLog(
    "WikiRandom",
    "info",
    `Pages aléatoires FR (×${Math.min(batchSize, 50)})`,
    "Alternative à SPARQL — plus stable depuis le navigateur",
  );

  const res = await fetchWithTimeout(
    `${WIKI_FR}/w/api.php?${params}`,
    {},
    15_000,
  );

  if (!res.ok) {
    throw new Error(`Wikipedia random API HTTP ${res.status}`);
  }

  const data: WikiRandomQueryResponse = await res.json();

  return Object.values(data.query.pages)
    .filter((page) => page.pageprops?.wikibase_item && page.title)
    .map((page) => ({
      title: page.title!.replace(/ /g, "_"),
      wikidataId: page.pageprops!.wikibase_item!,
    }));
}

export async function fetchBirthYears(
  wikidataIds: string[],
): Promise<Map<string, number>> {
  if (wikidataIds.length === 0) return new Map();

  const entities = await fetchWikidataEntities(wikidataIds);
  const result = new Map<string, number>();

  for (const id of wikidataIds) {
    const year = getBirthYear(entities[id]);
    if (year !== null) result.set(id, year);
  }

  return result;
}

function getSitelinksRange(config: GameConfig): { min: number; max: number } {
  switch (config.difficulty) {
    case "easy":
      return { min: 70, max: 9999 };
    case "medium":
      return { min: 25, max: 69 };
    case "hard":
      return { min: 5, max: 24 };
    default:
      return { min: 5, max: 9999 };
  }
}

export async function fetchRandomHumans(
  config: GameConfig,
  limit = 30,
): Promise<RandomHumanCandidate[]> {
  const { min, max } = getSitelinksRange(config);

  debugLog(
    "WikiRandom",
    "info",
    `Recherche d'humains (sitelinks ${min}-${max})`,
    `difficulté=${config.difficulty ?? "aucune"}, objectif=${limit}`,
  );

  const pages = await fetchRandomFrenchPages(Math.max(limit * 3, 30));

  if (pages.length === 0) {
    debugLog("WikiRandom", "warn", "Aucune page aléatoire reçue");
    return [];
  }

  debugLog(
    "WikiRandom",
    "info",
    `${pages.length} page(s) reçue(s), vérification Wikidata...`,
  );

  const entities = await fetchWikidataEntities(pages.map((p) => p.wikidataId));

  const candidates: RandomHumanCandidate[] = [];
  let rejectedNotHuman = 0;
  let rejectedNoBirth = 0;
  let rejectedSitelinks = 0;

  for (const page of pages) {
    const entity = entities[page.wikidataId];
    if (!isHumanEntity(entity)) {
      rejectedNotHuman += 1;
      continue;
    }

    const birthYear = getBirthYear(entity);
    if (birthYear === null) {
      rejectedNoBirth += 1;
      continue;
    }

    const sitelinks = getSitelinkCount(entity);
    if (sitelinks < min || sitelinks > max) {
      rejectedSitelinks += 1;
      continue;
    }

    candidates.push({
      wikidataId: page.wikidataId,
      wikipediaTitle: page.title,
      birthYear,
      sitelinks,
    });

    if (candidates.length >= limit) break;
  }

  debugLog(
    "WikiRandom",
    candidates.length > 0 ? "success" : "warn",
    `${candidates.length} humain(s) trouvé(s)`,
    [
      `rejetés : ${rejectedNotHuman} non-humains, ${rejectedNoBirth} sans date de naissance, ${rejectedSitelinks} hors sitelinks (${min}-${max})`,
      candidates.length > 0
        ? candidates
            .slice(0, 5)
            .map((c) => `${c.wikipediaTitle} (${c.birthYear}, ${c.sitelinks} links)`)
            .join("\n")
        : "Essayez un mode moins restrictif ou relancez (pages aléatoires différentes).",
    ].join("\n"),
  );

  return candidates;
}
