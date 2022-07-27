import React from 'react'
import { 
    Box, 
    Flex, 
    Text, 
    VStack,
    Divider,
    Image,
    SimpleGrid
} from '@chakra-ui/react'
import { FaBolt, FaCss3Alt, FaHtml5, FaJs, FaNodeJs, FaReact } from 'react-icons/fa'
import { Helmet } from 'react-helmet-async'
import Banner from '../components/home/Banner'
const Home = () => {
    return (
        <Box>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`Home | Pokédex`}</title>
            </Helmet>
            <Banner />
            <VStack align="left" px={{ base: 5, md: 20 }} py={10} spacing={5}>
                <VStack textAlign='center' py={5} fontFamily="Jost">
                    <Text fontSize={{ base:"md", md:"xl" }} color="brand.100">TECHNOLOGIES</Text>
                    <Text fontSize={{ base:"2xl", md:"4xl"}} letterSpacing={2} fontWeight='bold'>Technologies & Stacks</Text>
                    <Text fontSize={{ base:"sm", md:"md" }}>Every tool used to develop this project.</Text>
                </VStack>
                
                <Divider bgColor='brand.100' height={.5} />
                <VStack align="left" color="gray.500" spacing={5}>
                    <VStack align="left" spacing={5} py={5}>
                        <Text fontSize={{ base:"xl",sm:"2xl", md:"3xl"}} >FRONT-END</Text>
                        <Divider bgColor='gray.500' height={.2} />
                        <SimpleGrid columns={[3,4,5]} spacing={5}>
                            <VStack>
                                <FaHtml5 size={50}/>
                                <Text>HTML5</Text>
                            </VStack>
                            <VStack>
                                <FaCss3Alt size={50}/>
                                <Text>CSS3</Text>
                            </VStack>
                            <VStack>
                                <FaReact size={50}/>
                                <Text>React</Text>
                            </VStack>
                            <VStack>
                                <FaBolt size={50}/>
                                <Text>Chakra UI</Text>
                            </VStack>
                            <VStack>
                                <Image src="/assets/icons/typescript_icon.svg" height={50}/>
                                <Text>TypeScript</Text>
                            </VStack>
                        </SimpleGrid>    
                    </VStack>
                    <Divider bgColor='gray.500' height={.5} />
                    <VStack align="left" spacing={5} py={5}>
                        <Text fontSize={{ base:"xl",sm:"2xl", md:"3xl"}} >BACK-END</Text>
                        <Divider bgColor='gray.500' height={.2} />
                        <SimpleGrid columns={[3,4,5]} spacing={5}>
                            <VStack>
                                <FaNodeJs size={50}/>
                                <Text>Node.js</Text>
                            </VStack>
                            <VStack>
                                <Image src="/assets/icons/pokeball_icon.svg" height={50}/>
                                <Text>PokéAPI</Text>
                            </VStack>
                        </SimpleGrid> 
                    </VStack>  
                </VStack>  
            </VStack>
        </Box>
        
        
    )
}

export default Home