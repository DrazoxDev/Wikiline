import type { PersonCard, Rarity } from "../../types/person";
import { RARITY_LABELS } from "../../services/wikipedia";

const RARITY_STYLES: Record<Rarity, string> = {
  commune: "bg-gray-500",
  peu_commune: "bg-blue-500",
  rare: "bg-purple-600",
  legendaire: "bg-amber-500",
};

type PersonalityCardProps = {
  name: string;
  description: string;
  imageUrl: string;
  rarity?: Rarity;
  popularityScore?: number;
};

export function PersonalityCard({
  name,
  description,
  imageUrl,
  rarity,
  popularityScore,
}: PersonalityCardProps) {
  return (
    <div className="bg-[#21897E] rounded-2xl p-3 w-full relative">
      {rarity && (
        <span
          className={`absolute top-5 right-5 z-10 text-white text-xs font-bold px-2 py-1 rounded-full ${RARITY_STYLES[rarity]}`}
        >
          {RARITY_LABELS[rarity]}
        </span>
      )}
      <div className="bg-[#E0E2DB] rounded-xl overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-48 object-cover object-top"
          />
        ) : (
          <div className="w-full h-48 bg-[#21897E]/20 flex items-center justify-center text-[#21897E] text-sm">
            Pas d'image
          </div>
        )}
        <div className="p-3">
          <p className="text-[#21897E] font-bold text-center mb-1">{name}</p>
          <p className="text-[#21897E] text-sm text-center line-clamp-4">
            {description}
          </p>
          {popularityScore !== undefined && (
            <p className="text-[#21897E]/70 text-xs text-center mt-2">
              Popularité : {popularityScore}/100
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function PersonalityCardFromData({ card }: { card: PersonCard }) {
  return (
    <PersonalityCard
      name={card.name}
      description={card.description}
      imageUrl={card.imageUrl}
      rarity={card.rarity}
      popularityScore={card.popularityScore}
    />
  );
}
