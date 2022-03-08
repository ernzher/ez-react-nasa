import React from 'react'
import { Box } from '@chakra-ui/react'
import  { useState, useEffect } from 'react'

interface Props {
    bgGradient?: string,
    maxVal?: number, 
    minVal: number
}

const LevelBar: React.FC<Props> = ({bgGradient, maxVal, minVal}) => {

    //if maxVal not set, means minVal already input as %
    const [innerBarPercentage, setInnerBarPercentage ] = useState(minVal)

    useEffect(() => {
        //if set maxVal then calculate percentage 
        maxVal && setInnerBarPercentage((minVal/maxVal) * 100)
    }, [])
    
    return (
        <Box position='relative' h={3} bgColor="blackAlpha.400" w="100%" borderRadius={30} >
            <Box position='absolute' top={0} bottom={0} left={0} bgGradient={bgGradient || "linear(to-r, , #24adf3, #29deb7)"} borderRadius={30} width={`${innerBarPercentage}%`}  />
        </Box>
    )
}

export default LevelBar