import { useNavigate } from "react-router";
import { buildGameConfig } from "../config/gameConfig";
import { useGameActions } from "../stores/game/game.selectors";
import type { Difficulty } from "../types/game";

type Props = {
  titre: string;
  nbretoiles: number;
  specificitee: string[];
  difficulty: Difficulty;
};

const ModeDeDifficulte = ({
  titre,
  nbretoiles,
  specificitee,
  difficulty,
}: Props) => {
  const navigate = useNavigate();
  const { setConfig } = useGameActions();

  const handleStart = () => {
    setConfig(buildGameConfig("classic", difficulty));
    navigate("/jeu");
  };

  return (
    <button
      type="button"
      onClick={handleStart}
      className="bg-[#21897E] rounded-[2rem] p-3 w-96 min-h-[500px] cursor-pointer hover:scale-105 transition-transform text-left"
    >
      <div className="bg-[#D9D9C8] rounded-[1.5rem] p-5 h-full min-h-[480px]">
        <div className="border-4 border-[#21897E] rounded-2xl px-4 py-2 text-center mb-5">
          <p className="text-4xl font-extrabold italic text-[#21897E]">{titre}</p>
          <div className="flex gap-1 justify-center mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-3xl ${i < nbretoiles ? "text-[#21897E]" : "text-[#21897E]/30"}`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <ul className="space-y-4 px-1">
          {specificitee.map((detail) => (
            <li key={detail} className="text-[#21897E] font-semibold text-xl">
              -{detail}
            </li>
          ))}
        </ul>
      </div>
    </button>
  );
};

export default ModeDeDifficulte;
