import type { GameConfig } from "../../types/game";
import { DIFFICULTY_LABELS } from "../../config/gameConfig";

type GameHUDProps = {
  config: GameConfig | null;
  lives: number | null;
  timeLeft: number | null;
  handCount: number;
  isDrawing: boolean;
};

export default function GameHUD({
  config,
  lives,
  timeLeft,
  handCount,
  isDrawing,
}: GameHUDProps) {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center mb-6">
      {config?.difficulty && (
        <span className="bg-[#21897E] text-white px-4 py-2 rounded-full font-bold">
          {DIFFICULTY_LABELS[config.difficulty]}
        </span>
      )}

      <span className="bg-[#E0E2DB] text-[#21897E] px-4 py-2 rounded-full font-bold">
        Vies : {lives === null ? "∞" : lives}
      </span>

      {timeLeft !== null && (
        <span
          className={`px-4 py-2 rounded-full font-bold ${
            timeLeft <= 10
              ? "bg-red-500 text-white"
              : "bg-[#E0E2DB] text-[#21897E]"
          }`}
        >
          Temps : {timeLeft}s
        </span>
      )}

      <span className="bg-[#E0E2DB] text-[#21897E] px-4 py-2 rounded-full font-bold">
        Main : {handCount}
      </span>

      {isDrawing && (
        <span className="bg-amber-400 text-white px-4 py-2 rounded-full font-bold animate-pulse">
          Pioche en cours...
        </span>
      )}
    </div>
  );
}
