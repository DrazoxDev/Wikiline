import type { PersonCard } from "../../types/person";
import type { PersonRawData } from "./wikipedia.types";
import { buildPersonCards } from "./popularity";
import {
  fetchArticleSize,
  fetchPageViews,
  fetchPersonSummary,
  fetchWikibaseId,
} from "./wikipedia.api";
import { areHumans } from "./wikidata.api";

async function fetchPersonRawData(wikipediaTitle: string): Promise<PersonRawData> {
  const [summary, wikidataId, pageViews, articleSize] = await Promise.all([
    fetchPersonSummary(wikipediaTitle),
    fetchWikibaseId(wikipediaTitle),
    fetchPageViews(wikipediaTitle),
    fetchArticleSize(wikipediaTitle),
  ]);

  return {
    wikipediaTitle,
    name: summary.title,
    description: summary.extract,
    imageUrl: summary.thumbnail?.source ?? "",
    wikidataId,
    pageViews,
    articleSize,
  };
}

export async function fetchPersonCards(
  wikipediaTitles: string[],
): Promise<PersonCard[]> {
  const results = await Promise.allSettled(
    wikipediaTitles.map((title) => fetchPersonRawData(title)),
  );

  const rawDataList: PersonRawData[] = results
    .filter((r): r is PromiseFulfilledResult<PersonRawData> => r.status === "fulfilled")
    .map((r) => r.value);

  // Une seule requête pour vérifier tous les humains d'un coup
  const wikidataIds = rawDataList.map(r => r.wikidataId);
  const humanMap = await areHumans(wikidataIds);

  const humanData = rawDataList.filter(r => humanMap[r.wikidataId]);

  const cards = buildPersonCards(humanData);
  return cards.sort((a, b) => b.ScorePopularite - a.ScorePopularite);
}