import Header from "../components/Header";
import ModeDeJeu from "../components/ModeDeJeu"

const ChoixMode = () => {
  return (
    <>
      <Header></Header>
      <section className="flex flex-col items-center w-full px-4 pb-10">

        <div className="flex flex-col items-center">
          <h2 className="font-soustitre text-4xl">Choix d'un</h2>
          <h2 className="couleur-vert font-titre text-8xl">Mode de jeu</h2>
        </div>

        <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto items-center">
          <ModeDeJeu
            titre="Mode entrainement"
            description="Entrainer vous au mode de jeux normal pour pouvoir battre tout les scores"
            specificitee="Nombre de vies illimitéesPas de temps"
            couleur="vert"
            redirection=""
          />
          <ModeDeJeu
            titre="Mode classique"
            description="Entrainer vous au mode de jeux normal pour pouvoir battre tout les scores"
            specificitee="Nombre de vie illimitésPas de temps"
            couleur="blanc"
            redirection="choix_difficulte"
          />
          <ModeDeJeu
            titre="Mode Wikiline-Gacha"
            description="Ouvrez des booster de cartes et jouer avec celles obtenues, collectionner les cartes et obtener le meilleur score"
            specificitee="Nombre de vie illimité. Pas de temps"
            couleur="vert"
            redirection="HubDeJeux"
          />
        </div>

      </section>
    </>
  )
}

export default ChoixMode;
