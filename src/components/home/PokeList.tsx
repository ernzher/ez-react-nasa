import React from 'react'
import { 
    Box,
    SimpleGrid,
    Spinner,
    Flex,
    Text
} from '@chakra-ui/react'
import PokeCard from './PokeCard'
import CustomDivider from '../common/CustomDivider'

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
    lastPokemonElementRef: (node: any) => void
}

const PokeList:React.FC<Props> = ({pokemons, loading, lastPokemonElementRef}) => {
    return (
        <Box mx={[3, 10, 15, 20]} py={10} alignItems={{ base: "center", md: "right"}}>
            <Text color='brand.100' fontFamily='Jost' fontSize={{ base:"md", md:"lg" }}>POKÉMONS</Text>
            <Text fontSize={{ base:"2xl",sm:"4xl" }} fontFamily='Jost' fontWeight='400' letterSpacing={2}>Welcome To The Pokédex</Text>          
            <CustomDivider />
            <SimpleGrid columns={[2, 2, 3, 4, 5, 6]} alignItems="center" spacing={2}>
                {
                    pokemons.map((pokemon, index: number) => {
                        if (pokemons.length === index+1) {
                            return (
                                <div ref={lastPokemonElementRef} key={index}>
                                    <PokeCard pokemon={pokemon} />
                                </div>
                            )
                        }
                        return (
                            <PokeCard key={index} pokemon={pokemon} />
                        )
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