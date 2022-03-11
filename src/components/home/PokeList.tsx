import React from 'react'
import { 
    Box,
    SimpleGrid,
    Spinner,
    Flex,
    Text,
    Image,
    VStack
} from '@chakra-ui/react'
import PokeCard from './PokeCard'
import CustomDivider from '../common/CustomDivider'
import SearchBar from './SearchBar'
import { Pokemon } from '../../hooks/usePokemons';
interface Props{
    pokemons: Pokemon[]
    loading: boolean,
    lastPokemonElementRef: (node: any) => void,
    searchPokemon: (query: string) => void,
    clearData: () => void,
    renderGender: (gender: string | null) => any
}

const PokeList:React.FC<Props> = ({pokemons, loading, lastPokemonElementRef, searchPokemon, clearData, renderGender}) => {
    return (
        <Box mx={[3, 10, 15, 20]} py={10} position="relative">
            <div id="searchRef" style={{ position: "absolute" , top: "-50px" }}></div>
            <SimpleGrid columns={{base: 1, md: 2}} mx={5} spacing={5} pb={5}>
                <Box textAlign={{ base: "center", md: "left"}} cursor="pointer" onClick={() => { searchPokemon(""); clearData(); }} >
                    <Text color='brand.100' fontFamily='Jost' fontSize={{ base:"md", md:"lg" }}>POKÉMONS</Text>
                    <Text fontSize={{ base:"2xl",sm:"4xl" }} fontFamily='Jost' fontWeight='1000' letterSpacing={2}>Welcome To The Pokédex</Text>          
                </Box>
                <SearchBar searchPokemon={searchPokemon} clearData={clearData} isSearching={loading} />
            </SimpleGrid>
            <CustomDivider />
            {   
                pokemons.length ? (
                    <SimpleGrid columns={[2, 2, 3, 4, 5, 6]} alignItems="center" spacing={2} pt={5}>
                        {
                            pokemons.map((pokemon, index: number) => {
                                if (pokemon.img) {
                                    if (pokemons.length === index+1) {
                                        return (
                                            <div key={index} ref={lastPokemonElementRef}>
                                                <PokeCard pokemon={pokemon} renderGender={renderGender}/>                                                
                                            </div>
                                        )
                                    }
                                    return (
                                        <PokeCard key={index} pokemon={pokemon} renderGender={renderGender}/>
                                    )
                                }
                            })
                        }
                    </SimpleGrid>
                ) : (
                    !loading && (   
                        <VStack py={5}>
                            <Flex justifyContent='center' >
                                <Image src="assets/images/sad_pikachu.png" width={{ base: 100, md: 150 }}/>
                            </Flex>
                            <Text fontSize={{ base: "md", md: "lg" }}>No pokémons found!</Text>
                        </VStack>
                    )
                )
            }
            {
                loading && (
                    <Flex justifyContent='center' alignItems='center' mt={10} >
                        <Spinner size='lg' />
                    </Flex> 
                )
            }
            
            
        </Box>
    )
}

export default PokeList