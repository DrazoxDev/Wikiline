import { fetchPersonCards } from "./person.service";
import type { PersonCard, Rarete } from "../../types/person";

// Ordre de rareté du plus commun au plus rare
const RARETE_ORDRE: Rarete[] = ["commune", "peu_commune", "rare", "legendaire"];

/**
 * Récupère des personnalités aléatoires depuis Wikipedia et les filtre
 * selon la rareté cible (et les raretés inférieures si pas assez de résultats).
 */
export async function fetchRandomPersons(
  count: number,
  raretesCibles?: Rarete
): Promise<PersonCard[]> {
  const params = new URLSearchParams({
    action: "query",
    list: "random",
    rnnamespace: "0",
    rnlimit: String(count * 4), // Marge pour compenser les non-humains et les filtrages
    format: "json",
    origin: "*",
  });

  const res = await fetch(`https://fr.wikipedia.org/w/api.php?${params}`);
  if (!res.ok) throw new Error("Erreur Wikipedia random");

  const data = await res.json();
  const titres: string[] = data.query.random.map(
    (page: { title: string }) => page.title
  );

  // Plus besoin de découper en paquets manuellement ici !
  // person.service.ts s'occupe de tout réguler en interne à un rythme sûr.
  const toutesLesCartes = await fetchPersonCards(titres);

  // Si aucune rareté cible, on retourne tout
  if (!raretesCibles) return toutesLesCartes;

  // On filtre par rareté cible uniquement
  const indexCible = RARETE_ORDRE.indexOf(raretesCibles);
  const cartesFiltrees = toutesLesCartes.filter(
    (c) => RARETE_ORDRE.indexOf(c.rarete) === indexCible
  );

  // Si pas assez de cartes exactement à cette rareté, on accepte aussi
  // les raretés voisines (±1 niveau) pour éviter de bloquer la partie
  if (cartesFiltrees.length < count) {
    const cartesElargies = toutesLesCartes.filter((c) => {
      const idx = RARETE_ORDRE.indexOf(c.rarete);
      return Math.abs(idx - indexCible) <= 1;
    });
    return cartesElargies.slice(0, count);
  }

  return cartesFiltrees.slice(0, count);
}