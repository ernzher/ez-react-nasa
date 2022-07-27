import React from 'react'
import { 
    SimpleGrid,
    Flex,
    UnorderedList,
    ListItem,
    useBreakpointValue,
    Center
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { pokemonDetailsState } from '../../atoms/pokemonDetails';

const Moves = () => {
    const chunkNum = useBreakpointValue([2, 3, 4, 5, 6])
    const [moveLists, setMoveLists] = useState<string[][]>() 
    const pokemon = useRecoilValue(pokemonDetailsState) as any;

    useEffect(() => {
        let chunkedList = []
        let chunkSize = chunkNum ? Math.ceil(pokemon.moves.length / chunkNum) : pokemon.moves.length
        for (let i = 0; i < pokemon.moves.length; i += chunkSize) 
            chunkedList.push(pokemon.moves.slice(i, i+chunkSize))
        setMoveLists(chunkedList)
    }, [pokemon, chunkNum])

    return (
        <Flex justifyContent='center' alignItems='center'>
            <Center >
                <SimpleGrid columns={chunkNum} spacing={10}>
                    {   
                        moveLists && moveLists.map((moveList, index) => (
                            <UnorderedList key={index}>
                                {
                                    moveList.map((move, idx) => (
                                        <ListItem fontSize={['xs', 'sm', 'md', 'lg']} key={idx}>{move}</ListItem>
                                    ))
                                }
                            
                            </UnorderedList>
                        ))
                    }
                </SimpleGrid>
            </Center>
        </Flex>
        
    )
}

export default Moves