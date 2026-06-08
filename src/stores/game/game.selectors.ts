import { useGameStore } from "./useGameStore";

export const useGameConfig = () => useGameStore((state) => state.config);

export const useGameStatus = () => useGameStore((state) => state.status);

export const useGameError = () => useGameStore((state) => state.error);

export const useTimeline = () => useGameStore((state) => state.timeline);

export const usePlayerHand = () => useGameStore((state) => state.hand);

export const useGameLives = () => useGameStore((state) => state.lives);

export const useGameTimeLeft = () => useGameStore((state) => state.timeLeft);

export const useSelectedCardId = () =>
  useGameStore((state) => state.selectedCardId);

export const usePlacementResult = () =>
  useGameStore((state) => state.placementResult);

export const useIsDrawing = () => useGameStore((state) => state.isDrawing);

export const useGameActions = () => useGameStore((state) => state.actions);
