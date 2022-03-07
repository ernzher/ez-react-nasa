import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

export interface State {
    loading: boolean,
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

const usePokemons = (offset?: number, pageNumber?: number) => {

    const [loading, setLoading] = useState<State["loading"]>(false)
    // const [error, setError] = useState<State["error"]>(false)
    const [pokemons, setPokemons] = useState<State["pokemons"]>([])
    const [hasMore, setHasMore] = useState<State["hasMore"]>(true)
    const [query, setQuery] = useState<State["query"]>("")

    const fetchPokemons = async () => {
        try {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);  
            return data
        } catch (error) {
            return null
        }
    }

    const fetchPokemonsFromQuery = async (query: string) => {
        try {
            const { data } = await axios.get(`/pokemons/search?name=${query}&page=${pageNumber}&pageSize=20`);  
            return data
        } catch (error) {
            return null
        }
    }

    const getTypesFromPokemonData = (pokemonData: any) => {
        let types: string[] = []
        pokemonData.types.forEach((type: any) => {
            types.push(type.type.name)
        })
        return types
    }

    const getPokemonData = async(idOrName: any) => {
        try {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);   
            return {
                id: data.id,
                name: data.name,
                height: data.height,
                weight: data.weight,
                img: data.sprites.other.dream_world.front_default,
                types: getTypesFromPokemonData(data)
            }
        } catch (error) {            
            return null
        }
    }

    const getPokemonList = async (query ?: string) => {
        let list: State["pokemons"] = []
        if (!query) {
            const data = await fetchPokemons();   
            data &&     
            data.results.forEach(async (result: any) => {
                const pokemonData = await getPokemonData(result.name);     
                pokemonData && list.push(pokemonData)
            })
        } else {
            const dataFromQuery = await fetchPokemonsFromQuery(query);     
            dataFromQuery &&
            dataFromQuery.pokemons.forEach(async (pokemon: any) => {
                const pokemonDataFromQuery = await getPokemonData(pokemon.id);
                pokemonDataFromQuery && list.push(pokemonDataFromQuery)
            })
        }
        return list
    }
    
    const searchPokemon = (query: string) => {
        setQuery(query);
        setPokemons([])
        setHasMore(true)
        setLoading(true);

        const loadPokemonFromQuery = async() => {
            
            //if integer is passed as the query, search as pokemon id
            if (Number.isInteger(parseInt(query))) {
                const pokemonData = await getPokemonData(parseInt(query)) 
                setTimeout(() => {
                    pokemonData && setPokemons([pokemonData])
                    setHasMore(false)
                    setLoading(false)
                }, 1000)      
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
     
    useEffect(() => {
        setHasMore(true)
        setLoading(true);
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

    return {loading, pokemons, hasMore, query, searchPokemon, getPokemonData}
}

export default usePokemons