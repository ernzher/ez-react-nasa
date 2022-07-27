export type PokemonDetails = {
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
  prevAndNext: {
    prev_id: number;
    next_id: number;
  };
  species_name: string;
  egg_groups: string[];
  habitat: string;
  growth_rate: string;
  description: string;
  battle_condition: {
    double_damage_from: string[];
    double_damage_to: string[];
  };
  evolution_chain: {
    order: number;
    id: number;
    name: string;
    img: string;
    gender: string;
  }[];
};
