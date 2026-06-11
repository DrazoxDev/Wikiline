import Header from "../components/Header";
import imageBooster from "../assets/images/BoosterDeBase.png"
const Booster = () => {
  return (
    <>
      <Header></Header>
        <section className="w-full flex justify-center mt-10">
            <div className="w-[1200px] flex justify-between items-start gap-16">

                <div className="bg-[#21897E] rounded-[2rem] p-10 w-[450px] h-[650px] flex items-center justify-center">
                    <img
                        src={imageBooster}
                        alt="Booster"
                        className="w-[300px]"
                    />
                </div>

                <div className="flex flex-col items-center w-[650px]">

                    <div className="text-center mb-8">
                        <h2 className="font-soustitre text-5xl">Ouverture de</h2>
                        <h1 className="font-titre text-[#21897E] text-8xl">Booster</h1>
                    </div>

                    <div className="w-full border-[6px] border-[#21897E] rounded-[2rem] p-8">

                        <div className="text-center mb-10">
                        <h3 className="font-bold text-[#21897E] text-3xl">Nombre de booster :</h3>

                        <p className="font-bold text-[#21897E] text-3xl">4 / 10</p>
                    </div>

                    <div className="text-center mb-10">
                        <h3 className="font-bold text-[#21897E] text-3xl">Nouveau booster dans :</h3>

                        <p className="font-bold text-[#21897E] text-3xl">4min 32s</p>
                    </div>

                    <div className="text-center mb-10">
                        <h3 className="font-bold text-[#21897E] text-3xl">Prochain booster mythique dans :</h3>

                        <p className="font-bold text-[#21897E] text-3xl">44min 32s</p>
                    </div>

                    <div className="text-center mb-10">
                        <h3 className="font-bold text-[#21897E] text-3xl">Prochain booster gold dans :</h3>

                        <p className="font-bold text-[#21897E] text-3xl">6h 44min 32s</p>
                    </div>

                    <div className="bg-[#21897E] rounded-[1.5rem] p-6 text-center">
                        <h3 className="text-white text-3xl font-bold">Booster ouvert : 12</h3>
                    </div>
                </div>
            </div>

        </div>

    </section>
    </>
  )
}

export default Booster;
