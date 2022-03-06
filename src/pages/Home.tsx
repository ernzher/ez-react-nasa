import React from 'react'
import { 
    Box,
} from '@chakra-ui/react'
import Banner from '../components/home/Banner'
import PokeList from '../components/home/PokeList'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Url } from 'url'
import { stringify } from 'querystring'

export interface State {
    nextPage: string,
    pokemons: {
        id: number,
        name: string,
        height: number, 
        weight: number, 
        img: string,
        types: string[]
    }[]
}

const Home = () => {
    const [nextPage, setNextPage] = useState<State["nextPage"]>("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20")
    const [pokemons, setPokemons] = useState<State["pokemons"]>([])

    const fetchPokemons = async () => {
        const { data } = await axios.get(nextPage);  
        return data.results
    }

    const fetchPokemonData = async (url: string) => {
        const { data } = await axios.get(url);   
        return data
    }

    useEffect(() => {
        const getPokemons = async () => {
            const data = await fetchPokemons();
            return data        
        }
        const getPokemonData = async() => {
            let newBatch: State["pokemons"] = []
            const results = await getPokemons();
            // console.log(results);
            
            results.forEach(async (result: any) => {
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
                console.log(newBatch);
                newBatch.sort(function(a, b) { 
                    return a.id - b.id;
                });
                setPokemons([
                    ...pokemons,
                    ...newBatch
                ])
            }, 10)
           
        }        
        getPokemonData()                                       
    },[])

    return (
       <Box position="relative">
           <Banner />
           <PokeList pokemons={pokemons}/>
        </Box>
    )
}

export default Home