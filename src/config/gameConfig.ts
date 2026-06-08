import type { Difficulty, GameConfig, GameMode } from "../types/game";
import type { Rarity } from "../types/person";

const HAND_SIZE = 5;

const RARITY_BY_DIFFICULTY: Record<Difficulty, Rarity[]> = {
  easy: ["commune", "peu_commune"],
  medium: ["peu_commune", "rare"],
  hard: ["rare", "legendaire"],
};

const LIVES_BY_DIFFICULTY: Record<Difficulty, number> = {
  easy: 5,
  medium: 4,
  hard: 3,
};

const TIMER_BY_DIFFICULTY: Record<Difficulty, number | null> = {
  easy: null,
  medium: 60,
  hard: 30,
};

export function buildGameConfig(
  mode: GameMode,
  difficulty: Difficulty | null = null,
): GameConfig {
  if (mode === "training") {
    return {
      mode,
      difficulty: null,
      lives: null,
      handSize: HAND_SIZE,
      timerSeconds: null,
      allowedRarities: ["commune", "peu_commune", "rare", "legendaire"],
    };
  }

  if (mode === "gacha") {
    return {
      mode,
      difficulty: null,
      lives: null,
      handSize: HAND_SIZE,
      timerSeconds: null,
      allowedRarities: ["commune", "peu_commune", "rare", "legendaire"],
    };
  }

  const resolvedDifficulty = difficulty ?? "easy";

  return {
    mode: "classic",
    difficulty: resolvedDifficulty,
    lives: LIVES_BY_DIFFICULTY[resolvedDifficulty],
    handSize: HAND_SIZE,
    timerSeconds: TIMER_BY_DIFFICULTY[resolvedDifficulty],
    allowedRarities: RARITY_BY_DIFFICULTY[resolvedDifficulty],
  };
}

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: "Facile",
  medium: "Moyen",
  hard: "Difficile",
};
