import React from 'react'
import { 
    Box,
    Image,
    Flex,
    HStack,
    VStack,
    Text,
    useColorModeValue,
    
} from '@chakra-ui/react'
import TypeBadge from '../common/TypeBadge'

interface Props{
    pokemon: {
        id: number,
        name: string,
        height: number, 
        weight: number, 
        img: string,
        types: string[]
    }
}

const PokeCard: React.FC<Props> = ({pokemon}) => {
    const card_color = useColorModeValue("gray.100", "gray.700")
    const box_shadow = useColorModeValue("2xl", "0 10px 15px -3px rgba(255, 255, 255, 0.1),0 4px 6px -2px rgba(255, 255, 255, 0.05)")
    return (
        <Box 
            bg={card_color} 
            minW={[130, 150, 200]} 
            py={[8, 10, 12]}
            m={3}
            px={5} 
            borderRadius={20} 
            boxShadow={box_shadow}
        >
            <Flex justifyContent='center' alignItems='center' pb={30}>
                <Image 
                    src={pokemon.img}
                    h={[100, 130, 130, 150]}
                />
            </Flex>
            <VStack spacing={3}>
                <Text fontSize={['xs', 'sm', 'md']} color='gray.500'># {pokemon.id.toLocaleString('en-US', {minimumIntegerDigits: 3})}</Text>
                <Text fontSize={['md', 'lg','xl']} mt={0}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Text>
                <HStack py={2} spacing={1}>
                    {
                        pokemon.types.map((type, index) => {
                            return (
                                <TypeBadge type={type} key={index} />
                            )
                        })
                    }                    
                </HStack>
            </VStack>
        </Box>        
    )
}

export default PokeCard