import { fetchPersonCards } from "./person.service";
import type { PersonCard } from "../../types/person";

const SPARQL_ENDPOINT = "https://query.wikidata.org/sparql";

const buildQuery = (count: number): string => `
  SELECT ?articleName WHERE {
    ?person wdt:P31 wd:Q5.
    ?article schema:about ?person;
             schema:inLanguage "fr";
             schema:isPartOf <https://fr.wikipedia.org/>;
             schema:name ?articleName.
  }
  ORDER BY RAND()
  LIMIT ${count}
`;

export async function fetchRandomPersons(count: number): Promise<PersonCard[]> {
  const query = buildQuery(count);
  const url = `${SPARQL_ENDPOINT}?query=${encodeURIComponent(query)}&format=json&origin=*`;

  const res = await fetch(url, {
    headers: {
      "Accept": "application/sparql-results+json",
    },
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la requête Wikidata SPARQL");
  }

  const data = await res.json();

  const titres: string[] = data.results.bindings
    .map((binding: { articleName: { value: string } }) => binding.articleName.value)
    .filter((titre: string) => titre.length > 0);

  if (titres.length === 0) {
    throw new Error("Aucune personnalité trouvée");
  }

console.log("Titres SPARQL :", titres);
return fetchPersonCards(titres);}