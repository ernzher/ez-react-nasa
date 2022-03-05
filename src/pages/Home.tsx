import React from 'react'
import { 
    Box,
    Image,
    Flex,
    Stack,
    VStack,
    Text,
    useColorModeValue,
    Button
} from '@chakra-ui/react'
import Banner from '../components/home/Banner'

const Home = () => {
   
    return (
       <Box position="relative">
           <Banner />
        </Box>
    )
}

export default Home