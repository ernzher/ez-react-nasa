import React from 'react'
import { 
    Box,
} from '@chakra-ui/react'
import Banner from '../components/home/Banner'
import PokeList from '../components/home/PokeList'

const Home = () => {
   
    return (
       <Box position="relative">
           <Banner />
           <PokeList />
        </Box>
    )
}

export default Home