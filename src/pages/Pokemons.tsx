import React from 'react'
import { 
    Box, Flex, Text, VStack,
} from '@chakra-ui/react'
import PokeList from '../components/home/PokeList'
import { useState, useEffect, useCallback, useRef } from 'react'
import usePokemons from '../hooks/usePokemons'
import ScrollToButton from '../components/common/ScrollToButton'
import { Helmet } from "react-helmet-async"


interface State {
    offset: number,
    pageNumber: number
}

const Pokemons = () => {    
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
    const scrollToTop = ():void => window.scrollTo({top: 0, behavior: "smooth"})
   
    return (
       <Box position="relative">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`Pokémons | Pokédex`}</title>
            </Helmet>
            <Flex justifyContent='center' alignItems='center' py={16} px={5} bgGradient="linear(to-r, , #24adf3, #29deb7)" bgSize='cover' position='relative'>
                <Box position='absolute' w="100%" h="100%" bgColor='blackAlpha.100'></Box>
                <VStack color='white' zIndex={20} fontFamily="Roboto">
                    <Text fontSize={{ base:"3xl",sm:"4xl", md:"5xl" }} fontWeight='1000' letterSpacing={2}>Pokémons</Text>
                    <Text fontSize={{ base:"sm", md:"md" }}>Explore your favorite pokemons now!</Text>
                </VStack>
            </Flex>
            <PokeList 
                pokemons={pokemons} 
                loading={loading} 
                lastPokemonElementRef={lastPokemonElementRef} 
                searchPokemon={searchPokemon} 
                clearData={clearData} 
                renderGender={renderGender}
            />
           <ScrollToButton scrollToFunction={scrollToTop}/>
        </Box>
    )
}

export default Pokemons