import Header from "../components/Header";
import PersonCarousel from "../components/home/PersonCarousel";
import { NavLink } from "react-router";

const Home = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <section className="flex flex-col items-center">
          <h2 className="font-soustitre text-4xl">
            Timeline version personnalitée
          </h2>
          <h2 className="text-teal-700 font-titre text-8xl">Wikiline</h2>
          <p className="font-soustitre text-2xl text-center max-w-2xl">Le seul jeu de carte qui vous fera changer de temporalité.</p>
          <NavLink to="/choixmode" className="bg-teal-700 text-white font-bold p-4 rounded-2xl hover:scale-110 transform duration-75 mt-4">Commencer à jouer</NavLink>
          <PersonCarousel />
          <p className="font-soustitre text-lg text-center mt-8 max-w-xl text-gray-600">Testez vos connaissances sur toutes ces personnes que vous connaissez( ou pas )</p>
        </section>
      </main>
    </>
  );
};

export default Home;
