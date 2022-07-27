import { atom } from "recoil";
import { PokemonDetails } from "../types/PokemonDetails";

export const pokemonDetailsState = atom<PokemonDetails | null>({
  key: "PokemonDetails",
  default: null,
});

export const activeCategoryState = atom<string>({
  key: "ActiveCategory",
  default: "about",
});
