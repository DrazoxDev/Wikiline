import Header from "../components/Header";

const Inscription = () => {
    return (
        <>
            <Header />
            <main className="container mx-auto p-4">
                <div className="flex flex-col items-center">
                    <h2 className="font-soustitre text-4xl">Inscription</h2>
                    <h2 className="text-[#21897E] font-titre text-8xl">WikiLine</h2>
                </div>

                <div className="container mx-auto p-4">
                    <div className="bg-[#21897E] rounded-2xl p-8 flex gap-6">

                        <div className="flex flex-col gap-3 flex-1">

                            <div className="flex flex-col items-center gap-1">
                                <label className="text-[#E0E2DB] font-bold">Choisisez votre Pseudo</label>
                                <input type="text" className="bg-[#E0E2DB] rounded-full px-4 py-2 outline-none w-full" />
                            </div>

                            <div className="flex flex-col items-center gap-1">
                                <label className="text-[#E0E2DB] font-bold">Choisisez votre Mail</label>
                                <input type="email" className="bg-[#E0E2DB] rounded-full px-4 py-2 outline-none w-full" />
                            </div>

                            <div className="flex flex-col items-center gap-1">
                                <label className="text-[#E0E2DB] font-bold">Choisisez votre Mot de passe</label>
                                <input type="password" className="bg-[#E0E2DB] rounded-full px-4 py-2 outline-none w-full" />
                            </div>

                            <div className="flex flex-col items-center gap-1">
                                <label className="text-[#E0E2DB] font-bold">Validez votre Mot de passe</label>
                                <input type="password" className="bg-[#E0E2DB] rounded-full px-4 py-2 outline-none w-full" />
                            </div>

                        </div>

                        <div className="flex flex-col gap-4 flex-1 justify-between">

                            <div className="bg-[#21897E] rounded-2xl p-3">
                                <div className="bg-[#E0E2DB] rounded-xl p-6 w-full">
                                    <div className="bg-[21897E] rounded-2xl p-6 flex-1 flex items-center justify-center border-4 border-[#21897E]">
                                      <p className="text-[#21897E] font-bold text-lg">S'inscrire vous permet de sauvgardez votre progression WikiLine et de pouvoir se connecter sur nimporte quel appareil pour pouvoir continuer à jouer sur n'importe quelle appareil.</p>
                                    </div>                                
                                </div>
                            </div>

                            <button className="w-full border-2 border-[#E0E2DB] text-[#E0E2DB] font-bold text-xl rounded-full py-3 hover:bg-[#E0E2DB] hover:text-[#21897E] transition-colors">Valider</button>
                        
                        </div>

                    </div>

                </div>

            </main>
        </>
    );
};

export default Inscription;