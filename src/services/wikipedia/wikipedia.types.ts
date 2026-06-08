export type WikipediaSummary = {
  title: string;
  extract: string;
  thumbnail?: { source: string };
  type?: string;
};

export type PageViewsResponse = {
  items?: { views: number }[];
};

export type WikiQueryResponse = {
  query: {
    pages: Record<
      string,
      {
        title?: string;
        missing?: boolean;
        pageprops?: { wikibase_item?: string };
        revisions?: { size: number }[];
      }
    >;
  };
};

type WikidataClaimValue = {
  mainsnak: {
    datavalue?: { value: { id: string } };
  };
};

type WikidataTimeClaim = {
  mainsnak: {
    datavalue?: { value: { time: string } };
  };
};

export type WikidataClaimsResponse = {
  entities: Record<
    string,
    {
      missing?: string;
      sitelinks?: Record<string, unknown>;
      claims?: {
        P31?: WikidataClaimValue[];
        P569?: WikidataTimeClaim[];
      };
    }
  >;
};

export type WikiRandomQueryResponse = {
  query: {
    pages: Record<
      string,
      {
        title?: string;
        pageprops?: { wikibase_item?: string };
      }
    >;
  };
};

export type PersonRawData = {
  wikipediaTitle: string;
  name: string;
  description: string;
  imageUrl: string;
  wikidataId: string;
  pageViews: number;
  articleSize: number;
};

export type RandomHumanCandidate = {
  wikidataId: string;
  wikipediaTitle: string;
  birthYear: number;
  sitelinks: number;
};
