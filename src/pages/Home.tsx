import React from 'react'
import { 
    Box,
} from '@chakra-ui/react'
import Banner from '../components/home/Banner'
import PokeList from '../components/home/PokeList'
import { useState, useEffect, useCallback, useRef } from 'react'
import usePokemons from '../hooks/usePokemons'
import ScrollToButton from '../components/common/ScrollToButton'
import { Helmet } from "react-helmet-async"


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
        query,
        searchPokemon,
        renderGender
    } = usePokemons(offset, pageNumber)

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
        clearData()
    }, [query])

    const clearData = (): void => {
        setOffset(0);
        setPageNumber(1)
    }
    const scrollToSearch = ():void => document.getElementById("searchRef")?.scrollIntoView({behavior: "smooth"})
   
    return (
       <Box position="relative">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`Home | Pokédex`}</title>
            </Helmet>
            <Banner scrollToSearch={scrollToSearch}/>
            <PokeList 
                pokemons={pokemons} 
                loading={loading} 
                lastPokemonElementRef={lastPokemonElementRef} 
                searchPokemon={searchPokemon} 
                clearData={clearData} 
                renderGender={renderGender}
            />
            <ScrollToButton scrollToFunction={scrollToSearch}/>
        </Box>
    )
}

export default Home