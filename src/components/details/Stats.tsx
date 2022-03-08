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
import LevelBar from '../common/LevelBar'

const Stats = () => {
    return (
        <Box>
            <Table variant='unstyled' >
                <Tbody>
                    <Tr>
                        <Td color="whiteAlpha.700" colSpan={1}>HP</Td>
                        <Td width="20%">45</Td>
                        <Td width="100%">
                            <LevelBar minVal={50} />
                        </Td>
                    </Tr>
                    <Tr>
                        <Td color="whiteAlpha.700">Attack</Td>
                        <Td>49</Td>
                        <Td width="100%">
                            <LevelBar minVal={50} />
                        </Td>
                    </Tr>
                    <Tr>
                        <Td color="whiteAlpha.700">Defense</Td>
                        <Td>49</Td>
                        <Td width="100%">
                            <LevelBar minVal={70} />
                        </Td>
                    </Tr>
                    <Tr>
                        <Td color="whiteAlpha.700" >Sp. Atk</Td>
                        <Td>65</Td>
                        <Td width="100%">
                            <LevelBar minVal={30} />
                        </Td>
                    </Tr>
                    <Tr>
                        <Td color="whiteAlpha.700">Sp. Def</Td>
                        <Td>65</Td>
                        <Td width="100%">
                            <LevelBar minVal={90} />
                        </Td>
                    </Tr>
                    <Tr>
                        <Td color="whiteAlpha.700">Speed</Td>
                        <Td>45</Td>
                        <Td width="100%">
                            <LevelBar minVal={100} />
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
            <Box p={6}>
                <Text fontSize='xl' fontFamily="Roboto Mono" fontWeight='bold'>Battle Condition</Text>
                <Text>Weak to</Text>
                <Flex>

                </Flex>
            </Box>
        </Box>
        
    )
}

export default Stats