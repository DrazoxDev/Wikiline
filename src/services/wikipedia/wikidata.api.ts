import type { WikidataClaimsResponse } from "./wikipedia.types";

const WIKIDATA_HUMAN = "Q5";

export async function isHuman(wikidataId: string): Promise<boolean> {
  return (await areHumans([wikidataId]))[wikidataId] ?? false;
}

export async function areHumans(
  wikidataIds: string[]
): Promise<Record<string, boolean>> {
  if (wikidataIds.length === 0) return {};

  const params = new URLSearchParams({
    action: "wbgetentities",
    ids: wikidataIds.join("|"),
    props: "claims",
    format: "json",
    origin: "*",
  });

  const res = await fetch(`https://www.wikidata.org/w/api.php?${params}`);
  if (!res.ok) return Object.fromEntries(wikidataIds.map((id) => [id, false]));

  const data: WikidataClaimsResponse = await res.json();

  return Object.fromEntries(
    wikidataIds.map((id) => {
      const entity = data.entities[id];
      if (!entity || entity.missing) return [id, false];
      const instanceOf = entity.claims?.P31 ?? [];
      return [
        id,
        instanceOf.some(
          (claim) => claim.mainsnak.datavalue?.value.id === WIKIDATA_HUMAN
        ),
      ];
    })
  );
}

/** Récupère l'année de naissance depuis Wikidata (propriété P569) pour plusieurs IDs en une seule requête */
export async function fetchBirthYears(
  wikidataIds: string[]
): Promise<Record<string, number | undefined>> {
  if (wikidataIds.length === 0) return {};

  const params = new URLSearchParams({
    action: "wbgetentities",
    ids: wikidataIds.join("|"),
    props: "claims",
    format: "json",
    origin: "*",
  });

  const res = await fetch(`https://www.wikidata.org/w/api.php?${params}`);
  if (!res.ok) return Object.fromEntries(wikidataIds.map((id) => [id, undefined]));

  const data = await res.json();

  return Object.fromEntries(
    wikidataIds.map((id) => {
      const entity = data.entities?.[id];
      if (!entity || entity.missing) return [id, undefined];

      const p569 = entity.claims?.P569;
      if (!p569 || p569.length === 0) return [id, undefined];

      const raw = p569[0]?.mainsnak?.datavalue?.value?.time as string | undefined;
      if (!raw) return [id, undefined];

      // Format Wikidata : "+1961-08-04T00:00:00Z"
      const match = raw.match(/^[+-]?(\d{1,4})-/);
      const year = match ? parseInt(match[1], 10) : undefined;
      return [id, year];
    })
  );
}