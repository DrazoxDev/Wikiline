import { create } from "zustand";
import type { GameStore } from "./game.type";

export const useGameStore = create<GameStore>((set) => ({
      difficulte: "facile",
      vies: 5,
      tempsLimite: 60,
      categorieCarte: ["commune", "peu_commune"],
    
      timeline:[],
      mainEnCours:5,
      deck:[],
      vieRestante:3,
      gameStatus:"idle",
}))