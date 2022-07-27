export type Pokemon = {
  id: number;
  name: string;
  gender: string | null;
  height: {
    m: number;
    foot: string;
  };
  weight: {
    kg: number;
    lbs: number;
  };
  img: string;
  types: string[];
  abilities: string[];
  stats: {
    stat_name: string;
    base_stat: number;
  }[];
  moves: string[];
};
