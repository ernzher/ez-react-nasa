import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { FaMars, FaVenus } from 'react-icons/fa'


export interface Pokemon {
    id: number,
    name: string,
    gender: string | null,
    height: {
        m: number,
        foot: string
    }, 
    weight: {
        kg: number,
        lbs: number
    }, 
    img: string,
    types: string[],
    abilities: string[],
    stats: {
        stat_name: string,
        base_stat: number
    }[],
    moves: string[]
}

export interface PokemonDetails {
    id: number,
    name: string,
    gender: string | null,
    height: {
        m: number,
        foot: string
    }, 
    weight: {
        kg: number,
        lbs: number
    }, 
    img: string,
    types: string[],
    abilities: string[],
    stats: {
        stat_name: string,
        base_stat: number
    }[],
    moves: string[],
    prevAndNext: {
        prev_name: string,
        next_name: string
    }
    species_name: string,
    egg_groups: string[],
    habitat: string,
    growth_rate: string,
    description: string,
    battle_condition: BattleCondition
}

interface BattleCondition {
    double_damage_from: string[]
    double_damage_to: string[]
}

const usePokemons = (offset?: number, pageNumber?: number) => {

    const [loading, setLoading] = useState(false)
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [hasMore, setHasMore] = useState(true)
    const [query, setQuery] = useState("")

    const convertToPounds = (kg: number): number => Math.round(kg * 2.205)

    const convertToFoot = ( meters: number ) : string => {
        let foot = meters * 3.28084
        let footStr = Math.ceil(foot * 10).toString()       
        switch(footStr.length) {
            case 2: return `${footStr.charAt(0)} ' ${footStr.charAt(1)}''`; 
            case 3: return `${footStr.substring(0,2)} ' ${footStr.charAt(2)}''`; 
            default: return `${footStr.substring(0,3)} ' ${footStr.charAt(3)}''`; 
        }
    }

    const toCapitalCase = ( text: string ): string => text.charAt(0).toUpperCase() + (text.length > 1 && text.slice(1))

    const processString = (text: string): string => text.replace(/\f|\n|-/g,' ')

    const renderGender = (gender: string | null) => {
        switch(gender) {
            case 'f': 
                return <FaVenus/>;
            case 'm':
                return <FaMars/>;
            default:
                return;
        }
    }

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

    const fetchBattleConditionData = async (typeList: string[]) => {
        
        try {
            
            let result: any = {
                double_damage_from: [],
                double_damage_to: [],
            }
            for (const type of typeList){
                const { data } = await axios.get(`https://pokeapi.co/api/v2/type/${type}`); 
                result = {
                    double_damage_from: [...result.double_damage_from, ...data.damage_relations.double_damage_from.map((type: any) => type.name)],
                    double_damage_to: [...result.double_damage_to, ...data.damage_relations.double_damage_to.map((type: any) => type.name)],
                } 
            }            
            Object.keys(result).forEach((key) => {
                result[key] = [...new Set(result[key])];
            })
            return result

        } catch (error) {
            return null
        }
    }

    const getPrevAndNextPokemon = async (id: any) => {
        const prev = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id-1}`)
        const next = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id+1}`)
        return [prev.data.name, next.data.name]
    }

    const getPokemonData = async(idOrName: any) => {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);   
        return {
            id: data.id,
            name: toCapitalCase(data.name),
            gender: data.name.includes('-f') ? 'f' : data.name.includes('-m') ? 'm' : null,
            height: {
                m: data.height/10,
                foot: convertToFoot(data.height/10)
            } ,
            weight: {
                kg: data.weight/10,
                lbs: convertToPounds(data.weight/10)
            },
            img: data.sprites.other.dream_world.front_default,
            types: data.types.map((type: any) => type.type.name),
            abilities: data.abilities.map((ability: any) => toCapitalCase(processString(ability.ability.name))),
            stats: data.stats.map((stat: any) => {
                return {
                    stat_name: stat.stat.name, 
                    base_stat: stat.base_stat
                } 
            }),
            moves: data.moves.map((move: any) => toCapitalCase(processString(move.move.name)))
        } 
    }

    const getPokemonDetailData = async (idOrName: any) => {
        const pokemonData = await getPokemonData(idOrName);
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${idOrName}`);   
        const battleConditionData = await fetchBattleConditionData(pokemonData.types);
        const prevAndNext = await getPrevAndNextPokemon(pokemonData.id)
        return {
            ...pokemonData,
            prevAndNext: {
                prev_name: prevAndNext[0],
                next_name: prevAndNext[1]
            },
            species_name: data.genera.find((genus: any) => genus.language.name === "en").genus,
            egg_groups: data.egg_groups.map((egg_group: any) => toCapitalCase(egg_group.name)),
            habitat: toCapitalCase(data.habitat.name),
            growth_rate: toCapitalCase(processString(data.growth_rate.name)),
            description: processString(data.flavor_text_entries.find((flavor_text_entry: any) => flavor_text_entry.language.name === "en").flavor_text),
            battle_condition: battleConditionData
        }  
    }

    const getPokemonList = async (query ?: string) => {
        let list: Pokemon[] = []
        if (!query) {
            const data = await fetchPokemons();   
            for (const result of data.results) {
                const pokemonData = await getPokemonData(result.name);     
                pokemonData && list.push(pokemonData)
            }
        } else {
            const dataFromQuery = await fetchPokemonsFromQuery(query);     
            for (const pokemon of dataFromQuery.pokemons) {
                const pokemonDataFromQuery = await getPokemonData(pokemon.id);
                pokemonDataFromQuery && list.push(pokemonDataFromQuery)
            }
        }
        return list
    }
    
    const searchPokemon = (query: string) => {
        fetchBattleConditionData(["grass", "poison"])

        setQuery(query);
        setPokemons([])
        setHasMore(true)
        setLoading(true);

        const loadPokemonFromQuery = async() => {
            
            //if integer is passed as the query, search as pokemon id
            if (Number.isInteger(parseInt(query))) {
                const pokemonData = await getPokemonData(parseInt(query)) 
                // setTimeout(() => {
                    pokemonData && setPokemons([pokemonData])
                    setHasMore(false)
                    setLoading(false)
                // }, 1000)      
                return;
            } 
            //else search as pokemon name
            const pokemonList = await getPokemonList(query)            
            // setTimeout(()=>{
                pokemonList.sort((a, b) => a.id - b.id)
                setPokemons(pokemonList)
                if (pokemonList.length < 20) setHasMore(false)
                setLoading(false)
            // }, 1000)
        }      
        loadPokemonFromQuery();
    }   
     
    useEffect(() => {
        setHasMore(true)
        setLoading(true);
        const loadMorePokemon = async() => {
            const pokemonList = await (query ? getPokemonList(query) : getPokemonList())
            // setTimeout(()=>{
                pokemonList.sort((a, b) => a.id - b.id)
                setPokemons([...pokemons,...pokemonList])
                if (pokemonList.length < 20) setHasMore(false)
                setLoading(false)
            // }, 1000)
        }      
        loadMorePokemon();
        
    },[offset, pageNumber])

    return {loading, pokemons, hasMore, query, searchPokemon, getPokemonData, getPokemonDetailData, renderGender}
}

export default usePokemons