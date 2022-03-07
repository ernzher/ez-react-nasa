import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

export interface State {
    // offset: string,
    loading: boolean,
    // error: boolean,
    pokemons: {
        id: number,
        name: string,
        height: number, 
        weight: number, 
        img: string,
        types: string[]
    }[],
    hasMore: boolean,
    query: string
}

const useLoadMoreOrSearch = (offset: number, pageNumber: number) => {

    const [loading, setLoading] = useState<State["loading"]>(false)
    // const [error, setError] = useState<State["error"]>(false)
    const [pokemons, setPokemons] = useState<State["pokemons"]>([])
    const [hasMore, setHasMore] = useState<State["hasMore"]>(true)
    const [query, setQuery] = useState<State["query"]>("")

    const fetchPokemons = async () => {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);  
        return data
    }

    const fetchPokemonsFromQuery = async (query: string) => {
        const { data } = await axios.get(`/pokemons/search?name=${query}&page=${pageNumber}&pageSize=20`);  
        return data
    }

    const fetchPokemonData = async (url: string) => {
        const { data } = await axios.get(url);   
        return data
    }

    const getTypesFromPokemon = (pokemonData: any) => {
        let types: string[] = []
        pokemonData.types.forEach((type: any) => {
            types.push(type.type.name)
        })
        return types
    }

    const getPokemonList = async (query ?: string) => {
        let list: State["pokemons"] = []
        if (!query) {
            const data = await fetchPokemons();            
            data.results.forEach(async (result: any) => {
                const pokemonData = await fetchPokemonData(result.url);                
                list.push({
                    id: pokemonData.id,
                    name: pokemonData.name,
                    height: pokemonData.height,
                    weight: pokemonData.weight,
                    img: pokemonData.sprites.other.dream_world.front_default,
                    types: getTypesFromPokemon(pokemonData)
                })
            })
        } else {
            const dataFromQuery = await fetchPokemonsFromQuery(query);            
            dataFromQuery.pokemons.forEach(async (pokemon: any) => {
                const pokemonDataFromQuery = await fetchPokemonData(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
                list.push({
                    id: pokemonDataFromQuery.id,
                    name: pokemonDataFromQuery.name,
                    height: pokemonDataFromQuery.height,
                    weight: pokemonDataFromQuery.weight,
                    img: pokemonDataFromQuery.sprites.other.dream_world.front_default,
                    types: getTypesFromPokemon(pokemonDataFromQuery)
                })
            })
        }
        return list
    }
    
    useEffect(() => {
        setHasMore(true)
        setLoading(true);
        // setError(false);        
        const loadMorePokemon = async() => {
            const pokemonList = await (query ? getPokemonList(query) : getPokemonList())
            setTimeout(()=>{
                pokemonList.sort((a, b) => a.id - b.id)
                setPokemons([...pokemons,...pokemonList])
                if (pokemonList.length < 20) setHasMore(false)
                setLoading(false)
            }, 1000)
        }      
        loadMorePokemon();
        
    },[offset, pageNumber])

    const searchPokemon = (query: string) => {
        setQuery(query);
        setPokemons([])
        setHasMore(true)
        setLoading(true);
        // setError(false);        

        const loadPokemonFromQuery = async() => {
            
            //if integer is passed as the query, search as pokemon id
            if (Number.isInteger(parseInt(query))) {
                const pokemonData = await fetchPokemonData(`https://pokeapi.co/api/v2/pokemon/${parseInt(query)}`)        
                setPokemons([
                    {
                        id: pokemonData.id,
                        name: pokemonData.name,
                        height: pokemonData.height,
                        weight: pokemonData.weight,
                        img: pokemonData.sprites.other.dream_world.front_default,
                        types: getTypesFromPokemon(pokemonData)
                    }
                ])
                setHasMore(false)
                setLoading(false)
                return;
            } 
            //else search as pokemon name
            const pokemonList = await getPokemonList(query)            
            setTimeout(()=>{
                pokemonList.sort((a, b) => a.id - b.id)
                setPokemons(pokemonList)
                if (pokemonList.length < 20) setHasMore(false)
                setLoading(false)
            }, 1000)
        }      
        loadPokemonFromQuery();
    }   
     
    return {loading, pokemons, hasMore, query, searchPokemon}
}

export default useLoadMoreOrSearch