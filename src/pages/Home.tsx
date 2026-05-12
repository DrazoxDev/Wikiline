import Header from "../components/Header";
import ListArtworks from '../components/artwork/ListArtworks';
import { useArtworks } from "../stores/artwork/artwork.selectors";


const Home = () => {
  const artworks = useArtworks();
  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <section>
          <h2>Explorez notre collection d'œuvres</h2>
          <ListArtworks artworks={artworks}>
          </ListArtworks>
        </section>
      </main>
    </>
  );
}

export default Home;
