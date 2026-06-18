export type ArtworkStore = {
  artworks: [],
  status:"idle"|"loading"|"success"|"error",
  actions: ArtworkActions,
};

export type ArtworkActions ={
    loadArtworks: ()=> Promise<void>,
}