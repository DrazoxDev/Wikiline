import Header from "../components/Header";
import imageBooster from "../../public/images/BoosterDeBase.png";

const Booster = () => {
  return (
    <>
      <Header />

      <section className="w-full px-[3%] py-[2%]">
        <div className="w-full flex flex-col lg:flex-row justify-between items-stretch gap-[3%]">

          {/* Partie gauche */}
          <div className="w-full lg:w-[40%] bg-[#21897E] rounded-[2rem] flex items-center justify-center p-[3%]">

            <img
              src={imageBooster}
              alt="Booster"
              className="w-[75%] h-auto object-contain"
            />

          </div>

          {/* Partie droite */}
          <div className="w-full lg:w-[57%] flex flex-col">

            {/* Titre */}
            <div className="text-center mb-[3%]">
              <h2 className="font-soustitre text-3xl md:text-4xl lg:text-5xl">
                Ouverture de
              </h2>

              <h1 className="font-titre text-[#21897E] text-5xl md:text-7xl lg:text-8xl">
                Booster
              </h1>
            </div>

            {/* Bloc infos */}
            <div className="flex-1 border-[5px] border-[#21897E] rounded-[2rem] p-[4%] flex flex-col">

              <div className="text-center mb-[6%]">
                <h3 className="font-bold text-[#21897E] text-xl lg:text-2xl">
                  Nombre de booster :
                </h3>

                <p className="font-bold text-[#21897E] text-xl lg:text-2xl">
                  4 / 10
                </p>
              </div>

              <div className="text-center mb-[6%]">
                <h3 className="font-bold text-[#21897E] text-xl lg:text-2xl">
                  Nouveau booster dans :
                </h3>

                <p className="font-bold text-[#21897E] text-xl lg:text-2xl">
                  4min 32s
                </p>
              </div>

              <div className="text-center mb-[6%]">
                <h3 className="font-bold text-[#21897E] text-xl lg:text-2xl">
                  Prochain booster mythique dans :
                </h3>

                <p className="font-bold text-[#21897E] text-xl lg:text-2xl">
                  44min 32s
                </p>
              </div>

              <div className="text-center mb-[6%]">
                <h3 className="font-bold text-[#21897E] text-xl lg:text-2xl">
                  Prochain booster gold dans :
                </h3>

                <p className="font-bold text-[#21897E] text-xl lg:text-2xl">
                  6h 44min 32s
                </p>
              </div>

              {/* Bouton du bas */}
              <div className="mt-auto">
                <div className="bg-[#21897E] rounded-[1.5rem] py-[3%] text-center">
                  <h3 className="text-white font-bold text-xl md:text-2xl lg:text-3xl">
                    Booster ouvert : 12
                  </h3>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>
    </>
  );
};

export default Booster;