import React from 'react'
import { Box, Text } from '@chakra-ui/react'

interface Props {
    type: string,
}

const TypeBadge = ({type}: Props) => {
    return (
        <Box 
            px={1}  
            w={[10, 12, 14, 16]} 
            bgColor={`type.${type}`} 
            textAlign="center" 
            borderRadius={5}
        >
            <Text color="black" fontSize={[ 'x-small', 'xs','sm' ]}>{type}</Text>
        </Box>
    )
}

export default TypeBadge