import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import usePokemons from '../hooks/usePokemons';

interface Pokemon {
    id: number,
    name: string,
    height: number, 
    weight: number, 
    img: string,
    types: string[]
}

const PokemonDetail = () => {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState<Pokemon | null>();
    const { getPokemonData } = usePokemons();

    useEffect(() => {
        const getPokemon = async () => {
            const data = await getPokemonData(name);
            setPokemon(data)
        }
        getPokemon();
    }, [])  

    return (
        <div>{name}</div>
    )
}

export default PokemonDetail