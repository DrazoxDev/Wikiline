import { useEffect, useState } from "react";
// Importe les hooks React

export default function WikiSearch() {
  // Crée le composant

  const [data, setData] = useState<any>(null);
  // Variable qui stocke les données Wikipedia

  useEffect(() => {
    // Se lance automatiquement au chargement

    fetch(
      "https://fr.wikipedia.org/api/rest_v1/page/summary/France"
    )
      // Appelle l'API Wikipedia

      .then((res) => res.json())
      // Transforme la réponse en JSON

      .then((json) => setData(json));
      // Sauvegarde les données reçues
  }, []);

  return (
    <div>
      <h1>Wikipedia API</h1>
      {/* Titre principal */}

      {data && (
        // Vérifie que data existe

        <>
          <h2>{data.title}</h2>
          {/* Affiche le titre */}

          <p>{data.extract}</p>
          {/* Affiche le résumé */}
        </>
      )}
    </div>
  );
}