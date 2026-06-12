import { fetchPersonCards } from "./person.service";
import type { PersonCard } from "../../types/person";
import { KNOWN_PERSONS_POOL } from "../../data/Knownpersonspool ";

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
 * Récupère `count` personnalités depuis Wikipedia.
 * Stratégie :
 *   1. Essaie d'abord des articles aléatoires (pour la variété)
 *   2. Complète avec le pool de personnalités connues si pas assez
 */
export async function fetchRandomPersons(count: number): Promise<PersonCard[]> {
  const collected: PersonCard[] = [];
  const usedIds = new Set<string>();

  // — Étape 1 : articles Wikipedia aléatoires (2 tentatives max) —
  for (let attempt = 0; attempt < 2 && collected.length < count; attempt++) {
    const needed = count - collected.length;
    const batchSize = Math.min(needed * 5, 50);

    try {
      const params = new URLSearchParams({
        action: "query",
        list: "random",
        rnnamespace: "0",
        rnlimit: String(batchSize),
        format: "json",
        origin: "*",
      });

      const res = await fetch(`https://fr.wikipedia.org/w/api.php?${params}`);
      if (!res.ok) break;

      const data = await res.json();
      const titres: string[] = data.query.random.map(
        (page: { title: string }) => page.title
      );

      const cards = await fetchPersonCards(titres);
      for (const card of cards) {
        if (!usedIds.has(card.id) && collected.length < count) {
          collected.push(card);
          usedIds.add(card.id);
        }
      }
    } catch (err) {
      console.warn(`Tentative aléatoire ${attempt + 1} échouée :`, err);
    }
  }

  // — Étape 2 : fallback sur le pool connu si on n'a pas assez —
  if (collected.length < count) {
    const needed = count - collected.length;
    console.log(
      `Fallback pool : il manque ${needed} carte(s), on complète depuis le pool connu.`
    );

    // Mélange le pool et exclut les titres déjà collectés
    const poolMelange = shuffle(KNOWN_PERSONS_POOL).filter(
      (titre) => !collected.some((c) => c.wikipediaTitre === titre)
    );

    // On traite le pool par batch de 10 pour ne pas surcharger l'API
    for (let i = 0; i < poolMelange.length && collected.length < count; i += 10) {
      const batch = poolMelange.slice(i, i + 10);
      try {
        const cards = await fetchPersonCards(batch);
        for (const card of cards) {
          if (!usedIds.has(card.id) && collected.length < count) {
            collected.push(card);
            usedIds.add(card.id);
          }
        }
      } catch (err) {
        console.warn("Erreur batch pool :", err);
      }
    }
  }

  console.log(`fetchRandomPersons: demandé ${count}, obtenu ${collected.length}`);
  return collected;
}