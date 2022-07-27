import React from "react";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  hasMoreState,
  loadingState,
  offsetState,
  pageNumberState,
  pokemonListState,
  searchQueryState,
} from "../atoms/pokemons";
import { Pokemon } from "../types/Pokemon";
import {
  fetchBattleConditionData,
  fetchPokemons,
  fetchPokemonsFromQuery,
  getPokemonData,
} from "../api/fetch";

const usePokemons = () => {
  const [hasMore, setHasMore] = useRecoilState(hasMoreState);
  const [pokemons, setPokemons] = useRecoilState<Pokemon[]>(pokemonListState);
  const [query, setQuery] = useRecoilState<string>(searchQueryState);
  const offset = useRecoilValue(offsetState);
  const pageNumber = useRecoilValue(pageNumberState);
  const setLoading = useSetRecoilState(loadingState);

  const getPokemonList = async (query?: string) => {
    let list: Pokemon[] = [];
    if (!query) {
      const data = await fetchPokemons(offset);
      for (const result of data.results) {
        const pokemonData = await getPokemonData(result.name);
        pokemonData && list.push(pokemonData);
      }
    } else {
      const dataFromQuery = await fetchPokemonsFromQuery(query, pageNumber);
      for (const pokemon of dataFromQuery.pokemons) {
        const pokemonDataFromQuery = await getPokemonData(pokemon.id);
        pokemonDataFromQuery && list.push(pokemonDataFromQuery);
      }
    }
    return list;
  };

  const searchPokemon = (query: string) => {
    fetchBattleConditionData(["grass", "poison"]);

    setQuery(query);
    setHasMore(true);
    setLoading(true);

    const loadPokemonFromQuery = async () => {
      //if integer is passed as the query, search as pokemon id
      if (Number.isInteger(parseInt(query))) {
        const pokemonData = await getPokemonData(parseInt(query));
        // setTimeout(() => {
        pokemonData && setPokemons([pokemonData]);
        setHasMore(false);
        setLoading(false);
        // }, 1000)
        return;
      }
      //else search as pokemon name
      const pokemonList = await getPokemonList(query);
      pokemonList.sort((a, b) => a.id - b.id);
      setPokemons(pokemonList);
      if (pokemonList.length < 20) setHasMore(false);
      setLoading(false);
    };
    loadPokemonFromQuery();
  };

  useEffect(() => {
    if (hasMore) {
      setLoading(true);
      const loadMorePokemon = async () => {
        const pokemonList = await (query
          ? getPokemonList(query)
          : getPokemonList());
        pokemonList.sort((a, b) => a.id - b.id);
        if (
          pokemons.length &&
          pokemonList[pokemonList.length - 1].id ===
            pokemons[pokemons.length - 1].id
        ) {
          setLoading(false);
          return;
        }
        setPokemons([...pokemons, ...pokemonList]);
        if (pokemonList.length < 20) setHasMore(false);
        setLoading(false);
      };
      loadMorePokemon();
    }
  }, [offset, pageNumber]);

  return {
    searchPokemon,
  };
};

export default usePokemons;
