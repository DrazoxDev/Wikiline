import Header from "../components/Header";
import imageBooster from "../../public/images/BoosterDeBase.png";

const Booster = () => {
  return (
    <>
      <Header />

      <section className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">

          {/* Image booster */}
          <div className="w-full lg:w-[40%] bg-[#21897E] rounded-[2rem] flex items-center justify-center p-8 min-h-[280px]">
            <img
              src={imageBooster}
              alt="Booster"
              className="w-48 sm:w-64 lg:w-[75%] max-w-xs h-auto object-contain"
            />
          </div>

          {/* Infos */}
          <div className="w-full lg:w-[60%] flex flex-col gap-4">

            {/* Titre */}
            <div className="text-center">
              <h2 className="font-soustitre text-3xl sm:text-4xl">Ouverture de</h2>
              <h1 className="font-titre text-[#21897E] text-5xl sm:text-7xl lg:text-8xl">Booster</h1>
            </div>

            {/* Bloc stats */}
            <div className="flex-1 border-[5px] border-[#21897E] rounded-[2rem] p-6 flex flex-col gap-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div className="bg-[#21897E]/10 rounded-2xl p-4 text-center">
                  <p className="font-bold text-[#21897E] text-base sm:text-lg">Nombre de boosters</p>
                  <p className="font-bold text-[#21897E] text-2xl sm:text-3xl mt-1">4 / 10</p>
                </div>

                <div className="bg-[#21897E]/10 rounded-2xl p-4 text-center">
                  <p className="font-bold text-[#21897E] text-base sm:text-lg">Nouveau booster dans</p>
                  <p className="font-bold text-[#21897E] text-2xl sm:text-3xl mt-1">4min 32s</p>
                </div>

                <div className="bg-[#21897E]/10 rounded-2xl p-4 text-center">
                  <p className="font-bold text-[#21897E] text-base sm:text-lg">Prochain booster mythique</p>
                  <p className="font-bold text-[#21897E] text-2xl sm:text-3xl mt-1">44min 32s</p>
                </div>

                <div className="bg-[#21897E]/10 rounded-2xl p-4 text-center">
                  <p className="font-bold text-[#21897E] text-base sm:text-lg">Prochain booster gold</p>
                  <p className="font-bold text-[#21897E] text-2xl sm:text-3xl mt-1">6h 44min 32s</p>
                </div>

              </div>

              {/* Bouton */}
              <div className="mt-auto bg-[#21897E] rounded-[1.5rem] py-4 text-center">
                <p className="text-white font-bold text-xl sm:text-2xl lg:text-3xl">
                  Boosters ouverts : 12
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Booster;
