import Header from "../components/Header";
import ModeDeJeu from "../components/ModeDeJeu"

const ChoixMode = () => {
    return(
        <>
        <Header></Header>
        <section className="flex flex-col items-center">
          <h2 className=" font-soustitre text-4xl">Choix d'un</h2>
          <h2 className="text-teal-700 font-titre text-8xl">
            Mode de jeu
          </h2>
          <ModeDeJeu 
          titre="Mode entrainement" 
          description="Entrainer vous au mode de jeux normal pour pouvoir battre tout les scores" 
          specificitee="Nombre de vies illimitées
          Pas de temps"
          />
          <ModeDeJeu 
          titre="Mode classique" 
          description="Entrainer vous au mode de jeux normal pour pouvoir battre tout les scores" 
          specificitee="Nombre de vie illimités
Pas de temps"
          />
          <ModeDeJeu 
          titre="Mode Wikiline-Gacha" 
          description="Ouvrez des booster de cartes et jouer avec celles obtenues, collectionner les  cartes et obtener le meilleur score" 
          specificitee="Nombre de vie illimités
Pas de temps"
          />
        </section>
        </>
    )
}

export default ChoixMode;
