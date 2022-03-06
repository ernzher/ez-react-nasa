import React from 'react'
import { 
    Box,
} from '@chakra-ui/react'
import Banner from '../components/home/Banner'
import PokeList from '../components/home/PokeList'
import { useState, useCallback, useRef } from 'react'
import useLoadMore from '../hooks/useLoadMore'

interface State {
    offset: number
}

const Home = () => {
    const [offset, setOffset] = useState<State["offset"]>(0)

    const {
        pokemons,
        hasMore,
        loading,
        error
    } = useLoadMore(offset)


    const observer = useRef<any>()
    const lastPokemonElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore){ 
                setOffset(offset => offset + 20)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    

    return (
       <Box position="relative">
            <Banner />
            <PokeList pokemons={pokemons} loading={loading} lastPokemonElementRef={lastPokemonElementRef} />
        </Box>
    )
}

export default Home