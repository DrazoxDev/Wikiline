import Header from "../components/Header";
import ModeDeDifficulte from "../components/ModeDeDifficulte";
import { useGameActions, useGameModeDeJeu } from "../stores/game/game.selectors";
import { useNavigate } from "react-router";

const Difficulte = () => {
    const { startGame } = useGameActions();
    const modedejeux = useGameModeDeJeu();
    const navigate = useNavigate();

    function getSpecificitees(
        modedejeux: "classique" | "entrainement" | "challenge",
        niveauPopularite: string,
        viesClassique: number,
        tempsClassique: string
    ): string[] {
        if (modedejeux === "entrainement") {
            return [
                "Pas de vies, pas d'échec",
                tempsClassique,
                niveauPopularite,
            ];
        }

        if (modedejeux === "challenge") {
            return [
                "1 vie",
                niveauPopularite,
                "Le score, c'est le nombre de cartes bien placées",
            ];
        }

        return [
            `${viesClassique} vies`,
            tempsClassique,
            niveauPopularite,
        ];
    }

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
                        specificitee={getSpecificitees(
                            modedejeux,
                            "Personnalité connue",
                            5,
                            "Pas de temps"
                        )}
                        onClick={async () => {
                            startGame("facile");
                            navigate("/game");
                        } } modejeu={""}                    />

                    <ModeDeDifficulte
                        titre="Moyen"
                        nbretoiles={3}
                        specificitee={getSpecificitees(
                            modedejeux,
                            "Personnalité moyennement connue",
                            4,
                            "1min par essais"
                        )}
                        onClick={async () => {
                            startGame("moyen");
                            navigate("/game");
                        } } modejeu={""}                    />

                    <ModeDeDifficulte
                        titre="Difficile"
                        nbretoiles={5}
                        specificitee={getSpecificitees(
                            modedejeux,
                            "Personnalité peu connue",
                            3,
                            "10sec par essais"
                        )}
                        onClick={async () => {
                            startGame("difficile");
                            navigate("/game");
                        } } modejeu={""}                    />
                </div>

            </section>
        </>
    );
};

export default Difficulte;