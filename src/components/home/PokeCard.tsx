import React from 'react'
import { 
    Box,
    Image,
    Flex,
    HStack,
    VStack,
    Text,
    useColorModeValue,
    Button
} from '@chakra-ui/react'
import TypeBadge from '../common/TypeBadge'

const PokeCard = () => {
    const card_color = useColorModeValue("gray.50", "gray.700")
    const box_shadow = useColorModeValue("2xl", "0 10px 15px -3px rgba(255, 255, 255, 0.1),0 4px 6px -2px rgba(255, 255, 255, 0.05)")
    return (
        <Box 
            bg={card_color} 
            my={3} 
            minW={[130, 150, 200]} 
            py={[10, 12, 14]}
            px={5} 
            borderRadius={20} 
            boxShadow={box_shadow}
        >
            <Flex justifyContent='center' alignItems='center' pb={30}>
                <Image 
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
                    maxW={[90, 100, 130, 150]}
                />
            </Flex>
            <VStack spacing={3}>
                <Text fontSize={['xs', 'sm', 'md']} color='gray.500'># 001</Text>
                <Text fontSize={['md', 'lg','xl']} mt={0}>Fletchinder</Text>
                <HStack py={2} spacing={1}>
                    <TypeBadge type="electric"/>
                    <TypeBadge type="grass"/>
                    

                </HStack>
            </VStack>
        </Box>        
    )
}

export default PokeCard