import { create } from "zustand";
import { SAMPLE_PERSON_TITLES } from "../../data/samplePersons";
import { fetchPersonCards } from "../../services/wikipedia";
import type { CardStore } from "./card.types";

export const useCardStore = create<CardStore>((set) => ({
  cards: [],
  status: "idle",
  error: null,
  actions: {
    loadSampleCards: async () => {
      set({ status: "loading", error: null });
      try {
        const cards = await fetchPersonCards([...SAMPLE_PERSON_TITLES]);
        set({ status: "success", cards });
      } catch (error) {
        set({
          status: "error",
          error:
            error instanceof Error
              ? error.message
              : "Erreur lors du chargement des cartes",
        });
      }
    },
    loadCards: async (wikipediaTitles) => {
      set({ status: "loading", error: null });
      try {
        const cards = await fetchPersonCards(wikipediaTitles);
        set({ status: "success", cards });
      } catch (error) {
        set({
          status: "error",
          error:
            error instanceof Error
              ? error.message
              : "Erreur lors du chargement des cartes",
        });
      }
    },
  },
}));
