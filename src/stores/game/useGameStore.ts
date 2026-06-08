import { create } from "zustand";
import {
  fetchInitialPersons,
  fetchOneRandomPerson,
} from "../../services/game/gameDeck.service";
import { debugLog } from "../debug/useDebugStore";
import {
  collectUsedPersonIds,
  initializeGame,
  insertAt,
  isPlacementCorrect,
} from "./game.logic";
import type { GameStore } from "./game.types";

const initialState = {
  config: null,
  status: "idle" as const,
  error: null,
  timeline: [],
  hand: [],
  discard: [],
  lives: null,
  timeLeft: null,
  selectedCardId: null,
  placementResult: null,
  isDrawing: false,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,
  actions: {
    setConfig: (config) => set({ ...initialState, config }),

    startGame: async () => {
      const { config } = get();
      if (!config) {
        set({ status: "error", error: "Aucune configuration de jeu sélectionnée." });
        return;
      }

      set({ status: "loading", error: null, placementResult: null });
      debugLog(
        "Game",
        "info",
        "startGame() appelé",
        `mode=${config.mode}, difficulté=${config.difficulty ?? "—"}, vies=${config.lives ?? "∞"}`,
      );

      try {
        const cards = await fetchInitialPersons(config);
        const { timeline, hand } = initializeGame(cards, config.handSize);

        debugLog(
          "Game",
          "success",
          "Partie démarrée",
          `frise: ${timeline[0].name} (${timeline[0].birthYear}), main: ${hand.length} cartes`,
        );

        set({
          status: "playing",
          timeline,
          hand,
          discard: [],
          lives: config.lives,
          timeLeft: config.timerSeconds,
          selectedCardId: null,
          placementResult: null,
          isDrawing: false,
        });
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Impossible de démarrer la partie.";
        debugLog("Game", "error", "startGame() échoué", message);
        set({ status: "error", error: message });
      }
    },

    selectCard: (cardId) => set({ selectedCardId: cardId, placementResult: null }),

    placeCard: async (slotIndex) => {
      const state = get();
      if (
        state.status !== "playing" ||
        state.isDrawing ||
        !state.selectedCardId ||
        !state.config
      ) {
        return;
      }

      const card = state.hand.find((c) => c.instanceId === state.selectedCardId);
      if (!card) return;

      const correct = isPlacementCorrect(state.timeline, card, slotIndex);
      const remainingHand = state.hand.filter(
        (c) => c.instanceId !== card.instanceId,
      );

      if (correct) {
        const won = remainingHand.length === 0;

        set({
          timeline: insertAt(state.timeline, slotIndex, card),
          hand: remainingHand,
          selectedCardId: null,
          placementResult: "correct",
          timeLeft: state.config.timerSeconds,
          status: won ? "won" : "playing",
        });
        return;
      }

      const nextLives =
        state.lives === null ? null : Math.max(0, state.lives - 1);
      const lost = nextLives === 0;
      const discard = [...state.discard, card];

      set({
        hand: remainingHand,
        discard,
        lives: nextLives,
        selectedCardId: null,
        placementResult: "wrong",
        timeLeft: state.config.timerSeconds,
        status: lost ? "lost" : "playing",
        isDrawing: !lost,
      });

      if (lost) return;

      try {
        const excludeIds = collectUsedPersonIds(
          state.timeline,
          remainingHand,
          discard,
        );
        const newCard = await fetchOneRandomPerson(state.config, excludeIds);

        set((current) => ({
          hand: [...current.hand, newCard],
          isDrawing: false,
        }));
      } catch (error) {
        set({
          isDrawing: false,
          status: "error",
          error:
            error instanceof Error
              ? error.message
              : "Impossible de piocher une nouvelle carte.",
        });
      }
    },

    tickTimer: () => {
      const state = get();
      if (state.status !== "playing" || state.timeLeft === null || state.isDrawing) {
        return;
      }

      if (state.timeLeft <= 1) {
        if (state.selectedCardId && state.config) {
          const card = state.hand.find(
            (c) => c.instanceId === state.selectedCardId,
          );
          if (card) {
            const remainingHand = state.hand.filter(
              (c) => c.instanceId !== card.instanceId,
            );
            const nextLives =
              state.lives === null ? null : Math.max(0, state.lives - 1);
            const lost = nextLives === 0;
            const discard = [...state.discard, card];

            set({
              hand: remainingHand,
              discard,
              lives: nextLives,
              selectedCardId: null,
              placementResult: "wrong",
              timeLeft: state.config.timerSeconds,
              status: lost ? "lost" : "playing",
              isDrawing: !lost,
            });

            if (!lost) {
              const { config, timeline } = get();
              if (!config) return;

              fetchOneRandomPerson(
                config,
                collectUsedPersonIds(timeline, remainingHand, discard),
              )
                .then((newCard) => {
                  set((current) => ({
                    hand: [...current.hand, newCard],
                    isDrawing: false,
                  }));
                })
                .catch((error) => {
                  set({
                    isDrawing: false,
                    status: "error",
                    error:
                      error instanceof Error
                        ? error.message
                        : "Impossible de piocher une nouvelle carte.",
                  });
                });
            }
            return;
          }
        }

        set({ timeLeft: 0 });
        return;
      }

      set({ timeLeft: state.timeLeft - 1 });
    },

    resetGame: () => set({ ...initialState }),
  },
}));
