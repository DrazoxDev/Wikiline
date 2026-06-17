import type { PersonCard, Rarete } from "../../types/person";
import type { Difficulte } from "./difficulteConfig";

export type ModeDeJeu = "classique" | "entrainement" | "challenge";

export type GameStore = {
  difficulte: Difficulte;
  modedejeux: ModeDeJeu;
  vies: number | null;
  tempsLimite: number | null;
  categorieCarte: Rarete;

  timeline: PersonCard[];
  mainEnCours: PersonCard[];
  vieRestante: number | null;
  score: number;
  gameStatus: "idle" | "chargement" | "En cours" | "gagner" | "perdu";
  lastPlacementResult: "correct" | "incorrect" | null;
  trainningornot: boolean;
  actions: GameActions;
};

export type GameActions = {
  setModeDeJeu: (mode: ModeDeJeu) => void;
  startGame: (difficulte: Difficulte) => Promise<void>;
  placerCarte: (carteId: string, position: number) => void;
  resetGame: () => void;
};