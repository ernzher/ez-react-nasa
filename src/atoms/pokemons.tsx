import { atom } from "recoil";
import { Pokemon } from "../types/Pokemon";

export const pokemonListState = atom<Pokemon[]>({
  key: "PokemonList",
  default: [],
});

export const searchQueryState = atom<string>({
  key: "SearchQuery",
  default: "",
});

export const pageNumberState = atom<number>({
  key: "PageNumber",
  default: 1,
});

export const offsetState = atom<number>({
  key: "OffSet",
  default: 0,
});

export const loadingState = atom<boolean>({
  key: "Loading",
  default: false,
});

export const hasMoreState = atom<boolean>({
  key: "HasMore",
  default: true,
});

export const scrollPositionState = atom<number>({
  key: "ScrollPosition",
  default: 0
})