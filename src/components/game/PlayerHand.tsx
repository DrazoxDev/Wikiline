import type { GameCard as GameCardType } from "../../types/game";
import GameCard from "./GameCard";

type PlayerHandProps = {
  hand: GameCardType[];
  selectedCardId: string | null;
  disabled?: boolean;
  onSelect: (cardId: string) => void;
};

export default function PlayerHand({
  hand,
  selectedCardId,
  disabled = false,
  onSelect,
}: PlayerHandProps) {
  return (
    <div className="mt-8">
      <p className="font-soustitre text-center mb-4 text-lg">
        {disabled
          ? "Récupération d'une nouvelle personnalité sur Wikipédia..."
          : "Sélectionnez une carte, puis choisissez où la placer sur la frise."}
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {hand.map((card) => (
          <GameCard
            key={card.instanceId}
            card={card}
            selected={selectedCardId === card.instanceId}
            onClick={disabled ? undefined : () => onSelect(card.instanceId)}
          />
        ))}
      </div>
    </div>
  );
}
