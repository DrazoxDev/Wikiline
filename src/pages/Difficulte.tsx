import Header from "../components/Header";
import ModeDeDifficulte from "../components/ModeDeDifficulte";

const Difficulte = () => {
    return(
        <>
        <Header></Header>
            <section>
                <div className="flex flex-col items-center">
                    <h2 className="font-soustitre text-4xl">Choix de la</h2>
                    <h2 className="text-[#21897E] font-titre text-8xl">WikiLine</h2>
                </div>

                <ModeDeDifficulte
                    titre="Facile"
                    nbretoiles={1}
                    specificitee={["5 vies", "Pas de temps", "Personnalité connue"]}
                />

                <ModeDeDifficulte
                    titre="Moyen"
                    nbretoiles={3}
                    specificitee={["4 vies", "1min par essais", "Personnalité moyennement connue"]}
                />

                <ModeDeDifficulte
                    titre="Facile"
                    nbretoiles={1}
                    specificitee={["3 vies", "30sec par essais", "Personnalité peu connue"]}
                />
            </section>
        </>
    )
}

export default Difficulte;
