import Header from "../components/Header";
// import ListArtworks from '../components/artwork/ListArtworks';
// import { useArtworks } from "../stores/artwork/artwork.selectors";
import { NavLink } from 'react-router';

const Home = () => {
//   const artworks = useArtworks();
   return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <section className="flex flex-col items-center">
          <h2 className=" font-soustitre text-4xl">Timeline version personnalitée</h2>
          <h2 className="text-teal-700 font-titre text-8xl">
            Wikiline
          </h2>
          <p className="font-soustitre text-2xl">Le seul jeu de carte qui vous fera changer de temporalité.</p>
          <NavLink key={"/"} to={"choixmode"} className={"bg-teal-700 text-white font-bold p-4 rounded-2xl hover:scale-110 transform duration-75"}>{"Commencer à jouer"}</NavLink>
          {/* <ListArtworks artworks={artworks}>
          </ListArtworks> */}
        </section>
      </main>
    </>
  );
}
  
export default Home;
