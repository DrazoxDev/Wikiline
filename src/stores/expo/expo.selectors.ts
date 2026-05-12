import { useArtworkStore } from "../artwork/useArtworkStore";
import { useExpoStore } from "./useExpoStore";

const artworks = useArtworkStore((state) => state.artworks);
export const useExposedSlots = () => useExpoStore((state)=>state.exposedSlots);
export const useExpoActions = () => useExpoStore((state)=>state.actions);
export const useArtworksExpoBySlot = () => {
  const artworks = useArtworkStore((state) => state.artworks);
  const exposedSlots = useExpoStore((state) => state.exposedSlots);
  return exposedSlots.map((slot)=>)
};
export const useArtworksExpo = () => useExpoStore(()=> {

})