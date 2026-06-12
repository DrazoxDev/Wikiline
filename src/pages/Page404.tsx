import { Link } from "react-router";
import img404 from "../../public/images/404.webp";

const Page404 = () => {
  return (
    <main className="mx-auto max-w-7xl min-h-screen">
      <section className="pb-5 grid gap-4 justify-items-center">
        <img src={img404} alt="404" className="w-full" />
        <h1 className="text-center">Égaré sur la TimeLine du fun</h1>
        <p className="p-2">À l’heure où nous écrivons ces lignes, nous ne savons pas ce qu’il s’est précisément passé. Nous connaissons le résultat : vous êtes arrivé ici, dans cette rue sans issue de l’Internet. Vous vous êtes égaré sur les chemins pourtant tout tracés des autoroutes de l’information. Vous souhaitez désormais retrouver un environnement plus utile : la page d’accueil semble une bonne solution pour repartir de l’avant.</p>
        <Link to="/" className="rounded-lg text-white bg-blue-600 p-4 block max-content">Direction WikiLine</Link>
      </section>
    </main>
  );
};

export default Page404;
