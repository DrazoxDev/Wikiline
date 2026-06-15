import { useNavigate } from "react-router";
import Header from "../components/Header";

interface ScreenProps {
  message?: string;
}

export const GameIdle = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <main className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[60vh]">
        <p className="font-soustitre text-2xl text-red-500">Aucune partie en cours.</p>
        <button
          onClick={() => navigate("/choix_difficulte")}
          className="mt-4 bg-[#21897E] text-white px-6 py-2 rounded-xl"
        >
          Choisir une difficulté
        </button>
      </main>
    </>
  );
};

export const GameLoading = () => (
  <>
    <Header />
    <main className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[60vh]">
      <p className="font-soustitre text-2xl text-[#21897E]">Chargement des cartes...</p>
    </main>
  </>
);

export const GameWin = () => {
  const navigate = useNavigate();
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
};

export const GameLose = () => {
  const navigate = useNavigate();
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
};