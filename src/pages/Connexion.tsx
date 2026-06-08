import Header from "../components/Header";

const Connexion = () => {
    return (
        <>
            <Header />
            <main className="container mx-auto p-4">
                <section className="flex flex-col items-center">
                    <h2 className="font-soustitre text-4xl">Connexion</h2>
                    <h2 className="text-[#21897E] font-titre text-8xl">WikiLine</h2>
                </section>

                <section className="container mx-auto p-4">
                    <div className="bg-[#21897E] rounded-2xl p-8 flex flex-col gap-6">
                        <h3 className="text-[#E0E2DB] font-bold text-2xl">Bon retour parmis nous !!</h3>

                        <div className="flex flex-col md:flex-row gap-6">

                            <div className="flex flex-col gap-4 flex-1">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[#E0E2DB] font-bold">Rentrez votre mail</label>
                                    <input type="email" className="bg-[#E0E2DB] rounded-full px-4 py-2 outline-none"/>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[#E0E2DB] font-bold">Rentrez votre mot de passe</label>
                                    <input type="password" className="bg-[#E0E2DB] rounded-full px-4 py-2 outline-none"/>
                                </div>
                            </div>

                            <div className="bg-[#E0E2DB] rounded-2xl p-6 flex-1 flex items-center justify-center border-4 border-[#E0E2DB]">
                                <div className="bg-[21897E] rounded-2xl p-6 flex-1 flex items-center justify-center border-4 border-[#21897E]">
                                    <p className="text-[#21897E] font-bold text-lg text-center">C'est le moment de montrer qui est le boss de wikipedia, montrez nous que vous êtes le GOAT</p>
                                </div>
                            </div>
                            
                        </div>

                        {/* Bouton valider */}
                        <button className="w-full border-2 border-[#E0E2DB] text-[#E0E2DB] font-bold text-xl rounded-full py-3 hover:bg-[#E0E2DB] hover:text-[#21897E] transition-colors">
                            Valider
                        </button>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Connexion;