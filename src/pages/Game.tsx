import { useEffect } from "react";
import { NavLink } from "react-router";
import Header from "../components/Header";
import DebugPanel from "../components/debug/DebugPanel";
import GameHUD from "../components/game/GameHUD";
import PlayerHand from "../components/game/PlayerHand";
import Timeline from "../components/game/Timeline";
import {
  useDebugLoadingProgress,
  useDebugLoadingStep,
} from "../stores/debug/debug.selectors";
import {
  useGameActions,
  useGameConfig,
  useGameError,
  useGameLives,
  useGameStatus,
  useGameTimeLeft,
  useIsDrawing,
  usePlacementResult,
  usePlayerHand,
  useSelectedCardId,
  useTimeline,
} from "../stores/game/game.selectors";

const Game = () => {
  const config = useGameConfig();
  const status = useGameStatus();
  const error = useGameError();
  const timeline = useTimeline();
  const hand = usePlayerHand();
  const lives = useGameLives();
  const timeLeft = useGameTimeLeft();
  const selectedCardId = useSelectedCardId();
  const placementResult = usePlacementResult();
  const isDrawing = useIsDrawing();
  const loadingStep = useDebugLoadingStep();
  const loadingProgress = useDebugLoadingProgress();
  const { startGame, selectCard, placeCard, tickTimer } = useGameActions();

  useEffect(() => {
    if (status === "idle" && config) {
      startGame();
    }
  }, [status, config, startGame]);

  useEffect(() => {
    if (status !== "playing" || timeLeft === null) return;

    const interval = window.setInterval(() => {
      tickTimer();
    }, 1000);

    return () => window.clearInterval(interval);
  }, [status, timeLeft, tickTimer]);

  if (!config) {
    return (
      <>
        <Header />
        <main className="container mx-auto p-8 text-center">
          <p className="font-soustitre text-xl mb-4">
            Aucun mode de jeu sélectionné.
          </p>
          <NavLink
            to="/choixmode"
            className="bg-[#21897E] text-white font-bold px-6 py-3 rounded-2xl"
          >
            Choisir un mode
          </NavLink>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-[#21897E] font-titre text-5xl">WikiLine</h2>
          <p className="font-soustitre text-lg">
            Placez les personnalités par ordre de naissance
          </p>
        </div>

        <GameHUD
          config={config}
          lives={lives}
          timeLeft={timeLeft}
          handCount={hand.length}
          isDrawing={isDrawing}
        />

        {status === "loading" && (
          <div className="text-center font-soustitre text-lg space-y-2 mb-32">
            <p>Chargement de 6 personnalités aléatoires...</p>
            {loadingStep && (
              <p className="text-[#21897E] text-base animate-pulse">{loadingStep}</p>
            )}
            {loadingProgress && (
              <p className="text-gray-500 text-sm">
                {loadingProgress.current}/{loadingProgress.target} trouvée(s)
              </p>
            )}
            <p className="text-gray-400 text-sm">
              Détail en temps réel dans le panneau debug en bas de l'écran
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <p className="text-red-600 font-soustitre mb-4">{error}</p>
            <NavLink
              to="/choixmode"
              className="bg-[#21897E] text-white font-bold px-6 py-3 rounded-2xl"
            >
              Retour au menu
            </NavLink>
          </div>
        )}

        {(status === "playing" || status === "won" || status === "lost") && (
          <>
            {placementResult === "correct" && (
              <p className="text-center text-green-600 font-bold mb-4">
                Bon placement !
              </p>
            )}
            {placementResult === "wrong" && (
              <p className="text-center text-red-600 font-bold mb-4">
                Mauvais placement — carte défaussée
              </p>
            )}

            <Timeline
              timeline={timeline}
              selectedCardId={isDrawing ? null : selectedCardId}
              onPlace={placeCard}
            />

            {status === "playing" && (
              <PlayerHand
                hand={hand}
                selectedCardId={selectedCardId}
                disabled={isDrawing}
                onSelect={(id) =>
                  selectCard(selectedCardId === id ? null : id)
                }
              />
            )}

            {status === "won" && (
              <div className="text-center mt-8">
                <p className="font-titre text-4xl mb-4">Victoire !</p>
                <NavLink
                  to="/choixmode"
                  className="bg-[#21897E] text-white font-bold px-6 py-3 rounded-2xl"
                >
                  Rejouer
                </NavLink>
              </div>
            )}

            {status === "lost" && (
              <div className="text-center mt-8">
                <p className="font-titre text-4xl mb-4">Partie terminée</p>
                <NavLink
                  to="/choixmode"
                  className="bg-[#21897E] text-white font-bold px-6 py-3 rounded-2xl"
                >
                  Réessayer
                </NavLink>
              </div>
            )}
          </>
        )}
      </main>
      <DebugPanel />
    </>
  );
};

export default Game;
