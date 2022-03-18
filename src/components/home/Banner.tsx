import React from 'react'
import { 
    Box,
    Image,
    Flex,
    Stack,
    VStack,
    Text,
    useColorModeValue,
    Button,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

// interface Props {
//     scrollToSearch: () => void
// }

const Banner = () => {
    const opacity = useColorModeValue("0.5", "0.3")
    const bg_gradient = useColorModeValue("linear(to-tl, #E7FFFC , transparent 60%)", "linear(to-tl, #1B2C37 , transparent 60%)")
    return (
        <Box position="relative" bgGradient={bg_gradient} py={{ base:5, md:20 }}>
            <Image 
                position='absolute'
                src='assets\images\circuit_x.png' 
                w={{ base:"90%", md:"45%" }}
                transform='rotate(180deg)'
                top={{ base:20, md:5 }}
                right={0}
                maxH={{ base:"30%", md:"60%" }}
                opacity={opacity} 
            />
            <Image 
                position='absolute'
                src='assets\images\circuit_x.png' 
                w={{ base:"90%", md:"45%" }}
                bottom={{ base:20, md:5 }}
                left={0}
                maxH={{ base:"30%", md:"60%" }}
                opacity={opacity} 
            />
            <Stack 
                direction={{ base:"column-reverse", md:"row" }} 
                mx={{ base:10, md:20 }} 
                spacing={{ base:10, md:0 }}
                py={10}
                zIndex={10}
            >
                <Flex w={{ base:"100%", md:"50%" }} justifyContent='center' alignItems='center'>
                    <VStack alignItems="left" textAlign={{ base:"center", md: "left" }} spacing={5} lineHeight={{ base:1.2, md:1.4 }}>
                        <Text color='brand.100' fontFamily='Jost' fontSize={{ base:"lg", md:"xl" }} >THE POKÉMON LAB</Text>
                        <Text fontSize={{ base:"3xl",sm:"4xl", md:"5xl" }} fontFamily='Jost' fontWeight='1000' letterSpacing={2}>A Pokémon Wikipedia <br/>for Minimalists</Text>
                        <Text fontSize={{ base:"sm", md:"md" }} >Look up your favorite pokémons and everything you want to know about them.</Text>
                        <Flex justifyContent={{ base:"center", md:"left" }} alignItems='center'>
                            <Link to="/pokemons">
                                <Button w="40" variant="pri_gradient">Explore now</Button>
                            </Link>
                        </Flex>
                    </VStack>
                </Flex>
                <Flex w={{ base:"100%", md:"50%" }} justifyContent='center' alignItems='center'>
                    <Image 
                        src="assets\images\pokeball.png" 
                        maxW={[150, 200, 250, 300 ]}  
                        opacity={0.7}
                        filter="brightness(1.3)"    
                    />
                </Flex>
            </Stack>
            
        </Box>
    )
}

export default Banner