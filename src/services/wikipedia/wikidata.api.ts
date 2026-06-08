import type { WikidataClaimsResponse } from "./wikipedia.types";

const WIKIDATA_HUMAN = "Q5";

export async function isHuman(wikidataId: string): Promise<boolean> {
  const params = new URLSearchParams({
    action: "wbgetentities",
    ids: wikidataId,
    props: "claims",
    format: "json",
    origin: "*",
  });

  const res = await fetch(`https://www.wikidata.org/w/api.php?${params}`);
  if (!res.ok) {
    return false;
  }

  const data: WikidataClaimsResponse = await res.json();
  const entity = data.entities[wikidataId];

  if (!entity || entity.missing) {
    return false;
  }

  const instanceOf = entity.claims?.P31 ?? [];
  return instanceOf.some(
    (claim) => claim.mainsnak.datavalue?.value.id === WIKIDATA_HUMAN,
  );
}
