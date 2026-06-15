import Header from "../components/Header";
import CarteJeu from "../components/cards/CarteJeu";
import { DropZone } from "./DropZone";
import { GameIdle, GameLoading, GameWin, GameLose } from "./GameScreens";
import {
  useGameMainEnCours,
  useGameStatus,
  useGameTimeline,
  useGameVieRestante,
  useGameActions,
  useLastPlacementResult,
} from "../stores/game/game.selectors";

export const GameContent = () => {
  const gameStatus = useGameStatus();
  const vieRestante = useGameVieRestante();
  const timeline = useGameTimeline();
  const mainEnCours = useGameMainEnCours();
  const { placerCarte } = useGameActions();
  const lastPlacementResult = useLastPlacementResult();

  if (gameStatus === "idle") return <GameIdle />;
  if (gameStatus === "chargement") return <GameLoading />;
  if (gameStatus === "gagner") return <GameWin />;
  if (gameStatus === "perdu") return <GameLose />;

  const flashClass =
    lastPlacementResult === "correct"
      ? "ring-4 ring-green-400 ring-offset-2 bg-green-400/10"
      : lastPlacementResult === "incorrect"
      ? "ring-4 ring-red-400 ring-offset-2 bg-red-400/10"
      : "";

  const feedbackIcon =
    lastPlacementResult === "correct" ? "✅" : lastPlacementResult === "incorrect" ? "❌" : null;

  return (
    <>
      <Header />
      <div
        className={`fixed inset-0 pointer-events-none z-50 transition-all duration-300 ${
          lastPlacementResult === "correct"
            ? "bg-green-400/15"
            : lastPlacementResult === "incorrect"
            ? "bg-red-400/15"
            : "bg-transparent"
        }`}
      />

      <main className="flex flex-col h-[calc(100vh-80px)]">
        <div className="flex justify-between items-center px-6 py-3">
          <p className="font-soustitre font-bold text-[#21897E]">Vies : {vieRestante ?? "∞"}</p>
          <p className="font-soustitre font-bold text-[#21897E]">Cartes en main : {mainEnCours.length}</p>
        </div>

        <div className={`flex-1 flex flex-col items-center justify-center gap-2 px-6 rounded-2xl mx-4 transition-all duration-300 ${flashClass}`}>
          {feedbackIcon && (
            <div className={`text-5xl animate-bounce transition-opacity duration-300 ${lastPlacementResult ? "opacity-100" : "opacity-0"}`}>
              {feedbackIcon}
            </div>
          )}
          <p className="font-soustitre text-gray-400 text-sm">— Timeline — (cliquez pour voir la date)</p>
          <div className="flex gap-0 items-center flex-wrap justify-center overflow-x-auto pb-2 max-w-full">
            <DropZone position={0} onDrop={placerCarte} />
            {timeline.map((card, index) => (
              <div key={card.id} className="flex items-center">
                <CarteJeu carte={card} isInHand={false} />
                <DropZone position={index + 1} onDrop={placerCarte} />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t-2 border-[#21897E]/20 px-6 py-4">
          <p className="font-soustitre text-gray-400 text-sm mb-3 text-center">— Votre main — (glissez une carte)</p>
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