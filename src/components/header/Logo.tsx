import React from 'react'
import { 
    HStack,
    Image,
    Text,
    Link
} from '@chakra-ui/react'

const Logo = () => {
    return (
        <Link href='/'>
            <HStack spacing={3}>
                <Image
                    boxSize='32px'
                    objectFit='cover'
                    src='assets/images/pokeball.png'
                    alt='Logo'
                />
                <Text fontFamily='Roboto Mono' fontWeight='light' fontSize='2xl'>POKÉDEX</Text>
            </HStack>
        </Link>
    )
}

export default Logo