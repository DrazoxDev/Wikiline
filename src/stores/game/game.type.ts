import type { PersonCard } from "../../types/person";

export type GameStore = {
  difficulte: "facile" | "moyen" | "diffcile";
  vies: number|null;
  tempsLimite: number;
  categorieCarte: string[];

  timeline:PersonCard[];
  mainEnCours:number;
  deck:PersonCard[];
  vieRestante:number|null;
  gameStatus:"idle" | "En cours" | "gagner" | "perdu"
};
