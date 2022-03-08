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
const About = () => {
    return (
        <VStack spacing={10}>
            <Text >A strange seed was planted on its back at birth. The plant sprouts and grows</Text>
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
                        <Text>6.9 kg (15.2 lbs)</Text>
                    </HStack>
                    <Text>Weight</Text>
                </VStack>
                <Divider h={10} bgColor="gray.200" orientation='vertical' />
                <VStack>
                    <HStack>
                        <UpDownIcon />
                        <Text>0.7m (2' 04'')</Text>
                    </HStack>
                    <Text>Height</Text>
                </VStack>
            </Flex>
            <Table variant='unstyled' w="70%">
                <Tbody>
                    <Tr>
                        <Td color="whiteAlpha.700">Species</Td>
                        <Td w="70%">Seed Pokemon</Td>
                    </Tr>
                    <Tr>
                        <Td color="whiteAlpha.700">Abilities</Td>
                        <Td w="70%">Overgrow, Chlorophyll</Td>
                    </Tr>
                    <Tr>
                        <Td color="whiteAlpha.700">Egg Groups</Td>
                        <Td w="70%">Monster, Plant</Td>
                    </Tr>
                    <Tr>
                        <Td color="whiteAlpha.700" >Habitat</Td>
                        <Td w="70%">Rainforests, Grass</Td>
                    </Tr>
                    <Tr>
                        <Td color="whiteAlpha.700">Growth Rate</Td>
                        <Td w="70%">Medium-slow</Td>
                    </Tr>
                </Tbody>
            </Table>
        </VStack>
    )
}

export default About