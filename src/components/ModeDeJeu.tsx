type Props = {
  titre: string;
  description: string;
  specificitee: string;
}

const ModeDeJeu=({titre, description, specificitee}:Props)=>{
    return(
        <>
        <div className="bg-vert rounded-2xl px-6 py-8 w-full flex flex-col justify-between min-h-[180px]">
            <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1">
                    {/* nbre etoiles */}
                </div>
                <p className="couleur-blanc font-bold text-lg">{titre}</p>
                <div className="flex gap-1">
                    {/* nbre etoioles */}
                </div>
            </div>

            <div className="flex gap-4 items-center">
                <p className="couleur-blanc font-bold flex-1">{description}</p>
                <div className="bg-blanc rounded-xl p-4 flex-1">
                    <p className="couleur-vert font-bold mb-2">Spécificitée :</p>
                    <p className="couleur-vert font-bold flex-1">{specificitee}</p>
                </div>
            </div>
        </div>

    </>

    );
}

export default ModeDeJeu;
