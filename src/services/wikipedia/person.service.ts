import type { PersonCard } from "../../types/person";
import type { PersonRawData } from "./wikipedia.types";
import { buildPersonCards } from "./popularity";
import {
  fetchArticleSize,
  fetchPageViews,
  fetchPersonSummary,
  fetchWikibaseId,
} from "./wikipedia.api";
import { areHumans, fetchBirthYears } from "./wikidata.api";

async function fetchPersonRawData(
  wikipediaTitle: string
): Promise<PersonRawData> {
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
  wikipediaTitles: string[]
): Promise<PersonCard[]> {
  const results = await Promise.allSettled(
    wikipediaTitles.map((title) => fetchPersonRawData(title))
  );

  const rawDataList: PersonRawData[] = results
    .filter(
      (r): r is PromiseFulfilledResult<PersonRawData> =>
        r.status === "fulfilled"
    )
    .map((r) => r.value);

  const wikidataIds = rawDataList.map((r) => r.wikidataId);

  // Récupère humains et années de naissance en parallèle
  const [humanMap, birthYearMap] = await Promise.all([
    areHumans(wikidataIds),
    fetchBirthYears(wikidataIds),
  ]);

  const humanData = rawDataList.filter((r) => humanMap[r.wikidataId]);

  const cards = buildPersonCards(humanData);

  // Injecte l'année de naissance dans chaque carte
  const cardsWithBirth = cards.map((card) => ({
    ...card,
    anneeNaissance: birthYearMap[card.id],
  }));

  return cardsWithBirth.sort((a, b) => b.ScorePopularite - a.ScorePopularite);
}