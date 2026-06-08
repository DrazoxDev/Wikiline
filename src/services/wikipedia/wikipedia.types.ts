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

export type WikidataClaimsResponse = {
  entities: Record<
    string,
    {
      missing?: string;
      claims?: {
        P31?: {
          mainsnak: {
            datavalue?: { value: { id: string } };
          };
        }[];
      };
    }
  >;
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
