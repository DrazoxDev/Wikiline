import Header from "../components/Header";
import {
  useGameMainEnCours,
  useGameStatus,
  useGameTimeline,
  useGameVieRestante,
  useGameActions,
} from "../stores/game/game.selectors";
import { useNavigate } from "react-router";
import CarteJeu from "../components/cards/CarteJeu";

/** Zone de dépôt entre deux cartes (ou aux extrémités) de la timeline */
const DropZone = ({
  position,
  onDrop,
}: {
  position: number;
  onDrop: (carteId: string, position: number) => void;
}) => {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsOver(true);
  };

  const handleDragLeave = () => setIsOver(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    const carteId = e.dataTransfer.getData("carteId");
    if (carteId) onDrop(carteId, position);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`shrink-0 w-10 h-60 rounded-xl border-2 border-dashed transition-all duration-200 flex items-center justify-center ${
        isOver
          ? "border-[#21897E] bg-[#21897E]/20 w-16"
          : "border-[#21897E]/30 bg-transparent"
      }`}
    >
      {isOver && (
        <span className="text-[#21897E] text-2xl font-bold">+</span>
      )}
    </div>
  );
};

import { useState } from "react";

const Game = () => {
  const gameStatus = useGameStatus();
  const vieRestante = useGameVieRestante();
  const timeline = useGameTimeline();
  const mainEnCours = useGameMainEnCours();
  const { placerCarte } = useGameActions();
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

  if (gameStatus === "gagner") {
    return (
      <>
        <Header />
        <main className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <p className="font-titre text-4xl text-[#21897E]">🎉 Bravo !</p>
          <p className="font-soustitre text-xl">Vous avez placé toutes vos cartes !</p>
          <button
            onClick={() => navigate("/choix_difficulte")}
            className="bg-[#21897E] text-white px-6 py-2 rounded-xl"
          >
            Rejouer
          </button>
        </main>
      </>
    );
  }

  if (gameStatus === "perdu") {
    return (
      <>
        <Header />
        <main className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <p className="font-titre text-4xl text-red-500">💀 Perdu !</p>
          <p className="font-soustitre text-xl">Vous n'avez plus de vies.</p>
          <button
            onClick={() => navigate("/choix_difficulte")}
            className="bg-[#21897E] text-white px-6 py-2 rounded-xl"
          >
            Rejouer
          </button>
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

        {/* Zone timeline */}
        <div className="flex-1 flex flex-col items-center justify-center gap-2 px-6">
          <p className="font-soustitre text-gray-400 text-sm">— Timeline — (cliquez sur une carte pour voir la date)</p>
          <div className="flex gap-0 items-center flex-wrap justify-center overflow-x-auto pb-2 max-w-full">
            {/* Drop zone avant la première carte */}
            <DropZone position={0} onDrop={placerCarte} />

            {timeline.map((card, index) => (
              <div key={card.id} className="flex items-center">
                <CarteJeu carte={card} isInHand={false} />
                {/* Drop zone après chaque carte */}
                <DropZone position={index + 1} onDrop={placerCarte} />
              </div>
            ))}
          </div>
        </div>

        {/* Main du joueur */}
        <div className="border-t-2 border-[#21897E]/20 px-6 py-4">
          <p className="font-soustitre text-gray-400 text-sm mb-3 text-center">
            — Votre main — (glissez une carte sur la timeline)
          </p>
          <div className="flex gap-3 justify-center overflow-x-auto pb-2">
            {mainEnCours.map((card) => (
              <CarteJeu key={card.id} carte={card} isInHand={true} />
            ))}
          </div>
        </div>

      </main>
    </>
  );
};

export default Game;