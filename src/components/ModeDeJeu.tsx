type Props = {
  titre: string;
  description: string;
  specificitee: string;
}

const ModeDeJeu=({titre, description, specificitee}:Props)=>{
    return(
        <>
        <div className="flex">
            <div>
                <div>mettre les étoiles</div>
                <p>{titre}</p>
                <div>mettre les étoiles</div>
            </div>
            <div>
                <p>{description}</p>
                <div>
                    <p>Spécificitée :</p>
                    <p>{specificitee}</p>
                </div>
            </div>
        </div>
        </>
    );
}
export default ModeDeJeu;
