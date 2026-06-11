import { useRef, useState } from "react";
import type { PersonCard } from "../../types/person";

type CarteJeuProps = {
  carte: PersonCard;
  /** true = carte dans la main du joueur, false = carte sur la timeline */
  isInHand?: boolean;
};

const CarteJeu = ({ carte, isInHand = false }: CarteJeuProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("carteId", carte.id);
    e.dataTransfer.effectAllowed = "move";

    // Utilise le DOM réel de la carte comme image de drag
    if (cardRef.current) {
      e.dataTransfer.setDragImage(cardRef.current, 80, 120);
    }
  };

  // Carte en main : draggable
  if (isInHand) {
    return (
      <div
        ref={cardRef}
        draggable
        onDragStart={handleDragStart}
        className="relative w-40 h-60 cursor-grab active:cursor-grabbing shrink-0"
      >
        <div className="bg-[#21897E] rounded-[2rem] p-[3px] h-full">
          <div className="bg-white rounded-[1.8rem] overflow-hidden h-full flex flex-col">
            {carte.imageUrl && (
              <img
                src={carte.imageUrl}
                alt={carte.nom}
                className="w-full h-32 object-cover object-top"
              />
            )}
            <div className="flex-1 flex flex-col justify-center items-center p-2 text-center">
              <p className="font-titre text-[#21897E] text-sm leading-tight">
                {carte.nom}
              </p>
              {/* Date cachée en main — remplacée par des "?" */}
              <p className="mt-2 text-2xl font-bold text-[#21897E]/30">?</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Carte sur la timeline : flippable, description et date visibles
  return (
    <div
      className="relative w-40 h-60 cursor-pointer shrink-0"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Face avant : nom + description */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <div className="bg-[#21897E] rounded-[2rem] p-[3px] h-full">
            <div className="bg-white rounded-[1.8rem] overflow-hidden h-full flex flex-col">
              {carte.imageUrl && (
                <img
                  src={carte.imageUrl}
                  alt={carte.nom}
                  className="w-full h-28 object-cover object-top"
                />
              )}
              <div className="flex-1 flex flex-col justify-center items-center p-2 text-center overflow-hidden">
                <p className="font-titre text-[#21897E] text-sm leading-tight">
                  {carte.nom}
                </p>
                <p className="font-soustitre text-xs mt-1 text-gray-700 line-clamp-3">
                  {carte.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Face arrière : date de naissance */}
        <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="bg-[#21897E] rounded-[2rem] p-[3px] h-full">
            <div className="bg-white rounded-[1.8rem] overflow-hidden h-full flex flex-col">
              {carte.imageUrl && (
                <img
                  src={carte.imageUrl}
                  alt={carte.nom}
                  className="w-full h-28 object-cover object-top"
                />
              )}
              <div className="flex-1 flex flex-col justify-center items-center p-3">
                <p className="font-titre text-[#21897E] text-sm">{carte.nom}</p>
                <p className="mt-2 text-xs text-gray-500">Né(e) en :</p>
                <p className="font-bold text-2xl text-[#21897E]">
                  {carte.anneeNaissance ?? "?"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarteJeu;