import { useState } from "react";
import type { PersonCard } from "../../types/person";

const CarteJeu = ({ carte }: { carte: PersonCard }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <>
            {

                <div
                    className="absolute top-0 right-0 w-52 h-72 cursor-pointer"
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    <div
                        className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateY(180deg)]" : ""
                            }`}
                    >
                        {/* Face avant */}
                        <div className="absolute inset-0 [backface-visibility:hidden]">
                            <div className="bg-[#21897E] rounded-[2rem] p-[3px] h-full">
                                <div className="bg-white rounded-[1.8rem] overflow-hidden h-full">
                                   {carte.imageUrl && <img
                                        src={carte.imageUrl}
                                        alt={carte.nom}
                                        className="w-full h-40 object-cover"
                                    />}

                                    <div className="p-3 text-center">
                                        <p className="font-titre text-[#21897E] text-base">
                                            {carte.nom}
                                        </p>

                                        <p className="font-soustitre text-xs mt-1 text-gray-700">
                                            {carte.description}                                </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Face arrière */}
                        <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                            <div className="bg-[#21897E] rounded-[2rem] p-[3px] h-full">
                                <div className="bg-white rounded-[1.8rem] overflow-hidden h-full flex flex-col">
                                    {carte.imageUrl && <img
                                        src={carte.imageUrl}
                                        alt={carte.nom}
                                        className="w-full h-40 object-cover"
                                    />}

                                    <div className="flex-1 flex flex-col justify-center items-center p-3">
                                        <p className="font-titre text-[#21897E] text-base">
                                        {carte.nom}
                                        </p>

                                        <p className="mt-2 text-sm text-gray-700">
                                            Né le :
                                        </p>

                                        <p className="font-bold text-lg">
                                            {carte.anneeNaissance}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            }
        </>
    )
}

export default CarteJeu; 