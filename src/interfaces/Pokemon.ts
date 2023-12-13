export interface Pokemon {
    id: number;
    name: string;
    imageUrl: string;
    height: number;
    weight: number;
    abilities: { name: string }[];
    experience: number
  }