import { fetchPersonCards } from "./person.service";
import type { PersonCard } from "../../types/person";

export async function fetchRandomPersons(count: number): Promise<PersonCard[]> {
  // Utilise l'API Wikipedia pour récupérer des articles aléatoires
  const params = new URLSearchParams({
    action: "query",
    list: "random",
    rnnamespace: "0",
    rnlimit: String(count * 3), // On en demande plus car beaucoup ne seront pas des humains
    format: "json",
    origin: "*",
  });

  const res = await fetch(`https://fr.wikipedia.org/w/api.php?${params}`);
  if (!res.ok) throw new Error("Erreur Wikipedia random");

  const data = await res.json();
  const titres: string[] = data.query.random.map(
    (page: { title: string }) => page.title
  );

  console.log("Titres Wikipedia random :", titres);
  return fetchPersonCards(titres);
}