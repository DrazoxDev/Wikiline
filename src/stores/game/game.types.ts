import type {
  GameCard,
  GameConfig,
  GameStatus,
  PlacementResult,
} from "../../types/game";

export type GameStore = {
  config: GameConfig | null;
  status: GameStatus;
  error: string | null;
  timeline: GameCard[];
  hand: GameCard[];
  discard: GameCard[];
  lives: number | null;
  timeLeft: number | null;
  selectedCardId: string | null;
  placementResult: PlacementResult;
  isDrawing: boolean;
  actions: GameActions;
};

export type GameActions = {
  setConfig: (config: GameConfig) => void;
  startGame: () => Promise<void>;
  selectCard: (cardId: string | null) => void;
  placeCard: (slotIndex: number) => Promise<void>;
  tickTimer: () => void;
  resetGame: () => void;
};
