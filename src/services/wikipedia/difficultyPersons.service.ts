import { fetchPersonCards } from "./person.service";
import type { PersonCard } from "../../types/person";
import type { Difficulte } from "../../stores/game/difficulteConfig";
import { PERSONS_FACILE } from "../../data/personsFacile";
import { PERSONS_MOYEN } from "../../data/personsMoyen";
import { PERSONS_DIFFICILE } from "../../data/personsDifficile";

/** Mélange un tableau (Fisher-Yates) */
function shuffle<T>(arr: readonly T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Map des difficultés vers les pools de personnalités correspondants
 */
const DIFFICULTY_PERSONS_MAP: Record<Difficulte, readonly string[]> = {
  facile: PERSONS_FACILE,
  moyen: PERSONS_MOYEN,
  difficile: PERSONS_DIFFICILE,
  entrainement: PERSONS_FACILE, // Entraînement utilise le pool facile
};

/**
 * Récupère `count` personnalités depuis le pool correspondant à la difficulté.
 * Stratégie :
 *   1. Mélange le pool de la difficulté demandée
 *   2. Récupère les cartes via l'API Wikipedia par batches
 *   3. Continue tant qu'on n'a pas assez de cartes valides
 */
export async function fetchPersonsByDifficulty(
  difficulte: Difficulte,
  count: number
): Promise<PersonCard[]> {
  const pool = DIFFICULTY_PERSONS_MAP[difficulte];
  
  if (!pool || pool.length === 0) {
    console.warn(`Pool vide pour la difficulté : ${difficulte}`);
    return [];
  }

  // Mélange le pool pour avoir de la variété
  const shuffledPool = shuffle(pool);
  const collected: PersonCard[] = [];
  const usedIds = new Set<string>();
  const usedTitles = new Set<string>();
  
  // On essaie par batches de 10 pour ne pas surcharger l'API
  const batchSize = 10;
  
  for (let i = 0; i < shuffledPool.length && collected.length < count; i += batchSize) {
    const batch = shuffledPool.slice(i, i + batchSize);
    // Filtre les titres déjà utilisés
    const availableTitles = batch.filter(title => !usedTitles.has(title));
    
    if (availableTitles.length === 0) continue;
    
    try {
      const cards = await fetchPersonCards(availableTitles);
      
      // Ajoute seulement les cartes non-dupliquées
      for (const card of cards) {
        if (!usedIds.has(card.id) && collected.length < count) {
          collected.push(card);
          usedIds.add(card.id);
          usedTitles.add(card.wikipediaTitre);
        }
      }
      
      // Marque tous les titres du batch comme utilisés (même ceux qui ont échoué)
      for (const title of availableTitles) {
        usedTitles.add(title);
      }
      
    } catch (error) {
      console.warn(`Erreur lors de la récupération d'un batch pour ${difficulte}:`, error);
      // Continue avec le prochain batch même si celui-ci échoue
    }
  }

  console.log(`fetchPersonsByDifficulty (${difficulte}): demandé ${count}, obtenu ${collected.length}`);
  return collected;
}
