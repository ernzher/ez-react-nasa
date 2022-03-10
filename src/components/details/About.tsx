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
    useColorModeValue
} from '@chakra-ui/react'
import { TimeIcon, UpDownIcon } from '@chakra-ui/icons'
import { Pokemon } from '../../hooks/usePokemons';

interface Props {
    pokemon: Pokemon
}

const About: React.FC<Props> = ({ pokemon }) => {
    const weightHeightContainerBgColor = useColorModeValue('whiteAlpha.500', 'blackAlpha.500')
    const weightHeightContainerBoxShadow = useColorModeValue('lg', '')
    const dataLabelColor = useColorModeValue('blackAlpha.600', 'whiteAlpha.600')

    return (
        <VStack spacing={{ base: 5, md: 10 }} fontWeight="bold">
            <Text textAlign='center' fontSize={['xs', 'sm', 'md', 'lg']}>{ pokemon.description }</Text>
            <Flex 
                borderRadius={20} 
                justifyContent='space-evenly' 
                bgColor={weightHeightContainerBgColor} 
                boxShadow={weightHeightContainerBoxShadow}
                alignItems='center' 
                w={['100%', '90%', '80%', '70%']}
                p={{ base: 2, md: 5 }}
            >
                <VStack>
                    <HStack>
                        <TimeIcon/>
                        <Text fontSize={['xs', 'sm', 'md', 'lg']} fontFamily={{base:'Roboto', md: 'Roboto Mono'}}>{ pokemon.weight.kg } kg ( {pokemon.weight.lbs} lbs )</Text>
                    </HStack>
                    <Text fontSize={['xs', 'sm', 'md', 'lg']}>Weight</Text>
                </VStack>
                <Box h={10} w={.5} bgColor={dataLabelColor} />
                <VStack>
                    <HStack>
                        <UpDownIcon />
                        <Text fontSize={['xs', 'sm', 'md', 'lg']} fontFamily={{base:'Roboto', md: 'Roboto Mono'}}>{ pokemon.height.m } m ( {pokemon.height.foot} )</Text>
                    </HStack>
                    <Text fontSize={['xs', 'sm', 'md', 'lg']}>Height</Text>
                </VStack>
            </Flex>
            <Table variant='unstyled' w={['100%', '90%', '80%', '70%']} fontSize={{ base: 'sm', md: 'md' }}>
                <Tbody>
                    <Tr>
                        <Td px={1} color={dataLabelColor} w="40%">Species</Td>
                        <Td px={1}>{ pokemon.species_name }</Td>
                    </Tr>
                    <Tr>
                        <Td px={1} color={dataLabelColor}>Abilities</Td>
                        <Td px={1}>{ pokemon.abilities.join(", ") }</Td>
                    </Tr>
                    <Tr>
                        <Td px={1} color={dataLabelColor}>Egg Groups</Td>
                        <Td px={1}>{ pokemon.egg_groups.join(", ") }</Td>
                    </Tr>
                    <Tr>
                        <Td px={1} color={dataLabelColor} >Habitat</Td>
                        <Td px={1}>{ pokemon.habitat }</Td>
                    </Tr>
                    <Tr>
                        <Td px={1} color={dataLabelColor}>Growth Rate</Td>
                        <Td px={1}>{ pokemon.growth_rate }</Td>
                    </Tr>
                </Tbody>
            </Table>
        </VStack>
    )
}

export default About