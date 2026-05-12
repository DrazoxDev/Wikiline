import type { ArtworkData } from "../../types/artwork";

export type ExpoStore = {
    exposedSlots: (string|null)[],
    actions: ExpoActions;
};

export type ExpoActions ={
    loadExpo: ()=>void,
    setArtworkAt: (artwork:ArtworkData,slotIndex:number)=>void,
    resetExpo: ()=>void,
}