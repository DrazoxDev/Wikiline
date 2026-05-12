import { useArtworkStore } from './useArtworkStore';

export const useArtworks = () => useArtworkStore((state) => state.artworks);

export const useArtworkStatus = () => useArtworkStore((state)=> state.status);

export const useArtworkActions =  () => useArtworkStore((state) => state.actions);

export const useArtworkCount = () => useArtworkStore((state) => state.artworks.length);