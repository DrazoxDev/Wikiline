import Header from "../components/Header";

const VosCartes = () => {
  return (
    <>
      <Header />

      <section className="container mx-auto px-4 py-6">

        <div className="flex flex-col items-center mb-8">
          <h2 className="font-soustitre text-4xl">Votre collection</h2>
            <h1 className="font-titre text-[#21897E] text-7xl lg:text-8xl">WikiLine-Gacha</h1>
        </div>

        <div className="bg-[#21897E] rounded-[2rem] p-5">
          <div className="bg-[#D9D9C8] rounded-[1.5rem] p-5 mb-5">
            <div className="flex flex-wrap gap-3 items-center mb-6">
              <h3 className="font-titre text-[#21897E] text-4xl">Statistiques</h3>
              <p className="font-soustitre text-2xl">nbr de cartes : 14 / 20834</p>
              <p className="font-soustitre text-2xl">( 0.945% )</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                <div className="bg-[#21897E] rounded-2xl p-2">
                    <div className="border-2 border-white rounded-xl h-20">

                    </div>
                </div>

                <div className="bg-[#21897E] rounded-2xl p-2">
                    <div className="border-2 border-white rounded-xl h-20">

                    </div>
                </div>

                <div className="bg-[#21897E] rounded-2xl p-2">
                    <div className="border-2 border-white rounded-xl h-20">

                    </div>
                </div>

            </div>

            </div>

                <div className="bg-[#D9D9C8] rounded-[1.5rem] p-5">

                    <div className="flex flex-wrap gap-3 items-center mb-6">

                        <h3 className="font-titre text-[#21897E] text-4xl mr-4">Trier</h3>
                        <button className="bg-[#21897E] text-white px-5 py-2 rounded-xl font-titre">Rareté</button>
                        <button className="bg-[#21897E] text-white px-5 py-2 rounded-xl font-titre">Nom</button>
                        <button className="bg-[#21897E] text-white px-5 py-2 rounded-xl font-titre">ID</button>
                        <button className="bg-[#21897E] text-white px-5 py-2 rounded-xl font-titre">Catégorie</button>
                        <button className="bg-[#21897E] text-white px-5 py-2 rounded-xl font-titre">Obtention</button>
            </div>

            {/* RECHERCHE */}
            <div className="flex flex-col gap-5">

              <input
                type="text"
                placeholder="Recherche par nom Prénom"
                className="w-full border-4 border-[#21897E] rounded-2xl px-5 py-3 bg-transparent outline-none text-xl"
              />

              <input
                type="text"
                placeholder="Recherche par nom catégorie"
                className="w-full border-4 border-[#21897E] rounded-2xl px-5 py-3 bg-transparent outline-none text-xl"
              />

            </div>

          </div>

        </div>

        {/* SWITCH */}
        <div className="flex items-center gap-4 mt-6">

          <button className="w-20 h-10 bg-[#21897E] rounded-full relative">
            <div className="absolute left-1 top-1 w-8 h-8 bg-[#D9D9C8] rounded-full" />
          </button>

          <p className="font-soustitre text-2xl">
            affichage en grand
          </p>

        </div>

      </section>
    </>
  );
};

export default VosCartes;