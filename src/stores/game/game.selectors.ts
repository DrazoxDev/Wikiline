import { useGameStore } from './useGameStore';

export const useGameDifficulte = () => useGameStore((state) => state.difficulte)

export const useGameModeDeJeu = () => useGameStore((state) => state.modedejeux)

export const useGameStatus = () => useGameStore((state) => state.gameStatus)

export const useGameVies = () => useGameStore((state) => state.vies)

export const useGameVieRestante = () => useGameStore((state) => state.vieRestante)

export const useGameTempsLimite = () => useGameStore((state) => state.tempsLimite)

export const useGameMainEnCours = () => useGameStore((state) => state.mainEnCours)

export const useGameCategorieCarte = () => useGameStore((state) => state.categorieCarte)

export const useGameTimeline = () => useGameStore((state) => state.timeline)

export const useGameActions = () => useGameStore((state) => state.actions)

export const useLastPlacementResult = () => useGameStore((state) => state.lastPlacementResult)

export const useGameIsTraining = () => useGameStore((state) => state.trainningornot)

export const useGameScore = () => useGameStore((state) => state.score)