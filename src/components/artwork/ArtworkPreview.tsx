import type { ArtworkData } from "../../types/artwork";

type Props = {
  artwork: ArtworkData;
  onViewDetail?: (artwork: ArtworkData) => void;
}

const ArtworkPreview = ({ artwork, onViewDetail = () => {} }: Props) => {
  const headingId = `artwork-title-${artwork.id}`;
  const buttonId = `artwork-button-${artwork.id}`;
 return (
        <article className="bg-white shadow-xl rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl">
            <div className="h-80 overflow-hidden">
                <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover object-top"
                />
            </div>
            <div className="p-4">
                <h3
                    id={headingId}
                    className="text-xl font-semibold text-gray-800 truncate"
                >{artwork.title}
                </h3>
                <button
                    onClick={() => onViewDetail(artwork)}
                    aria-labelledby={`${headingId} ${buttonId}`}
                    id={buttonId}
                    className="mt-2 text-blue-600 font-medium hover:bg-blue-600 hover:text-white py-2 px-4 rounded-full border-2 border-blue-600 transition duration-300 ease-in-out shadow-md transform hover:scale-105"
                >
                    Voir les détails
                </button>


            </div>
        </article>
    );
};

export default ArtworkPreview;
