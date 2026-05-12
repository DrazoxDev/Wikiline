import type { ArtworkData } from "../../types/artwork";

type Props = {
  artwork: ArtworkData;
}

const DraggableArtwork = ({ artwork }: Props) => {

   return (
   
      <div  className="overflow-hidden  rounded-lg" draggable="true">
        <img 
          src={artwork.image} 
          alt={artwork.title} 
          draggable="false"
          className="w-full aspect-square object-cover"
           // Désactive le drag natif de l’image
        />
      </div>

  );
};

export default DraggableArtwork;
