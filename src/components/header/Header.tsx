import React from 'react'
import { useState } from 'react'
import { 
    Box,
    SimpleGrid,
    Flex,
    useColorModeValue
} from '@chakra-ui/react'
import MenuLink from './menu/MenuLink'
import MenuToggle from './menu/MenuToggle'
import Logo from './Logo'
import { ColorModeSwitcher } from './ColorModeSwitcher'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const box_shadow = useColorModeValue('sm', '')
    const opacity = useColorModeValue('90%', '100%')

    const toggle = () => setIsOpen(!isOpen)
    
    return (
        <Box position='fixed' left={0} right={0} top={0} boxShadow={box_shadow} opacity={opacity}>
            {/* overlay */}
            <Box    
                position='absolute' 
                left={0} 
                right={0} 
                top={0} 
                bottom={0} 
                w='100vw'
                h='100vh'
                display={isOpen ? 'block' : 'none'}
                opacity={0}
                zIndex={10}
                onClick={toggle}
            ></Box>
            <SimpleGrid columns={{ base:2, md: 3 }} mx={{base: 5, md: 20}} py={5}>
                <Logo />
                <MenuLink />
                <Flex justifyContent='right' alignItems='center'>
                    <MenuToggle toggle={toggle} isOpen={isOpen} />
                    <ColorModeSwitcher  />
                </Flex>
            </SimpleGrid>
        </Box>
    )
}

export default Header