import type { PersonCard, Rarete } from "../../types/person";
import type { Difficulte } from "./difficulteConfig";

export type GameStore = {
  difficulte: Difficulte;
  vies: number | null;
  tempsLimite: number | null;
  categorieCarte: Rarete;

  timeline: PersonCard[];
  mainEnCours: PersonCard[];
  vieRestante: number | null;
  gameStatus: "idle" | "chargement" | "En cours" | "gagner" | "perdu";
  actions: GameActions;

};

export type GameActions = {
  startGame: (difficulte: Difficulte) => Promise<void>    
  placerCarte: (carteId: string, position: number) => void
  resetGame: () => void
}
