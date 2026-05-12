import {useArtworkStore} from "./useArtworkStore.ts";

const testStore = async () => {
 console.log("Artworks before loaded:", useArtworkStore.getState().status)
  await useArtworkStore.getState().actions.loadArtworks();  // Assurez-vous que cette fonction existe
  console.log("Artworks after loaded:", useArtworkStore.getState().status)
  console.table(
   useArtworkStore.getState().artworks.map(artwork => ({
      Id: artwork.id,
      Title: artwork.title,
      Year: artwork.year,

    }))
  );
};
testStore();
