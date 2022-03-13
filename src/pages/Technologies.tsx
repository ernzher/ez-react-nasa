import React from 'react'
import { 
    Box, 
    Center, 
    Flex, 
    Text, 
    VStack,
    useColorModeValue
} from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
const Technologies = () => {

    return (
        <Box>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`Technologies | Pokédex`}</title>
            </Helmet>
            <Flex justifyContent='center' alignItems='center' py={16} px={5} bgGradient="linear(to-r, , #24adf3, #29deb7)" bgSize='cover' position='relative'>
                <Box position='absolute' w="100%" h="100%" bgColor='blackAlpha.100'></Box>
                <VStack color='white' zIndex={20}>
                    <Text fontSize={{ base:"3xl",sm:"4xl", md:"5xl" }} fontFamily='Jost' fontWeight='1000' letterSpacing={2}>Technologies</Text>
                    <Text fontSize={{ base:"sm", md:"md" }}>Every tool used to develop this project.</Text>
                </VStack>
            </Flex>
        </Box>
        
        
    )
}

export default Technologies