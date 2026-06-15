import Header from "../components/Header";
import ModeDeDifficulte from "../components/ModeDeDifficulte";
import { useGameActions } from "../stores/game/game.selectors";
import { useNavigate } from "react-router";

const Difficulte = () => {
    const { startGame } = useGameActions();
    const navigate = useNavigate();

    return (
        <>
            <Header />

            <section className="flex flex-col items-center gap-8 md:gap-12 px-4 py-6">
                
                <div className="flex flex-col items-center text-center">
                    <h2 className="font-soustitre text-2xl sm:text-3xl md:text-4xl">
                        Choix de la
                    </h2>

                    <h2 className="text-[#21897E] font-titre text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                        Difficultée
                    </h2>
                </div>

                <div className="
                    flex
                    flex-col
                    md:flex-row
                    flex-wrap
                    justify-center
                    items-center
                    gap-6
                    md:gap-8
                    w-full
                ">
                    <ModeDeDifficulte
                        titre="Facile"
                        nbretoiles={1}
                        specificitee={[
                            "5 vies",
                            "Pas de temps",
                            "Personnalité connue",
                        ]}
                        onClick={async () => {
                            startGame("facile");
                            navigate("/game");
                        }}
                    />

                    <ModeDeDifficulte
                        titre="Moyen"
                        nbretoiles={3}
                        specificitee={[
                            "4 vies",
                            "1min par essais",
                            "Personnalité moyennement connue",
                        ]}
                        onClick={async () => {
                            startGame("moyen");
                            navigate("/game");
                        }}
                    />

                    <ModeDeDifficulte
                        titre="Difficile"
                        nbretoiles={5}
                        specificitee={[
                            "3 vies",
                            "10sec par essais",
                            "Personnalité peu connue",
                        ]}
                        onClick={async () => {
                            startGame("difficile");
                            navigate("/game");
                        }}
                    />
                </div>

            </section>
        </>
    );
};

export default Difficulte;