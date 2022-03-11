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
import LevelBar from '../common/LevelBar'
import { Pokemon } from '../../hooks/usePokemons';
import TypeBadge from '../common/TypeBadge';
interface Props {
    pokemon: Pokemon
}

const Stats: React.FC<Props> = ({ pokemon }) => {
    const statLabelColor = useColorModeValue('blackAlpha.600', 'whiteAlpha.600')
    
    return (
        <VStack fontWeight={{ base: "normal", md: "bold" }} fontSize={['xs', 'sm', 'md', 'lg']} >
            <Table variant='unstyled'  w={['100%', '90%', '80%', '70%']} >
                <Tbody >
                    <Tr>
                        <Td color={statLabelColor} px={2} w="20%">HP</Td>
                        <Td w="20%" px={2}>{ pokemon.stats.find(stat => stat.stat_name === 'hp')?.base_stat }</Td>
                        <Td px={2}>
                            <LevelBar minVal={ pokemon.stats.find(stat => stat.stat_name === 'hp')?.base_stat } stat="hp"/>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td color={statLabelColor} px={2}>Attack</Td>
                        <Td px={2}>{ pokemon.stats.find(stat => stat.stat_name === 'attack')?.base_stat }</Td>
                        <Td px={2}>
                            <LevelBar minVal={pokemon.stats.find(stat => stat.stat_name === 'attack')?.base_stat} stat="attack"/>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td color={statLabelColor} px={2}>Defense</Td>
                        <Td px={2}>{ pokemon.stats.find(stat => stat.stat_name === 'defense')?.base_stat }</Td>
                        <Td px={2}>
                            <LevelBar minVal={pokemon.stats.find(stat => stat.stat_name === 'defense')?.base_stat} stat="defense"/>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td color={statLabelColor} px={2} >Sp. Atk</Td>
                        <Td px={2}>{ pokemon.stats.find(stat => stat.stat_name === 'special-attack')?.base_stat }</Td>
                        <Td px={2}> 
                            <LevelBar minVal={pokemon.stats.find(stat => stat.stat_name === 'special-attack')?.base_stat} stat="special-attack"/>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td color={statLabelColor} px={2}>Sp. Def</Td>
                        <Td px={2}>{ pokemon.stats.find(stat => stat.stat_name === 'special-defense')?.base_stat }</Td>
                        <Td px={2}>
                            <LevelBar minVal={pokemon.stats.find(stat => stat.stat_name === 'special-defense')?.base_stat} stat="special-defense"/>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td color={statLabelColor} px={2}>Speed</Td>
                        <Td px={2}>{ pokemon.stats.find(stat => stat.stat_name === 'speed')?.base_stat }</Td>
                        <Td px={2}>
                            <LevelBar minVal={pokemon.stats.find(stat => stat.stat_name === 'speed')?.base_stat} stat="speed"/>
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
            <VStack py={5} alignItems='left' w={['100%', '90%', '80%', '70%']} spacing={5}>
                <Text textAlign='center' fontSize={{base: 'xl', md:'2xl'}} fontFamily="Roboto Mono" fontWeight='bold'>Battle Condition</Text>
                <Flex direction={{base: 'column', xl: 'row'}} alignItems={{base: 'left', xl: 'center'}}>
                    <Text fontSize={['xs','sm', 'md' ]} w="47%">Weak against: </Text>
                    <SimpleGrid py={2} columns={[5, 6, 7]} spacingX={3} spacingY={1}>
                        {
                            pokemon.battle_condition.double_damage_from.map((type, index) => (
                                <TypeBadge type={type} key={index}/>
                            ))
                        }
                    </SimpleGrid>
                </Flex>
                <Flex direction={{base: 'column', xl: 'row'}} alignItems={{base: 'left', xl: 'center'}}>
                    <Text fontSize={['xs','sm', 'md' ]}  w="47%">Effective against: </Text>
                    <SimpleGrid py={2} columns={[5, 6, 7]} spacingX={3} spacingY={1}>
                        {
                            pokemon.battle_condition.double_damage_to.map((type, index) => (
                                <TypeBadge type={type} key={index} />
                            ))
                        }
                    </SimpleGrid>
                </Flex>
            </VStack>
        </VStack>
        
    )
}

export default Stats