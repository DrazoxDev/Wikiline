import Header from "../components/Header";
import ModeDeJeu from "../components/ModeDeJeu"

const ChoixMode = () => {
  return (
    <>
      <Header></Header>
      <section className="flex flex-col items-center w-full">

        <div className="flex flex-col items-center">
          <h2 className="font-soustitre text-4xl">Choix d'un</h2>
          <h2 className="text-[#21897E] font-titre text-8xl">Mode de jeu</h2>
        </div>

        <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full items-center">

          <ModeDeJeu
            titre="Mode entrainement"
            description="Entrainer vous au mode de jeux normal pour pouvoir battre tout les scores"
            specificitee="Nombre de vies illimitées. Pas de temps."
            couleur="vert"
            gameMode="training"
          />

          <ModeDeJeu
            titre="Mode classique"
            description="Jouez avec des vies limitées et choisissez votre niveau de difficulté"
            specificitee="Vies limitées. Timer selon la difficulté."
            couleur="blanc"
            gameMode="classic"
          />

          <ModeDeJeu
            titre="Mode Wikiline-Gacha"
            description="Ouvrez des booster de cartes et jouer avec celles obtenues, collectionner les cartes et obtenir le meilleur score"
            specificitee="Bientôt disponible"
            couleur="vert"
            gameMode="gacha"
          />
        </div>

      </section>
    </>
  )
}

export default ChoixMode;
