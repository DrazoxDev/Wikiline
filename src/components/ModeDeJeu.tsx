import { useState } from "react";
import { useNavigate } from "react-router";
import ImageEtoileVerte from "../../public/images/etoile_verte.png";
import ImageEtoileBlanche from "../../public/images/etoile_blanche.png";

type Props = {
  titre: string;
  description: string;
  specificitee: string;
  couleur: string;
  redirection: string;
  onSelect?: () => void;
}

const ModeDeJeu = ({ titre, description, specificitee, couleur, redirection, onSelect }: Props) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const isVert = couleur === "vert";

  const showVert = hovered ? !isVert : isVert;

  const bgCard    = showVert ? "bg-vert"  : "bg-blanc";
  const textMain  = showVert ? "text-[#E0E2DB]" : "text-[#21897E]";
  const bgInner   = showVert ? "bg-blanc" : "bg-vert";
  const textInner = showVert ? "text-[#21897E]" : "text-[#E0E2DB]";
  const etoile    = showVert ? ImageEtoileBlanche : ImageEtoileVerte;

  const handleClick = () => {
    onSelect?.();
    navigate(`/${redirection}`);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        w-full rounded-2xl px-6 py-8 flex flex-col justify-between min-h-[180px]
        border-2 bord-vert cursor-pointer
        transition-all duration-300 ease-in-out
        hover:-translate-y-1
        ${bgCard}
      `}
    >
      <div className="flex items-center justify-between mb-4">

        <div className="flex gap-3 items-center">
          <img src={etoile} className="w-15 h-15" alt="" />
          <img src={etoile} className="w-10 h-10" alt="" />
          <img src={etoile} className="w-5  h-5"  alt="" />
        </div>

        <p className={`font-bold text-lg transition-colors duration-300 ${textMain}`}>
          {titre}
        </p>

        <div className="flex gap-3 items-center">
          <img src={etoile} className="w-5  h-5"  alt="" />
          <img src={etoile} className="w-10 h-10" alt="" />
          <img src={etoile} className="w-15 h-15" alt="" />
        </div>

      </div>

      <div className="flex gap-4 items-center">

        <p className={`font-bold flex-1 transition-colors duration-300 ${textMain}`}>
          {description}
        </p>

        <div className={`rounded-xl p-4 flex-1 transition-colors duration-300 ${bgInner}`}>
          <p className={`font-bold mb-2 transition-colors duration-300 ${textInner}`}>
            Spécificité :
          </p>
          <p className={`font-bold transition-colors duration-300 ${textInner}`}>
            {specificitee}
          </p>
        </div>

      </div>
    </div>
  );
}

export default ModeDeJeu;