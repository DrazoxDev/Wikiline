import type { GameCard as GameCardType } from "../../types/game";
import GameCard from "./GameCard";

type TimelineProps = {
  timeline: GameCardType[];
  selectedCardId: string | null;
  onPlace: (slotIndex: number) => void;
};

function PlacementSlot({
  index,
  enabled,
  onPlace,
}: {
  index: number;
  enabled: boolean;
  onPlace: (slotIndex: number) => void;
}) {
  return (
    <button
      type="button"
      disabled={!enabled}
      onClick={() => onPlace(index)}
      className={`w-10 h-32 shrink-0 rounded-xl border-2 border-dashed flex items-center justify-center text-xl font-bold transition-colors ${
        enabled
          ? "border-[#21897E] text-[#21897E] hover:bg-[#21897E]/10 cursor-pointer"
          : "border-gray-300 text-gray-300 cursor-default"
      }`}
      title={enabled ? "Placer ici" : undefined}
    >
      +
    </button>
  );
}

export default function Timeline({
  timeline,
  selectedCardId,
  onPlace,
}: TimelineProps) {
  const canPlace = selectedCardId !== null;

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex items-center gap-3 min-w-max px-2">
        <PlacementSlot index={0} enabled={canPlace} onPlace={onPlace} />

        {timeline.map((card, index) => (
          <div key={card.instanceId} className="flex items-center gap-3">
            <GameCard card={card} showYear />
            <PlacementSlot
              index={index + 1}
              enabled={canPlace}
              onPlace={onPlace}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
