import Header from "../components/Header";

export default function HubWikilineGacha() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center">
        <h2 className="font-soustitre text-4xl">hub de jeu</h2>
        <h2 className="text-[#21897E] font-titre text-8xl">WikiLine-Gacha</h2>
      </div>

      <div className="flex flex-row items-center justify-center gap-8 px-12">

        {/* Menu gauche */}
        <div className="bg-[#21897E] rounded-[2rem] p-8 flex flex-col gap-6 w-[600px]">
          {[
            "Votre collection",
            "Packs de cartes",
            "Jouez vos cartes",
          ].map((item) => (
            <div key={item} className="flex items-center gap-4">
              <span className="text-[#D9D9C8] text-4xl">✦</span>
              <button className="bg-[#D9D9C8] rounded-2xl w-full py-4 text-[#21897E] text-2xl font-extrabold italic hover:bg-white transition">
                {item}
              </button>
            </div>
          ))}
        </div>

        {/* Cartes droite */}
        <div className="relative w-[380px] h-[420px]">
          {[
            {
              img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Marilyn_Monroe_-_publicity.JPG/440px-Marilyn_Monroe_-_publicity.JPG",
              rotate: "-rotate-12",
              top: "top-0",
              left: "left-0",
              zIndex: "z-10",
            },
            {
              img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Justin_Bieber_in_2015.jpg/440px-Justin_Bieber_in_2015.jpg",
              rotate: "rotate-6",
              top: "top-4",
              left: "left-24",
              zIndex: "z-20",
            },
            {
              img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Napoleon_on_the_Saint-Bernard_Pass%2C_David.jpg/440px-Napoleon_on_the_Saint-Bernard_Pass%2C_David.jpg",
              rotate: "-rotate-3",
              top: "top-32",
              left: "left-8",
              zIndex: "z-30",
              name: "Napoléon Bonaparte",
              desc: "Empereur de génie et stratège légendaire, dont le film le plus mémorable est son triomphe historique à Austerlitz.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className={`absolute ${card.top} ${card.left} ${card.rotate} ${card.zIndex} bg-[#D9D9C8] border-4 border-[#21897E] rounded-[1.5rem] w-52 overflow-hidden`}
            >
              <img
                src={card.img}
                alt=""
                className="w-full h-40 object-cover object-top"
              />
              {card.name && (
                <div className="p-2 text-center">
                  <p className="font-extrabold text-sm text-[#21897E]">{card.name}</p>
                  <p className="text-xs text-gray-700 mt-1">{card.desc}</p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </>
  );
}