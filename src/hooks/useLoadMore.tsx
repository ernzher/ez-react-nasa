import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

export interface State {
    // offset: string,
    loading: boolean,
    error: boolean,
    pokemons: {
        id: number,
        name: string,
        height: number, 
        weight: number, 
        img: string,
        types: string[]
    }[],
    hasMore: boolean
}

const useLoadMore = (offset: number) => {

    const [loading, setLoading] = useState<State["loading"]>(true)
    const [error, setError] = useState<State["error"]>(false)
    const [pokemons, setPokemons] = useState<State["pokemons"]>([])
    const [hasMore, setHasMore] = useState<State["hasMore"]>(true)


    const fetchPokemons = async () => {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);  
        return data
    }

    const fetchPokemonData = async (url: string) => {
        const { data } = await axios.get(url);   
        return data
    }

    useEffect(() => {
        setLoading(true);
        setError(false);        
        const getPokemonData = async() => {
            let newBatch: State["pokemons"] = []

            const data = await fetchPokemons();            
            data.results.forEach(async (result: any) => {
                const pokemonData = await fetchPokemonData(result.url);

                let types: string[] = []
                pokemonData.types.forEach((type: any) => {
                    types.push(type.type.name)
                })

                newBatch.push({
                    id: pokemonData.id,
                    name: pokemonData.name,
                    height: pokemonData.height,
                    weight: pokemonData.weight,
                    img: pokemonData.sprites.other.dream_world.front_default,
                    types: types
                })
            })
            
            setTimeout(()=>{
                newBatch.sort(function(a, b) { 
                    return a.id - b.id;
                });
                setPokemons([...pokemons,...newBatch])

                if (pokemons.length === data.count) setHasMore(false)
                setLoading(false)

            }, 1000)
        }        
        getPokemonData()                                       
    },[offset])

     
    return {loading, error, pokemons, hasMore}
}

export default useLoadMore