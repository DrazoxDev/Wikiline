import { useEffect } from "react";
import Header from "../components/Header";
import { PersonalityCardFromData } from "../components/cards/PersonalityCard";
import {
  useCardActions,
  useCardError,
  useCards,
  useCardStatus,
} from "../stores/cards/card.selectors";

const PersonTest = () => {
  const cards = useCards();
  const status = useCardStatus();
  const error = useCardError();
  const { loadSampleCards } = useCardActions();

  useEffect(() => {
    loadSampleCards();
  }, [loadSampleCards]);

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <div className="flex flex-col items-center mb-8">
          <h2 className="font-soustitre text-4xl">Test API Wikipédia</h2>
          <p className="font-soustitre text-lg text-center max-w-2xl mt-2">Chargement de 3 personnalités depuis Wikipédia, avec calcul de popularité et rareté.</p>
        </div>

        {status === "loading" && (
          <p className="text-center font-soustitre text-lg">Chargement des personnalités depuis Wikipédia...</p>
        )}

        {status === "error" && (
          <p className="text-center text-red-600 font-soustitre">Erreur : {error}</p>
        )}

        {status === "success" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {cards.map((card) => (
              <PersonalityCardFromData key={card.id} card={card} />
            ))}
          </div>
        )}

        {status === "success" && cards.length === 0 && (
          <p className="text-center font-soustitre">Aucune personnalité n'a pu être chargée.</p>
        )}
      </main>
    </>
  );
};

export default PersonTest;
