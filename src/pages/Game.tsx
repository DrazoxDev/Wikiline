import Header from "../components/Header";
import {
  useGameMainEnCours,
  useGameStatus,
  useGameTimeline,
  useGameVieRestante,
} from "../stores/game/game.selectors";
import { useNavigate } from "react-router";
import type { PersonCard } from "../types/person";
import CarteJeu from "../components/cards/CarteJeu";

const Game = () => {
  const gameStatus = useGameStatus();
  const vieRestante = useGameVieRestante();
  const timeline = useGameTimeline();
  const mainEnCours = useGameMainEnCours();
  const navigate = useNavigate();

  if (gameStatus === "idle") {
    return (
      <>
        <Header />
        <main className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[60vh]">
          <p className="font-soustitre text-2xl text-red-500">
            Aucune partie en cours.
          </p>
          <button
            onClick={() => navigate("/choix_difficulte")}
            className="mt-4 bg-[#21897E] text-white px-6 py-2 rounded-xl"
          >
            Choisir une difficulté
          </button>
        </main>
      </>
    );
  }
  if (gameStatus === "chargement") {
    return (
      <>
        <Header />
        <main className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[60vh]">
          <p className="font-soustitre text-2xl text-[#21897E]">
            Chargement des cartes...
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex flex-col h-[calc(100vh-80px)]">

        {/* Barre d'infos */}
        <div className="flex justify-between items-center px-6 py-3">
          <p className="font-soustitre font-bold text-[#21897E]">
            Vies : {vieRestante ?? "∞"}
          </p>
          <p className="font-soustitre font-bold text-[#21897E]">
            Cartes en main : {mainEnCours.length}
          </p>
        </div>

        {/* Zone timeline — centre */}
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
          <p className="font-soustitre text-gray-400 text-sm">— Timeline —</p>
          <div className="flex gap-4 items-center flex-wrap justify-center">
            {timeline.map((card) => (
              <CarteJeu key={card.id} carte={card} />
            ))}
          </div>
        </div>

        {/* Main du joueur — bas */}
        <div className="border-t-2 border-[#21897E]/20 px-6 py-4">
          <p className="font-soustitre text-gray-400 text-sm mb-3 text-center">
            — Votre main —
          </p>
          <div className="flex gap-3 justify-center overflow-x-auto pb-2">
            {mainEnCours.map((card) => (
              <CarteJeu key={card.id} carte={card} />
            ))}
          </div>
        </div>

      </main>
    </>
  );
};

export default Game;