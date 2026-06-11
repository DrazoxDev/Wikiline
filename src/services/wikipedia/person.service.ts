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

// Fonction utilitaire pour forcer une pause
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchPersonRawData(
  wikipediaTitle: string
): Promise<PersonRawData> {
  // On garde le Promise.all ici car pour un seul article, les 4 requêtes passent sans problème
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
  const rawDataList: PersonRawData[] = [];

  // BOUCLE SÉQUENTIELLE : On traite les articles 1 par 1 pour éliminer définitivement l'erreur 429
  for (const title of wikipediaTitles) {
    try {
      const data = await fetchPersonRawData(title);
      
      // On vérifie qu'on a bien récupéré l'ID Wikidata pour éviter les crashs plus bas
      if (data && data.wikidataId) {
        rawDataList.push(data);
      }
      
      // Une pause de 150ms entre chaque personnage pour lisser le trafic global
      await delay(150);
    } catch (error) {
      // Si un article échoue à cause d'une 429 résiduelle ou autre, on ne fait pas crasher tout le jeu
      console.warn(`Erreur lors de la récupération de "${title}":`, error);
    }
  }

  // Si aucun personnage n'a pu être chargé, on s'arrête là
  if (rawDataList.length === 0) return [];

  const wikidataIds = rawDataList.map((r) => r.wikidataId);

  // Petite pause de sécurité avant d'attaquer Wikidata qui commençait à saturer aussi
  await delay(200);

  // Récupère si ce sont des humains et leurs années de naissance
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