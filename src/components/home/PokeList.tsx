import React from 'react'
import { 
    Box,
    SimpleGrid
} from '@chakra-ui/react'
import PokeCard from './PokeCard'
import { Url } from 'url'

interface Props{
    pokemons: {
        id: number,
        name: string,
        height: number, 
        weight: number, 
        img: string,
        types: string[]
    }[]
}

const PokeList:React.FC<Props> = ({pokemons}) => {
    return (
        <Box mx={[3, 10, 15, 20]} py={10}>
            <SimpleGrid columns={[2, 2, 3, 4, 5, 6]} alignItems="center" spacing={[3, 5, 7]}>
                {
                    pokemons.map((pokemon, index: number) => (
                        <PokeCard key={index} pokemon={pokemon}/>
                    ))
                }
            </SimpleGrid>
        </Box>
    )
}

export default PokeList