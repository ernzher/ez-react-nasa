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
    Divider,
    useColorModeValue
} from '@chakra-ui/react'
import About from '../components/details/About';
import Stats from '../components/details/Stats';
import Moves from '../components/details/Moves';
import TypeBadge from '../components/common/TypeBadge';
import { Pokemon } from '../hooks/usePokemons';

const PokemonDetail = () => {
    const containerBgColor = useColorModeValue("whiteAlpha.600", "blackAlpha.600")
    const activeCategoryColor = useColorModeValue("black", "white")
    const inactiveCategoryColor = useColorModeValue("blackAlpha.500", "whiteAlpha.500")

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
                return <Stats pokemon={ pokemon }/>;
            case 'moves':
                return <Moves pokemon={ pokemon } />;
        }
    }
    return (
        <Box>
            {
                pokemon && (
                    <Box fontFamily="Roboto Mono" bgGradient={`linear(to-b, transparent, type.${pokemon.types[0]}, transparent )`} position="relative">
                        <Flex  p={{ base:5 , md: 10 }} justifyContent='space-between' alignItems='center'>
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
                            <Text fontSize={{ base:"lg", md: "xl" }}># {pokemon.id.toLocaleString('en-US', {minimumIntegerDigits: 3})}</Text>
                        </Flex>
                        <Box 
                            left="50%"
                            top={{ base:32, md: 16 }}
                            transform="translateX(-50%)"
                            position="absolute"
                        >    
                            <Image src={pokemon.img} h={[150,170,200]}/> 
                        </Box>
                        <Box h={{ base: 110, md: 38 }}></Box>
                        <Box borderTopRadius={30} bgSize="cover" bgColor={containerBgColor}  pt={85}>
                            <Flex p={5} justifyContent='space-around' overflow='hidden'>
                                <Button
                                    w={[32,48, 52]}
                                    fontSize={{ base: 'md', md: 'xl' }}
                                    letterSpacing={1.1}
                                    color={activeCategory==="about" ? activeCategoryColor : inactiveCategoryColor}
                                    variant={activeCategory==="about" ? "" : "unstyled"} 
                                    fontWeight={activeCategory==="about" ? "bold" : ""}
                                    borderBottom={activeCategory==="about" ? `2px ${activeCategoryColor} solid` : ""}
                                    onClick={() => setActiveCategory('about')}
                                >
                                    About
                                </Button>
                                <Button
                                    w={[32,48, 52]}
                                    fontSize={{ base: 'md', md: 'xl' }}
                                    letterSpacing={1.1}
                                    color={activeCategory==="stats" ? activeCategoryColor : inactiveCategoryColor}
                                    variant={activeCategory==="stats" ? "" : "unstyled"} 
                                    fontWeight={activeCategory==="stats" ? "bold" : ""}
                                    borderBottom={activeCategory==="stats" ? `2px ${activeCategoryColor} solid` : ""}
                                    onClick={() => setActiveCategory('stats')}
                                >
                                    Stats
                                </Button>
                                <Button
                                    w={[32,48,52]}
                                    fontSize={{ base: 'md', md: 'xl' }}
                                    letterSpacing={1.1}
                                    color={activeCategory==="moves" ? activeCategoryColor : inactiveCategoryColor}
                                    variant={activeCategory==="moves" ? "" : "unstyled"} 
                                    fontWeight={activeCategory==="moves" ? "bold" : ""}
                                    borderBottom={activeCategory==="moves" ? `2px ${activeCategoryColor} solid` : ""}
                                    onClick={() => setActiveCategory('moves')}
                                >
                                    Moves
                                </Button>
                              </Flex>
                            <Box px={{ base:5 , md: 10 }} py={{ base:0 , md: 5 }}>
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