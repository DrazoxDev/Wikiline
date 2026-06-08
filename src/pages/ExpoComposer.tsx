
import Header from "../components/Header";


const ExpoComposer = () => {
  
  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <section className="grid gap-4">
          <h2>Composer votre expo <span className="text-lg">(Déplacez les œuvres vers la zone d'exposition )</span></h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(4rem,1fr))] gap-4">

          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-4">

          </div>
          <button
            className="mt-4 p-2 bg-blue-500 text-white rounded place-self-center"
          >
            Recommencer l'exposition
          </button>
        </section>
      </main>
    </>
  );
};

export default ExpoComposer;
