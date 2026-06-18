import type { ArtworkData } from '../../types/artwork';
import ArtworkDetail from './ArtworkDetail';
import ArtworkPreview from './ArtworkPreview';
import { useState } from 'react';


type Props = {
  artworks: ArtworkData[];
}

const ListArtworks = ({artworks}:Props) => {

const [artworkSelected,setArtworkSelected ] = useState<ArtworkData|null>(null);


     return (
    <>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]  gap-6 p-4">
       {
          artworks.map((artwork) => 
          <li key={artwork.id}>
            <ArtworkPreview artwork={artwork} onViewDetail={(artwork)=>setArtworkSelected(artwork)}>
          </ArtworkPreview>
          </li>
          )
        }
      </ul>
      {artworkSelected && <ArtworkDetail
          artwork={artworkSelected}
          onClose={()=>setArtworkSelected(null)}
        >
        </ArtworkDetail>}
    </>
  );
};

export default ListArtworks;
