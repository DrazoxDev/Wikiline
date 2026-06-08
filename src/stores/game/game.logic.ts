import type { GameCard } from "../../types/game";

export function shuffle<T>(items: T[]): T[] {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function isPlacementCorrect(
  timeline: GameCard[],
  card: GameCard,
  slotIndex: number,
): boolean {
  if (timeline.length === 0) return true;

  const before = timeline[slotIndex - 1];
  const after = timeline[slotIndex];

  if (before && card.birthYear <= before.birthYear) return false;
  if (after && card.birthYear >= after.birthYear) return false;

  return true;
}

export function insertAt<T>(items: T[], index: number, item: T): T[] {
  const next = [...items];
  next.splice(index, 0, item);
  return next;
}

export function initializeGame(cards: GameCard[], handSize: number) {
  const shuffled = shuffle(cards);

  if (shuffled.length < handSize + 1) {
    throw new Error("Pas assez de cartes pour démarrer la partie.");
  }

  const [starter, ...remaining] = shuffled;

  return {
    timeline: [starter],
    hand: remaining.slice(0, handSize),
  };
}

export function collectUsedPersonIds(
  timeline: GameCard[],
  hand: GameCard[],
  discard: GameCard[],
): Set<string> {
  return new Set(
    [...timeline, ...hand, ...discard].map((card) => card.id),
  );
}
