import React from 'react'
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
    Grid,
    GridItem,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
} from '@chakra-ui/react'
import { TimeIcon, UpDownIcon } from '@chakra-ui/icons'
import { Pokemon } from '../../hooks/usePokemons';

interface Props {
    pokemon: Pokemon
}

const About: React.FC<Props> = ({ pokemon }) => {
    return (
        <VStack spacing={10}>
            <Text >{ pokemon.description }</Text>
            <Flex 
                borderRadius={20} 
                justifyContent='space-evenly' 
                bgColor='blackAlpha.500' 
                alignItems='center' 
                w='70%'
                
                p={5}
            >
                <VStack>
                    <HStack>
                        <TimeIcon />
                        <Text>{ pokemon.weight.kg } kg ({pokemon.weight.lbs} lbs)</Text>
                    </HStack>
                    <Text>Weight</Text>
                </VStack>
                <Divider h={10} bgColor="gray.200" orientation='vertical' />
                <VStack>
                    <HStack>
                        <UpDownIcon />
                        <Text>{ pokemon.height.m } m ({pokemon.height.foot})</Text>
                    </HStack>
                    <Text>Height</Text>
                </VStack>
            </Flex>
            <Table variant='unstyled' w="70%">
                <Tbody>
                    <Tr>
                        <Td color="whiteAlpha.700">Species</Td>
                        <Td w="70%">{ pokemon.species_name }</Td>
                    </Tr>
                    <Tr>
                        <Td color="whiteAlpha.700">Abilities</Td>
                        <Td w="70%">{ pokemon.abilities.join(", ") }</Td>
                    </Tr>
                    <Tr>
                        <Td color="whiteAlpha.700">Egg Groups</Td>
                        <Td w="70%">{ pokemon.egg_groups.join(", ") }</Td>
                    </Tr>
                    <Tr>
                        <Td color="whiteAlpha.700" >Habitat</Td>
                        <Td w="70%">{ pokemon.habitat }</Td>
                    </Tr>
                    <Tr>
                        <Td color="whiteAlpha.700">Growth Rate</Td>
                        <Td w="70%">{ pokemon.growth_rate }</Td>
                    </Tr>
                </Tbody>
            </Table>
        </VStack>
    )
}

export default About