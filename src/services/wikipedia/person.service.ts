import type { PersonCard } from "../../types/person";
import type { PersonRawData } from "./wikipedia.types";
import { buildPersonCards } from "./popularity";
import {
  fetchArticleSize,
  fetchPageViews,
  fetchPersonSummary,
  fetchWikibaseId,
} from "./wikipedia.api";
import { isHuman } from "./wikidata.api";

async function fetchPersonRawData(wikipediaTitle: string): Promise<PersonRawData> {
  const [summary, wikidataId, pageViews, articleSize] = await Promise.all([
    fetchPersonSummary(wikipediaTitle),
    fetchWikibaseId(wikipediaTitle),
    fetchPageViews(wikipediaTitle),
    fetchArticleSize(wikipediaTitle),
  ]);

  const human = await isHuman(wikidataId);
  if (!human) {
    throw new Error(`${wikipediaTitle} n'est pas une personne humaine`);
  }

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

  const rawDataList: PersonRawData[] = [];
  const errors: string[] = [];

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      rawDataList.push(result.value);
    } else {
      const message =
        result.reason instanceof Error
          ? result.reason.message
          : String(result.reason);
      errors.push(`${wikipediaTitles[index]} : ${message}`);
    }
  });

  if (errors.length > 0) {
    console.warn("Certaines personnalités n'ont pas pu être chargées :", errors);
  }

  const cards = buildPersonCards(rawDataList);
  return cards.sort((a, b) => b.popularityScore - a.popularityScore);
}
