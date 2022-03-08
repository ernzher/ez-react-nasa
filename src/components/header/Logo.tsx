import React from 'react'
import { 
    HStack,
    Image,
    Text,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Logo = () => {
    return (
        <Link to='/'>
            <HStack spacing={3}>
                <Image
                    width={8}
                    src="/assets/icons/logo.png"
                />
                <Text fontFamily='Roboto Mono' fontWeight='light' fontSize='2xl'>POKÉDEX</Text>
            </HStack>
        </Link>
    )
}

export default Logo