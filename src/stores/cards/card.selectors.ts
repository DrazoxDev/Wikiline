import { useCardStore } from "./useCardStore";

export const useCards = () => useCardStore((state) => state.cards);

export const useCardStatus = () => useCardStore((state) => state.status);

export const useCardError = () => useCardStore((state) => state.error);

export const useCardActions = () => useCardStore((state) => state.actions);
