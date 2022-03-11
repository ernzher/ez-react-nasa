import React from 'react'
import { 
    Box,
    Image,
    Flex,
    HStack,
    VStack,
    Text,
    useColorModeValue,
    Link
} from '@chakra-ui/react'
import TypeBadge from '../common/TypeBadge'
import { Link as ReactRouterLink } from 'react-router-dom'
import { Pokemon } from '../../hooks/usePokemons';

interface Props
{
    pokemon: Pokemon,
    renderGender: (gender: string | null) => any 
}

const PokeCard: React.FC<Props> = ({pokemon, renderGender}) => {
    const card_color = useColorModeValue("gray.100", "gray.700")
    const box_shadow = useColorModeValue("2xl", "")
    return (
        <Link variant="popout" as={ReactRouterLink} to={`/pokemon/${pokemon.name.toLowerCase()}`}>
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
                    <Flex alignItems='center' fontSize={['md', 'lg','xl']}  mt={0}>
                        <Text fontWeight={1000} pr={1}>{pokemon.name.replace(/-f|-m/g,'')} </Text>
                        { renderGender(pokemon.gender) }
                    </Flex>
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
        </Link>
        
    )
}

export default PokeCard