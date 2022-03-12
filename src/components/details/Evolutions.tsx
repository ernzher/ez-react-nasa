import React from 'react'
import { 
    Box,
    Image,
    Text,
    HStack,
    VStack,
    Table,
    Tbody,
    Tr,
    Td,
    useColorModeValue,
    Flex,
    SimpleGrid,
    Stack,
    useBreakpointValue
} from '@chakra-ui/react'
import { ArrowDownIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { PokemonDetails } from '../../hooks/usePokemons';
import { useState } from 'react'
import { Link } from 'react-router-dom';

interface Props {
    pokemon: PokemonDetails,
    renderGender: (gender: string | null) => any 
}

const Evolutions: React.FC<Props> = ({ pokemon, renderGender }) => {
    const pokemonBgGradient = useColorModeValue('radial(blackAlpha.700, transparent 72%)', 'radial(whiteAlpha.700, transparent 72%)')

    return (
        <Stack direction={{ base: "column", md: "row"  }}  p={{ base: 4, md: 20  }} justifyContent="center" fontFamily='Jost' fontSize={['xs', 'sm', 'md', 'lg']}>
            {
                pokemon.evolution_chain.map((evolution, index) => (
                    <Stack direction={{ base: "column", md: "row"  }} alignItems="center" key={index}>
                        {
                            Array.isArray(evolution) ?
                            <SimpleGrid columns={evolution.length === 2 ? 2 : evolution.length === 3 ? 3 : { base: 3, md: 4  }} spacingX={5} spacingY={10}>
                                {
                                    evolution.map((evo, idx) => {
                                        if (evo.img)  
                                        return (
                                            <Link key={idx} to={`/pokemon/${evo.id}`}>
                                                <VStack spacing={4}  transform={pokemon.id === evo.id ? "scale(1.1)" : ""}>
                                                    <Box bgGradient={pokemon.id === evo.id ? pokemonBgGradient : ""} >
                                                        <Image src={evo.img} h={[20, 24, 32, 36]}/>
                                                    </Box>
                                                    <VStack>
                                                        <Text fontSize={['x-small', 'xs', 'sm', 'md']} color='gray.500'># {evo.id.toLocaleString('en-US', {minimumIntegerDigits: 3})}</Text>
                                                        <Flex alignItems='center'>
                                                            <Text fontWeight={1000} pr={1}>{evo.name.replace(/-f|-m/g,'')} </Text>
                                                            { renderGender(evo.gender) }
                                                        </Flex>
                                                    </VStack>
                                                </VStack>
                                            </Link>
                                            
                                        )
                                    })
                                }
                            </SimpleGrid>
                            :
                            <Link to={`/pokemon/${evolution.id}`}>
                                <VStack spacing={4} transform={pokemon.id === evolution.id ? "scale(1.1)" : ""} >
                                    <Box bgGradient={pokemon.id === evolution.id ? pokemonBgGradient : ""} >
                                        <Image src={evolution.img} h={[20, 24, 32, 36]}/>
                                    </Box>
                                    <VStack>
                                        <Text fontSize={['x-small', 'xs', 'sm', 'md']} color='gray.500'># {evolution.id.toLocaleString('en-US', {minimumIntegerDigits: 3})}</Text>
                                        <Flex alignItems='center'>
                                            <Text fontWeight={1000} pr={1}>{evolution.name.replace(/-f|-m/g,'')} </Text>
                                            { renderGender(evolution.gender) }
                                        </Flex>
                                    </VStack>
                                </VStack>
                            </Link>
                        }
                       
                        {
                            index < pokemon.evolution_chain.length-1 && 
                            <Box p={5}>
                                <ArrowDownIcon boxSize={8} display={{ base: "block", md: "none"  }}/>
                                <ArrowForwardIcon boxSize={8} display={{ base: "none", md: "block"  }} />
                            </Box>
                        }
                    </Stack>
                    
                    
                ))
            }
        </Stack>
    )
}

export default Evolutions