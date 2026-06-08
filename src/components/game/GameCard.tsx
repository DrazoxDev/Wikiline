import type { GameCard as GameCardType } from "../../types/game";

type GameCardProps = {
  card: GameCardType;
  showYear?: boolean;
  selected?: boolean;
  onClick?: () => void;
  compact?: boolean;
};

export default function GameCard({
  card,
  showYear = false,
  selected = false,
  onClick,
  compact = false,
}: GameCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={`bg-[#21897E] rounded-2xl p-2 shrink-0 transition-transform ${
        compact ? "w-28" : "w-36"
      } ${selected ? "ring-4 ring-amber-400 scale-105" : ""} ${
        onClick ? "cursor-pointer hover:scale-105" : "cursor-default"
      }`}
    >
      <div className="bg-[#E0E2DB] rounded-xl overflow-hidden">
        {card.imageUrl ? (
          <img
            src={card.imageUrl}
            alt={card.name}
            className={`w-full object-cover object-top ${
              compact ? "h-24" : "h-32"
            }`}
          />
        ) : (
          <div
            className={`w-full bg-[#21897E]/20 flex items-center justify-center text-[#21897E] ${
              compact ? "h-24" : "h-32"
            }`}
          >
            ?
          </div>
        )}
        <div className="p-2">
          <p className="text-[#21897E] font-bold text-xs text-center leading-tight">
            {card.name}
          </p>
          {showYear && (
            <p className="text-[#21897E] font-titre text-lg text-center mt-1">
              {card.birthYear}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}
