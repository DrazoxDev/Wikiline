import type { GameCard, GameConfig } from "../../types/game";
import { debugLog, useDebugStore } from "../../stores/debug/useDebugStore";
import type { PersonRawData, RandomHumanCandidate } from "../wikipedia/wikipedia.types";
import { buildPersonCards } from "../wikipedia/popularity";
import { fetchRandomHumans } from "../wikipedia/wikidata.api";
import {
  fetchArticleSize,
  fetchPageViews,
  fetchPersonSummary,
} from "../wikipedia/wikipedia.api";

const INITIAL_PERSON_COUNT = 6;
const MAX_ATTEMPTS = 5;

function createInstanceId(wikidataId: string): string {
  return `${wikidataId}-${crypto.randomUUID()}`;
}

type EnrichResult =
  | { status: "ok"; raw: PersonRawData; candidate: RandomHumanCandidate }
  | { status: "no_image"; title: string; reason: string }
  | { status: "fetch_error"; title: string; reason: string };

async function enrichCandidate(
  candidate: RandomHumanCandidate,
): Promise<EnrichResult> {
  try {
    const [summary, pageViews, articleSize] = await Promise.all([
      fetchPersonSummary(candidate.wikipediaTitle),
      fetchPageViews(candidate.wikipediaTitle),
      fetchArticleSize(candidate.wikipediaTitle),
    ]);

    if (!summary.thumbnail?.source) {
      return {
        status: "no_image",
        title: candidate.wikipediaTitle,
        reason: "Pas de miniature sur Wikipédia",
      };
    }

    return {
      status: "ok",
      candidate,
      raw: {
        wikipediaTitle: candidate.wikipediaTitle,
        name: summary.title,
        description: summary.extract,
        imageUrl: summary.thumbnail.source,
        wikidataId: candidate.wikidataId,
        pageViews,
        articleSize,
      },
    };
  } catch (error) {
    return {
      status: "fetch_error",
      title: candidate.wikipediaTitle,
      reason: error instanceof Error ? error.message : "Erreur inconnue",
    };
  }
}

function candidateToGameCard(
  candidate: RandomHumanCandidate,
  raw: PersonRawData,
  allRaws: PersonRawData[],
): GameCard | null {
  const [card] = buildPersonCards(allRaws)
    .filter((c) => c.id === raw.wikidataId)
    .map((c) => ({
      ...c,
      birthYear: candidate.birthYear,
      instanceId: createInstanceId(c.id),
    }));

  return card?.birthYear ? card : null;
}

async function collectRandomPersons(
  config: GameConfig,
  count: number,
  excludeIds: Set<string>,
): Promise<GameCard[]> {
  const collected: GameCard[] = [];
  let attempts = 0;
  const { setLoadingProgress } = useDebugStore.getState().actions;

  debugLog(
    "Deck",
    "info",
    `Objectif : ${count} personnalité(s)`,
    `raretés autorisées : ${config.allowedRarities.join(", ")}\nexclus : ${excludeIds.size} id(s)`,
  );

  while (collected.length < count && attempts < MAX_ATTEMPTS) {
    attempts += 1;
    setLoadingProgress(
      `Tentative ${attempts}/${MAX_ATTEMPTS} — pages aléatoires Wikipédia...`,
      { current: collected.length, target: count },
    );

    debugLog("Deck", "info", `Tentative ${attempts}/${MAX_ATTEMPTS}`, `${collected.length}/${count} collectée(s)`);

    let candidates: RandomHumanCandidate[];
    try {
      candidates = await fetchRandomHumans(config, Math.max(count * 4, 12));
    } catch (error) {
      debugLog(
        "Deck",
        "error",
        `Tentative ${attempts} — recherche aléatoire en échec`,
        error instanceof Error ? error.message : "erreur inconnue",
      );
      continue;
    }

    const localExclude = new Set([
      ...excludeIds,
      ...collected.map((card) => card.id),
    ]);
    const toEnrich = candidates.filter((c) => !localExclude.has(c.wikidataId));

    debugLog(
      "Deck",
      "info",
      `${toEnrich.length} candidat(s) à enrichir en parallèle`,
      toEnrich.map((c) => c.wikipediaTitle).join(", ") || "aucun (tous déjà exclus)",
    );

    setLoadingProgress(
      `Enrichissement Wikipédia (${collected.length}/${count})...`,
      { current: collected.length, target: count },
    );

    const enrichResults = await Promise.all(
      toEnrich.map((candidate) => enrichCandidate(candidate)),
    );

    const validRaws: PersonRawData[] = [];

    for (const result of enrichResults) {
      if (result.status === "no_image") {
        debugLog("Deck", "warn", `Ignoré : ${result.title}`, result.reason);
        continue;
      }
      if (result.status === "fetch_error") {
        debugLog("Deck", "error", `Erreur : ${result.title}`, result.reason);
        continue;
      }
      validRaws.push(result.raw);
    }

    for (const result of enrichResults) {
      if (result.status !== "ok") continue;
      if (localExclude.has(result.candidate.wikidataId)) continue;

      const card = candidateToGameCard(
        result.candidate,
        result.raw,
        validRaws,
      );
      if (!card) {
        debugLog("Deck", "warn", `Carte invalide : ${result.candidate.wikipediaTitle}`, "birthYear manquant");
        continue;
      }

      if (!config.allowedRarities.includes(card.rarity)) {
        debugLog(
          "Deck",
          "warn",
          `Rareté rejetée : ${card.name}`,
          `rareté=${card.rarity}, autorisées=${config.allowedRarities.join(", ")}`,
        );
        continue;
      }

      collected.push(card);
      localExclude.add(card.id);
      setLoadingProgress(
        `Personnalité trouvée : ${card.name}`,
        { current: collected.length, target: count },
      );
      debugLog(
        "Deck",
        "success",
        `+1 : ${card.name} (${card.birthYear})`,
        `rareté=${card.rarity}, score=${card.popularityScore}`,
      );

      if (collected.length >= count) break;
    }
  }

  setLoadingProgress(null, null);

  if (collected.length < count) {
    debugLog(
      "Deck",
      "error",
      `Seulement ${collected.length}/${count} après ${attempts} tentative(s)`,
      "Causes probables :\n• Filtre de rareté trop strict\n• Beaucoup de pages sans image\n• Filtre sitelinks trop restrictif (mode facile = personnalités très connues)\n• Relancez — les pages aléatoires changent à chaque tentative",
    );
  }

  return collected;
}

export async function fetchInitialPersons(
  config: GameConfig,
): Promise<GameCard[]> {
  debugLog("Deck", "info", "=== Démarrage chargement initial (6) ===");
  const cards = await collectRandomPersons(config, INITIAL_PERSON_COUNT, new Set());

  if (cards.length < INITIAL_PERSON_COUNT) {
    throw new Error(
      `Seulement ${cards.length}/6 personnalités chargées. Consultez le panneau debug en bas.`,
    );
  }

  debugLog("Deck", "success", "=== 6 personnalités prêtes ===", cards.map((c) => c.name).join(", "));
  return cards;
}

export async function fetchOneRandomPerson(
  config: GameConfig,
  excludeIds: Set<string>,
): Promise<GameCard> {
  debugLog("Deck", "info", "=== Pioche d'une nouvelle personnalité ===");
  const cards = await collectRandomPersons(config, 1, excludeIds);

  if (cards.length === 0) {
    throw new Error(
      "Impossible de piocher. Consultez le panneau debug en bas.",
    );
  }

  return cards[0];
}
