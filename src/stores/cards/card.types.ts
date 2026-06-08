import type { PersonCard } from "../../types/person";

export type CardStore = {
  cards: PersonCard[];
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
  actions: CardActions;
};

export type CardActions = {
  loadSampleCards: () => Promise<void>;
  loadCards: (wikipediaTitles: string[]) => Promise<void>;
};
