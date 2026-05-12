import Header from "../components/Header";
import { useArtworkCount } from "../stores/artwork/artwork.selectors";

const Admin = () => {
  return (
    <>
      <Header />

      <main className="container mx-auto p-4 flex gap-6">
        <section className="flex-1 min-w-0">
          <h2>Gestion des {useArtworkCount()} œuvres</h2>
        </section>
      </main>
    </>
  );
};

export default Admin;
