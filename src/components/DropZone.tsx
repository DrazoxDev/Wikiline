import { useDrop } from "react-dnd";
import { CARTE_DRAG_TYPE } from "../components/cards/CarteJeu";

interface DropZoneProps {
  position: number;
  onDrop: (carteId: string, position: number) => void;
}

export const DropZone = ({ position, onDrop }: DropZoneProps) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: CARTE_DRAG_TYPE,
    drop: (item: { carteId: string }) => {
      onDrop(item.carteId, position);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={dropRef}
      className={`shrink-0 h-60 rounded-xl border-2 border-dashed transition-all duration-200 flex items-center justify-center ${
        isOver
          ? "w-16 border-[#21897E] bg-[#21897E]/20"
          : "w-10 border-[#21897E]/30 bg-transparent"
      }`}
    >
      {isOver && <span className="text-[#21897E] text-2xl font-bold">+</span>}
    </div>
  );
};