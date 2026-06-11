import Header from "../components/Header";
import { useGameMainEnCours, useGameStatus, useGameTimeline, useGameVieRestante } from "../stores/game/game.selectors";
import CarteJeu from '../components/cards/CarteJeu';
import { useNavigate } from "react-router";

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
                    <p className="font-soustitre text-2xl text-red-500">Une erreur est survenue.</p>
                    <button onClick={() => navigate("/choix_difficulte")} className="mt-4 bg-[#21897E] text-white px-6 py-2 rounded-xl">
                        Réessayer
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
                    <p className="font-soustitre text-2xl couleur-vert">Chargement des cartes...</p>
                </main>
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="container mx-auto p-4">
                <p>Status : {gameStatus}</p>
                <p>Vies restantes : {vieRestante ?? "illimitées"}</p>
                <p>Cartes sur la timeline : {timeline.length}</p>
                <p>Cartes en main : {mainEnCours.length}</p>
                <CarteJeu />
            </main>
        </>
    );
};

export default Game;