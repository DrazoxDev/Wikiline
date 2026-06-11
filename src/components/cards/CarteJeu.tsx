const CarteJeu = () => {
    return(
        <>
        {

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

        }
        </>
    )
}

export default CarteJeu;