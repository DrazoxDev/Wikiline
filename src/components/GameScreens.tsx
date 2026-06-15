import { useNavigate } from "react-router";
import { useGameIsTraining } from "../stores/game/game.selectors";
import Header from "./Header";

export const GameIdle = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4 flex items-center justify-center min-h-[60vh]">
        <p className="font-soustitre text-xl text-gray-500">
          En attente du démarrage de la partie...
        </p>
      </main>
    </>
  );
};

export const GameLoading = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4 flex items-center justify-center min-h-[60vh]">
        <p className="font-soustitre text-xl text-[#21897E]">
          Chargement...
        </p>
      </main>
    </>
  );
};

export const GameWin = () => {
  const navigate = useNavigate();
  const isTraining = useGameIsTraining();

  return (
    <>
      <Header />
      <main className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="font-titre text-4xl text-[#21897E]">🎉 Bravo !</p>
        <p className="font-soustitre text-xl">
          Vous avez placé toutes vos cartes !
        </p>

        {isTraining && (
          <p className="font-soustitre text-sm text-gray-400 italic">
            Mode entraînement — partie non enregistrée
          </p>
        )}

        <button
          onClick={() => navigate("/choix_difficulte")}
          className="bg-[#21897E] text-white px-6 py-2 rounded-xl"
        >
          Rejouer
        </button>
      </main>
    </>
  );
};

export const GameLose = () => {
  const navigate = useNavigate();
  const isTraining = useGameIsTraining();

  return (
    <>
      <Header />
      <main className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="font-titre text-4xl text-red-500">💀 Perdu !</p>
        <p className="font-soustitre text-xl">
          Vous n'avez plus de vies.
        </p>

        {isTraining && (
          <p className="font-soustitre text-sm text-gray-400 italic">
            Mode entraînement — partie non enregistrée
          </p>
        )}

        <button
          onClick={() => navigate("/choix_difficulte")}
          className="bg-[#21897E] text-white px-6 py-2 rounded-xl"
        >
          Rejouer
        </button>
      </main>
    </>
  );
};