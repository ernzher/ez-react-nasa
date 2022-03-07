import React from 'react'
import { 
    Box,
    SimpleGrid,
    Spinner,
    Flex,
    Text,
    Link
} from '@chakra-ui/react'
import PokeCard from './PokeCard'
import CustomDivider from '../common/CustomDivider'
import SearchBar from './SearchBar'
// import Link from 'react-router-dom'

interface Props{
    pokemons: {
        id: number,
        name: string,
        height: number, 
        weight: number, 
        img: string,
        types: string[]
    }[],
    loading: boolean,
    lastPokemonElementRef: (node: any) => void,
    searchPokemon: (query: string) => void,
    clearData: () => void
}

const PokeList:React.FC<Props> = ({pokemons, loading, lastPokemonElementRef, searchPokemon, clearData}) => {
    return (
        <Box mx={[3, 10, 15, 20]} py={10} position="relative">
            <div id="searchRef" style={{ position: "absolute" , top: "-50px" }}></div>
            <SimpleGrid columns={{base: 1, md: 2}} mx={5} spacing={5} pb={5}>
                <Box textAlign={{ base: "center", md: "left"}} cursor="pointer" onClick={() => { searchPokemon(""); clearData(); }} >
                    <Text color='brand.100' fontFamily='Jost' fontSize={{ base:"md", md:"lg" }}>POKÉMONS</Text>
                    <Text fontSize={{ base:"2xl",sm:"4xl" }} fontFamily='Jost' fontWeight='400' letterSpacing={2}>Welcome To The Pokédex</Text>          
                </Box>
                <SearchBar searchPokemon={searchPokemon} clearData={clearData} isSearching={loading} />
            </SimpleGrid>
             <CustomDivider />
            <SimpleGrid columns={[2, 2, 3, 4, 5, 6]} alignItems="center" spacing={2} pt={5}>
                {
                    pokemons.map((pokemon, index: number) => {
                        if (pokemon.img) {
                            if (pokemons.length === index+1) {
                                return (
                                    <Link variant="popout" key={index}>  
                                        <div ref={lastPokemonElementRef} >
                                            <PokeCard pokemon={pokemon} />
                                        </div>
                                    </Link>
                                )
                            }
                            return (
                                <Link variant="popout" key={index} >  
                                    <PokeCard pokemon={pokemon} />
                                </Link>
                            )
                        }
                    })
                }
            </SimpleGrid>
            {
                loading && 
                <Flex justifyContent='center' alignItems='center' mt={10} >
                    <Spinner size='lg' />
                </Flex>                
            }
        </Box>
    )
}

export default PokeList