import Header from "../components/Header";

const VosCartes = () => {
  return (
    <>
      <Header></Header>

            <section className="container mx-auto p-4">

                <div className="flex flex-col items-center">
                    <h2 className="font-soustitre text-4xl">Votre collection de cartes</h2>
                    <h2 className="text-[#21897E] font-titre text-8xl">WikiLine</h2>
                </div>

                <div className="bg-vert p-4">
                    <div className="bg-blanc m-4">
                        <div>
                            <h3>Statistique</h3>
                            <p>Nombres de cartes que vous possédez 14/20834</p>
                        </div>
                        <div>
                            <div className="bg-vert">
                                <p>Test</p>
                            </div>
                            <div className="bg-vert">
                                <p>Test</p>        
                            </div>
                            <div className="bg-vert">
                                <p>Test</p>  
                            </div>
                        </div>

                    </div>
                    <div>

                    </div>
                </div>


            </section>

          </>
  )
}

export default VosCartes;
