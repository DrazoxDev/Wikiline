import Header from "../components/Header";
import ModeDeDifficulte from "../components/ModeDeDifficulte";

const Difficulte = () => {
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
            difficulty="easy"
            specificitee={["5 vies", "Pas de temps", "Personnalité connue"]}
        />
        <ModeDeDifficulte
            titre="Moyen"
            nbretoiles={3}
            difficulty="medium"
            specificitee={["4 vies", "1min par essais", "Personnalité moyennement connue"]}
        />
        <ModeDeDifficulte
            titre="Difficile"
            nbretoiles={5}
            difficulty="hard"
            specificitee={["3 vies", "30sec par essais", "Personnalité peu connue"]}
        />
    </div>

</section>
        </>
    )
}

export default Difficulte;
