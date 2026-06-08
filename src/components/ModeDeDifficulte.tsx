type Props = {
  titre: string;
  nbretoiles: number;
  specificitee: string[];
}

const ModeDeDifficulte = ({ titre, nbretoiles, specificitee }: Props) => {
  return (
    <div className="bg-[#21897E] rounded-[2rem] p-3 w-96 min-h-[500px] cursor-pointer hover:scale-105 transition-transform">
      <div className="bg-[#D9D9C8] rounded-[1.5rem] p-5 h-full min-h-[480px]">

        {/* Badge titre */}
        <div className="border-4 border-[#21897E] rounded-2xl px-4 py-2 text-center mb-5">
          <p className="text-4xl font-extrabold italic text-[#21897E]">{titre}</p>
          <div className="flex gap-1 justify-center mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-3xl ${i < nbretoiles ? "text-[#21897E]" : "text-[#21897E]/30"}`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Détails */}
        <ul className="space-y-4 px-1">
          {specificitee.map((detail) => (
            <li key={detail} className="text-[#21897E] font-semibold text-xl">
              -{detail}
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default ModeDeDifficulte;