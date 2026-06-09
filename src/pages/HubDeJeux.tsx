import Header from "../components/Header";

const HubDeJeux = () => {

    return (
        <>
            <Header />
            <section className="container mx-auto p-4">

                <div className="flex flex-col items-center mb-8">
                    <h2 className="font-soustitre text-4xl">hub de jeu</h2>
                    <h2 className="couleur-vert font-titre text-8xl">WikiLine-Gacha</h2>
                </div>

                <div className="flex gap-8 items-stretch">

                    <div className="flex-[3] bg-vert rounded-[2.5rem] p-6 flex flex-col justify-around">

                        <div className="flex items-center gap-4">
                            <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                                <polygon points="25,2 31,18 48,18 34,29 39,46 25,36 11,46 16,29 2,18 19,18" fill="#D9D9C8" />
                            </svg>
                            <div className="flex-1 bg-vert border-[3px] border-white rounded-[1rem] p-[3px]">
                                <button className="w-full bg-blanc hover:bg-[#21897E] rounded-[1rem] py-5 px-8 transition-colors duration-200 group">
                                    <span className="couleur-vert group-hover:text-[#D9D9C8] font-titre text-3xl transition-colors duration-200">Votre collection</span>
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                                <polygon points="25,2 31,18 48,18 34,29 39,46 25,36 11,46 16,29 2,18 19,18" fill="#D9D9C8" />
                            </svg>
                            <div className="flex-1 bg-vert border-[3px] border-white rounded-[1rem] p-[3px]">
                                <button className="w-full bg-blanc hover:bg-[#21897E] rounded-[1rem] py-5 px-8 transition-colors duration-200 group">
                                    <span className="couleur-vert group-hover:text-[#D9D9C8] font-titre text-3xl transition-colors duration-200">Packs de cartes</span>
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                                <polygon points="25,2 31,18 48,18 34,29 39,46 25,36 11,46 16,29 2,18 19,18" fill="#D9D9C8" />
                            </svg>
                            <div className="flex-1 bg-vert border-[3px] border-white rounded-[1rem] p-[3px]">
                                <button className="w-full bg-blanc hover:bg-[#21897E] rounded-[1rem] py-5 px-8 transition-colors duration-200 group">
                                    <span className="couleur-vert group-hover:text-[#D9D9C8] font-titre text-3xl transition-colors duration-200">Jouez vos cartes</span>
                                </button>
                            </div>
                        </div>

                    </div>

                    <div className="flex-[2] relative flex items-center justify-center min-h-[300px]">

                        {/* Carte gauche - Mac DeMarco */}
<div className="absolute top-0 left-0 w-52 rotate-[-12deg] z-10">
    <div className="bg-[#21897E] rounded-[2rem] p-[3px]">
        <div className="bg-white rounded-[1.8rem] overflow-hidden">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/26/Mac_DeMarco_2014.jpg"
                alt="Mac DeMarco"
                className="w-full h-40 object-cover"
            />
            <div className="p-3 text-center">
                <p className="font-titre text-[#21897E] text-base leading-tight">Mac DeMarco</p>
                <p className="font-soustitre text-xs mt-1 text-gray-700">
                    Auteur-compositeur canadien reconnu pour son style indie rock décontracté et ses mélodies uniques.
                </p>
            </div>
        </div>
    </div>
</div>

{/* Carte droite - Pierre Niney */}
<div className="absolute top-0 right-0 w-52 rotate-[10deg] z-10">
    <div className="bg-[#21897E] rounded-[2rem] p-[3px]">
        <div className="bg-white rounded-[1.8rem] overflow-hidden">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/35/Pierre_Niney_Cannes_2016.jpg"
                alt="Pierre Niney"
                className="w-full h-40 object-cover"
            />
            <div className="p-3 text-center">
                <p className="font-titre text-[#21897E] text-base leading-tight">Pierre Niney</p>
                <p className="font-soustitre text-xs mt-1 text-gray-700">
                    Acteur français récompensé pour ses performances remarquables au cinéma et au théâtre.
                </p>
            </div>
        </div>
    </div>
</div>

{/* Carte principale - Napoléon */}
<div className="relative z-20 w-52 mt-16">
    <div className="bg-[#21897E] rounded-[2rem] p-[3px]">
        <div className="bg-white rounded-[1.8rem] overflow-hidden">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/David_-_Napoleon_crossing_the_Alps_-_Malmaison2.jpg/440px-David_-_Napoleon_crossing_the_Alps_-_Malmaison2.jpg"
                alt="Napoléon Bonaparte"
                className="w-full h-40 object-cover"
            />
            <div className="p-3 text-center">
                <p className="font-titre text-[#21897E] text-base leading-tight">Napoléon Bonaparte</p>
                <p className="font-soustitre text-xs mt-1 text-gray-700">
                    Empereur de génie et stratège légendaire, dont le film le plus mémorable est son triomphe historique à Austerlitz.
                </p>
            </div>
        </div>
    </div>
</div>

{/* Carte de fond - Michael Jackson */}
<div className="absolute top-[-30px] left-[50%] translate-x-[-50%] z-0 w-52">
    <div className="bg-[#21897E] rounded-[2rem] p-[3px]">
        <div className="bg-white rounded-[1.8rem] overflow-hidden">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Michael_Jackson_in_1988.jpg"
                alt="Michael Jackson"
                className="w-full h-40 object-cover"
            />
            <div className="p-3 text-center">
                <p className="font-titre text-[#21897E] text-base leading-tight">Michael Jackson</p>
                <p className="font-soustitre text-xs mt-1 text-gray-700">
                    Roi de la pop, artiste emblématique ayant marqué l'histoire de la musique mondiale.
                </p>
            </div>
        </div>
    </div>
</div>

                    </div>
                </div>

            </section>
        </>
    );
};

export default HubDeJeux;