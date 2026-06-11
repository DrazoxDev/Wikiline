import Header from "../components/Header";
import { useGameMainEnCours, useGameStatus, useGameTimeline, useGameVieRestante } from "../stores/game/game.selectors";
import CarteJeu from '../components/cards/CarteJeu';

const Game = () => {
    const gameStatus = useGameStatus();
    const vieRestante = useGameVieRestante();
    const timeline = useGameTimeline();
    const mainEnCours = useGameMainEnCours();

    return (
        
        <>
            <Header />
            
            <main className="container mx-auto p-4">
                <p>Status : {gameStatus}</p>
                <p>Vies restantes : {vieRestante ?? "illimitées"}</p>
                <p>Cartes sur la timeline : {timeline.length}</p>
                <p>Cartes en main : {mainEnCours.length}</p>
                <CarteJeu/>
            </main>
        </>
    );
};

export default Game;