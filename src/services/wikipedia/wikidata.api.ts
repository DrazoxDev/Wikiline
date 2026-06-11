import type { WikidataClaimsResponse } from "./wikipedia.types";

const WIKIDATA_HUMAN = "Q5";

export async function isHuman(wikidataId: string): Promise<boolean> {
  return (await areHumans([wikidataId]))[wikidataId] ?? false;
}

export async function areHumans(wikidataIds: string[]): Promise<Record<string, boolean>> {
  if (wikidataIds.length === 0) return {};

  const params = new URLSearchParams({
    action: "wbgetentities",
    ids: wikidataIds.join("|"), // Tous les IDs en une seule requête
    props: "claims",
    format: "json",
    origin: "*",
  });

  const res = await fetch(`https://www.wikidata.org/w/api.php?${params}`);
  if (!res.ok) return Object.fromEntries(wikidataIds.map(id => [id, false]));

  const data: WikidataClaimsResponse = await res.json();

  return Object.fromEntries(
    wikidataIds.map(id => {
      const entity = data.entities[id];
      if (!entity || entity.missing) return [id, false];
      const instanceOf = entity.claims?.P31 ?? [];
      return [id, instanceOf.some(claim => claim.mainsnak.datavalue?.value.id === WIKIDATA_HUMAN)];
    })
  );
}