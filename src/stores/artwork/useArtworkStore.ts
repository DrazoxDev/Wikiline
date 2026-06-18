import { create } from "zustand";
import type { ArtworkStore } from "./artwork.types";

export const useArtworkStore = create<ArtworkStore>((set) => ({
  artworks: [],
  status: "idle",
  actions: {
    loadArtworks: async () => {
        const API_URL = import.meta.env.VITE_API_URL;
        try {
            set({status: "loading"});
            const response =await fetch(API_URL);
            if(response.ok){
                const data=  await response.json();
                set({status: "success", artworks: data});
            }else{
                throw new Error("La récupération a échoué");
            }
        } catch (error) {
            set({status: "error"});
            console.error(error);
        }
    },
  },
}));