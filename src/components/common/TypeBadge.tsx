import React from 'react'
import { Box, Text } from '@chakra-ui/react'

interface Props {
    type: string,
}

const TypeBadge: React.FC<Props> = ({type}) => {
    const font_color = (type: string): string => {
        switch(type) {
            case 'grass': 
            case 'psychic': 
            case 'electric': 
            case 'poison': 
            case 'fire': 
            case 'ice': 
            case 'flying': 
            case 'fairy': 
            case 'steel': return 'black';
            default: return 'white';
        } 
    }
    return (
        <Box 
            px={1}  
            w={[10, 12, 14, 16]} 
            bgColor={`type.${type}`} 
            textAlign="center" 
            borderRadius={5}
        >
            <Text color={font_color(type)} fontSize={[ 'x-small', 'xs','sm' ]}>{type}</Text>
        </Box>
    )
}

export default TypeBadge