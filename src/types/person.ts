export type Rarity = "commune" | "peu_commune" | "rare" | "legendaire";

export type PersonCard = {
  id: string;
  wikipediaTitle: string;
  name: string;
  description: string;
  imageUrl: string;
  popularityScore: number;
  rarity: Rarity;
  pageViews: number;
  articleSize: number;
};
