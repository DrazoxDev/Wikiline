import Header from "../components/Header";
import imageBooster from "../assets/images/BoosterDeBase.png";

const Booster = () => {
  return (
    <>
      <Header />

      <section className="w-full px-4 py-8">
        <div className="max-w-[1500px] mx-auto flex flex-col lg:flex-row justify-center items-stretch gap-12">

          {/* Partie gauche */}
          <div className="w-full lg:w-[550px] h-auto lg:h-[850px] bg-[#21897E] rounded-[2rem] flex items-center justify-center p-8">

            <img
              src={imageBooster}
              alt="Booster"
              className="w-full max-w-[400px] object-contain"
            />

          </div>

          {/* Partie droite */}
          <div className="w-full lg:w-[750px] h-auto lg:h-[850px] flex flex-col">

            {/* Titre */}
            <div className="text-center mb-8">
              <h2 className="font-soustitre text-3xl md:text-4xl lg:text-5xl">
                Ouverture de
              </h2>

              <h1 className="font-titre text-[#21897E] text-6xl md:text-7xl lg:text-8xl">
                Booster
              </h1>
            </div>

            {/* Bloc infos */}
            <div className="flex-1 border-[5px] border-[#21897E] rounded-[2rem] p-6 lg:p-10 flex flex-col">

              <div className="text-center mb-10">
                <h3 className="font-bold text-[#21897E] text-2xl">
                  Nombre de booster :
                </h3>

                <p className="font-bold text-[#21897E] text-2xl">
                  4 / 10
                </p>
              </div>

              <div className="text-center mb-10">
                <h3 className="font-bold text-[#21897E] text-2xl">
                  Nouveau booster dans :
                </h3>

                <p className="font-bold text-[#21897E] text-2xl">
                  4min 32s
                </p>
              </div>

              <div className="text-center mb-10">
                <h3 className="font-bold text-[#21897E] text-2xl">
                  Prochain booster mythique dans :
                </h3>

                <p className="font-bold text-[#21897E] text-2xl">
                  44min 32s
                </p>
              </div>

              <div className="text-center mb-10">
                <h3 className="font-bold text-[#21897E] text-2xl">
                  Prochain booster gold dans :
                </h3>

                <p className="font-bold text-[#21897E] text-2xl">
                  6h 44min 32s
                </p>
              </div>

              {/* Bouton du bas */}
              <div className="mt-auto">
                <div className="bg-[#21897E] rounded-[1.5rem] py-6 text-center">
                  <h3 className="text-white font-bold text-3xl">
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