import React from 'react'
import { Box, Button } from '@chakra-ui/react'
import { ArrowUpIcon } from '@chakra-ui/icons'
import { useState, useEffect, useCallback } from 'react'

type ScrollToButtonProps = {
    scrollToFunction: () => void
}
const ScrollToButton = ({ scrollToFunction }: ScrollToButtonProps) => {
    const [y, setY] = useState(window.scrollY);
    const [currentState, setCurrentState] = useState(true) //scrolling up: true; scrolling down: false

    const handleNavigation = useCallback(e => {
        const window = e.currentTarget;
        if (y > window.scrollY) {
            setCurrentState(true)
        } else if (y < window.scrollY) {
            setCurrentState(false)
        }
        setY(window.scrollY);
    }, [y]
    );

    useEffect(() => {
        setY(window.scrollY);
        window.addEventListener("scroll", handleNavigation);
        return () => {
            window.removeEventListener("scroll", handleNavigation);
        };
    }, [handleNavigation]);

    return (
        <Box position='fixed' bottom={10} right={currentState ? -40 : 0} transition="all 1.2s">
            <Button position="relative" onClick={scrollToFunction} w={16} size="lg" variant="pri_gradient" borderStartRadius={10} borderEndRadius={0} >
                <ArrowUpIcon fontSize={{base: 'xl', md: '2xl'}} color="gray.800"/>
            </Button>
        </Box>
    )
}

export default ScrollToButton