import Header from "../components/Header";
import ModeDeDifficulte from "../components/ModeDeDifficulte";
import { useGameActions } from "../stores/game/game.selectors";
import { useNavigate } from "react-router";

const Difficulte = () => {
    const { startGame } = useGameActions();
    const navigate = useNavigate();

    return(
        <>
        <Header></Header>
            <section className="flex flex-col items-center gap-12">

                <div className="flex flex-col items-center">
                    <h2 className="font-soustitre text-4xl">Choix de la</h2>
                    <h2 className="text-[#21897E] font-titre text-8xl">Difficultée</h2>
                </div>

                <div className="flex flex-row justify-center gap-8">
                    <ModeDeDifficulte
                        titre="Facile"
                        nbretoiles={1}
                        specificitee={["5 vies", "Pas de temps", "Personnalité connue"]}
                        onClick={() => { startGame("facile"); navigate("/game"); }}
                    />
                    <ModeDeDifficulte
                        titre="Moyen"
                        nbretoiles={3}
                        specificitee={["4 vies", "1min par essais", "Personnalité moyennement connue"]}
                        onClick={() => { startGame("moyen"); navigate("/game"); }}
                    />
                    <ModeDeDifficulte
                        titre="Difficile"
                        nbretoiles={5}
                        specificitee={["3 vies", "10sec par essais", "Personnalité peu connue"]}
                        onClick={() => { startGame("difficile"); navigate("/game"); }}
                    />
                </div>

            </section>
        </>
    )
}

export default Difficulte;