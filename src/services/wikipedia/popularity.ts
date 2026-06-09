import type { PersonCard} from "../../types/person";
import type { PersonRawData } from "./wikipedia.types";
import type { Rarete } from "../../types/person";
const RARITY_THRESHOLDS: { min: number; rarity: Rarete }[] = [
  { min: 75, rarity: "legendaire" },
  { min: 50, rarity: "rare" },
  { min: 25, rarity: "peu_commune" },
  { min: 0, rarity: "commune" },
];

export function scoreToRarity(score: number): Rarete {
  const match = RARITY_THRESHOLDS.find((threshold) => score >= threshold.min);
  return match?.rarity ?? "commune";
}

export function computePopularityScore(
  pageViews: number,
  articleSize: number,
  maxViews: number,
  maxSize: number,
): number {
  const viewsNorm = maxViews > 0 ? (pageViews / maxViews) * 100 : 0;
  const sizeNorm = maxSize > 0 ? (articleSize / maxSize) * 100 : 0;
  return Math.round(viewsNorm * 0.6 + sizeNorm * 0.4);
}

export function buildPersonCards(rawDataList: PersonRawData[]): PersonCard[] {
  const maxViews = Math.max(...rawDataList.map((p) => p.pageViews), 1);
  const maxSize = Math.max(...rawDataList.map((p) => p.articleSize), 1);

  return rawDataList.map((raw) => {
    const popularityScore = computePopularityScore(
      raw.pageViews,
      raw.articleSize,
      maxViews,
      maxSize,
    );

    return {
      id: raw.wikidataId,
      wikipediaTitre: raw.wikipediaTitle,
      nom: raw.name,
      description: raw.description,
      imageUrl: raw.imageUrl,
      ScorePopularite: popularityScore,
      rarete: scoreToRarity(popularityScore),
      NbrVuPage: raw.pageViews,
      TailleArticle: raw.articleSize,
    };
  });
}

export const RARITY_LABELS: Record<Rarete, string> = {
  commune: "Commune",
  peu_commune: "Peu commune",
  rare: "Rare",
  legendaire: "Légendaire",
};
