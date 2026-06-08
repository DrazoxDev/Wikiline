import { NavLink, useNavigate } from "react-router";
import ImageEtoileVerte from "../assets/images/etoile_verte.png";
import ImageEtoileBlanche from "../assets/images/etoile_blanche.png";
import { buildGameConfig } from "../config/gameConfig";
import { useGameActions } from "../stores/game/game.selectors";
import type { GameMode } from "../types/game";

type Props = {
  titre: string;
  description: string;
  specificitee: string;
  couleur: string;
  gameMode: GameMode;
};

const ModeDeJeu = ({
  titre,
  description,
  specificitee,
  couleur,
  gameMode,
}: Props) => {
  const imageEtoile = couleur === "vert" ? ImageEtoileBlanche : ImageEtoileVerte;
  const navigate = useNavigate();
  const { setConfig } = useGameActions();

  const cardContent = (
    <div
      className={`${couleur === "vert" ? "bg-vert" : "bg-blanc"} border-2 bord-vert rounded-2xl px-6 py-8 w-full max-w-[600px] flex flex-col justify-between min-h-[180px] hover:scale-105 transition-transform`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-3 items-center">
          <img src={imageEtoile} className="w-15 h-15" alt="" />
          <img src={imageEtoile} className="w-10 h-10" alt="" />
          <img src={imageEtoile} className="w-5 h-5" alt="" />
        </div>
        <p
          className={`${couleur === "vert" ? "couleur-blanc" : "couleur-vert"} font-bold text-lg`}
        >
          {titre}
        </p>
        <div className="flex gap-3 items-center">
          <img src={imageEtoile} className="w-5 h-5" alt="" />
          <img src={imageEtoile} className="w-10 h-10" alt="" />
          <img src={imageEtoile} className="w-15 h-15" alt="" />
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <p
          className={`${couleur === "vert" ? "couleur-blanc" : "couleur-vert"} font-bold flex-1`}
        >
          {description}
        </p>
        <div
          className={`${couleur === "vert" ? "couleur-blanc bg-blanc" : "couleur-vert bg-vert"} rounded-xl p-4 flex-1`}
        >
          <p
            className={`${couleur === "vert" ? "couleur-vert" : "couleur-blanc"} font-bold mb-2`}
          >
            Spécificitée :
          </p>
          <p
            className={`${couleur === "vert" ? "couleur-vert" : "couleur-blanc"} font-bold flex-1`}
          >
            {specificitee}
          </p>
        </div>
      </div>
    </div>
  );

  if (gameMode === "classic") {
    return <NavLink to="/choix_difficulte">{cardContent}</NavLink>;
  }

  if (gameMode === "training") {
    return (
      <button
        type="button"
        className="w-full max-w-[600px]"
        onClick={() => {
          setConfig(buildGameConfig("training"));
          navigate("/jeu");
        }}
      >
        {cardContent}
      </button>
    );
  }

  return (
    <div className="w-full max-w-[600px] opacity-60 cursor-not-allowed">
      {cardContent}
    </div>
  );
};

export default ModeDeJeu;