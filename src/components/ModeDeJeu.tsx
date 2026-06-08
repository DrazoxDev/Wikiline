import ImageEtoileVerte from "../assets/images/etoile_verte.png";
import ImageEtoileBlanche from "../assets/images/etoile_blanche.png"

type Props = {
  titre: string;
  description: string;
  specificitee: string;
  couleur:string;
  redirection:string
}

const ModeDeJeu=({titre, description, specificitee, couleur, redirection}:Props)=>{
    const imageEtoile = couleur === "vert" ? ImageEtoileBlanche : ImageEtoileVerte;
    return(
        <>
        <a href={`/${redirection}`}>
        <div className={`${couleur === "vert" ? "bg-vert" : "bg-blanc"} border-2 bord-vert rounded-2xl px-6 py-8 w-full max-w-[600px] flex flex-col justify-between min-h-[180px]`}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex gap-3 items-center">
                    <img src={imageEtoile} className="w-15 h-15" alt="" />
                    <img src={imageEtoile} className="w-10 h-10" alt="" />
                    <img src={imageEtoile} className="w-5 h-5" alt="" />
                </div>
                <p className={`${couleur === "vert" ? "couleur-blanc" : "couleur-vert"} font-bold text-lg`}>{titre}</p>
                <div className="flex gap-3 items-center">
                    <img src={imageEtoile} className="w-5 h-5" alt="" />
                    <img src={imageEtoile} className="w-10 h-10" alt="" />
                    <img src={imageEtoile} className="w-15 h-15" alt="" />
                </div>
            </div>

            <div className="flex gap-4 items-center">
                <p className={`${couleur === "vert" ? "couleur-blanc" : "couleur-vert"} font-bold flex-1`}>{description}</p>
                <div className={`${couleur === "vert" ? "couleur-blanc bg-blanc" : "couleur-vert bg-vert"} rounded-xl p-4 flex-1`}>
                    <p className={`${couleur === "vert" ? "couleur-vert" : "couleur-blanc"} font-bold mb-2`}>Spécificitée :</p>
                    <p className={`${couleur === "vert" ? "couleur-vert" : "couleur-blanc"} font-bold flex-1`}>{specificitee}</p>
                </div>
            </div>
        </div>
        </a>

    </>

    );
}

export default ModeDeJeu;