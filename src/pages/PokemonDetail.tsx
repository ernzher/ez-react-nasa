import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import usePokemons from '../hooks/usePokemons';
import { 
    Box,
    SimpleGrid,
    Spinner,
    Flex,
    Text,
    Link,
    HStack,
    Image,
    VStack,
    Button,
    Divider
} from '@chakra-ui/react'
import About from '../components/details/About';
import Stats from '../components/details/Stats';
import Moves from '../components/details/Moves';
import TypeBadge from '../components/common/TypeBadge';
import { Pokemon } from '../hooks/usePokemons';

const PokemonDetail = () => {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState<Pokemon>();
    const [activeCategory, setActiveCategory] = useState("about") 
    const { getPokemonDetailData } = usePokemons();

    
    useEffect(() => {
        const getPokemon = async () => {
            const data = await getPokemonDetailData(name);            
            setPokemon(data)                    
        }
        getPokemon();
    }, [])  

    const renderCategory = (pokemon: Pokemon ,category: string ) => {
        switch(category) {
            case 'about':
                return <About pokemon={ pokemon } />;
            case 'stats':
                return <Stats />;
            case 'moves':
                return <Moves />;
        }
    }
    return (
        <Box>
            {
                pokemon && (
                    <Box bgGradient={`linear(to-b, transparent, type.${pokemon.types[0]}, transparent )`} position="relative">
                        <Flex fontFamily="Roboto Mono" p={{ base:5 , md: 10 }} justifyContent='space-between' alignItems='center'>
                            <VStack align='left'>
                                <Text fontSize={{ base:"2xl", md: "4xl" }} fontWeight={1000} >{pokemon.name}</Text>
                                <HStack spacing={3}>
                                    {
                                        pokemon.types.map((type, index) => (
                                            <TypeBadge type={type} key={index}/>
                                        ))
                                    }
                                </HStack>
                            </VStack>
                            <Text># {pokemon.id.toLocaleString('en-US', {minimumIntegerDigits: 3})}</Text>
                        </Flex>
                        <Box 
                            left="50%"
                            top={{ base:32, md: 16 }}
                            transform="translateX(-50%)"
                            position="absolute"
                        >    
                            <Image src={pokemon.img} h={[150,170,200]}/> 
                        </Box>
                        <Box h={{ base: 140, md: 58 }}></Box>
                        <Box borderTopRadius={30} bgSize="cover" bgColor="blackAlpha.600"  pt={85}>
                            <Flex p={5} justifyContent='space-around' overflow='hidden'>
                                <Button
                                    w={48}
                                    fontSize='xl'
                                    color={activeCategory==="about" ? "white" : "whiteAlpha.500"}
                                    variant={activeCategory==="about" ? "focusedCategory" : "unstyled"} 
                                    onClick={() => setActiveCategory('about')}
                                >
                                    About
                                </Button>
                                <Button
                                    w={48}
                                    fontSize='xl'
                                    color={activeCategory==="stats" ? "white" : "whiteAlpha.500"}
                                    variant={activeCategory==="stats" ? "focusedCategory" : "unstyled"} 
                                    onClick={() => setActiveCategory('stats')}
                                >
                                    Stats
                                </Button>
                                <Button
                                    w={48}
                                    fontSize='xl'
                                    color={activeCategory==="moves" ? "white" : "whiteAlpha.500"}
                                    variant={activeCategory==="moves" ? "focusedCategory" : "unstyled"} 
                                    onClick={() => setActiveCategory('moves')}
                                >
                                    Moves
                                </Button>
                              </Flex>
                            <Box p={{ base:5 , md: 10 }}>
                                { renderCategory(pokemon, activeCategory) }
                            </Box>
                        </Box>                        
                    <VStack>
                        
                    </VStack>
                    </Box>
                    
                    
                    
                )
            }
        </Box>
    )
}

export default PokemonDetail