import React from 'react'
import { 
    Box,
} from '@chakra-ui/react'
import Banner from '../components/home/Banner'
import PokeList from '../components/home/PokeList'
import { useState, useEffect, useCallback, useRef } from 'react'
import useLoadMoreOrSearch from '../hooks/useLoadMoreOrSearch'

interface State {
    offset: number,
    pageNumber: number
}

const Home = () => {
    const [offset, setOffset] = useState<State["offset"]>(0)
    const [pageNumber, setPageNumber] = useState<State["pageNumber"]>(1)

    const {
        pokemons,
        hasMore,
        loading,
        error,
        query,
        searchPokemon
    } = useLoadMoreOrSearch(offset, pageNumber)

    const observer = useRef<any>()
    const lastPokemonElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore){ 
                query ? setPageNumber(pageNumber => pageNumber + 1) : setOffset(offset => offset + 20)                
            }            
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    useEffect(() => {
        setOffset(0);
        setPageNumber(1)
    }, [query])

    const scrollToSearch = ():void => document.getElementById("searchRef")?.scrollIntoView({behavior: "smooth"})

    return (
       <Box position="relative">
            <Banner scrollToSearch={scrollToSearch}/>
            <PokeList pokemons={pokemons} loading={loading} lastPokemonElementRef={lastPokemonElementRef} searchPokemon={searchPokemon} />
        </Box>
    )
}

export default Home