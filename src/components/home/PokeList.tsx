import React from 'react'
import { 
    Box,
    Image,
    Flex,
    Stack,
    VStack,
    Text,
    useColorModeValue,
    Button,
    SimpleGrid
} from '@chakra-ui/react'
import PokeCard from './PokeCard'

const PokeList = () => {
    return (
        <Box mx={[3, 10, 15, 20]} py={10}>
            <SimpleGrid columns={[2, 2, 3, 4]} alignItems="center" spacing={[3, 5, 7]}>
                <PokeCard />
                <PokeCard />
                <PokeCard />
                <PokeCard />
                <PokeCard />
                <PokeCard />
                <PokeCard />
                <PokeCard />
                <PokeCard />
                <PokeCard />
                <PokeCard />
                <PokeCard />
                <PokeCard />

            </SimpleGrid>
        </Box>
    )
}

export default PokeList