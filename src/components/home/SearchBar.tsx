import React from 'react'
import { 
	Button,
	Flex,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightAddon 
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useState } from 'react'

interface Props {
	searchPokemon: (query: string) => void
}

interface State {
	query: string
}

const SearchBar: React.FC<Props> = ({ searchPokemon }) => {
	 
	const [query, setQuery] = useState<State["query"]>('')

	const handleChange = (e: any) => setQuery(e.target.value)

  	return (
		<Flex justifyContent='center' alignItems='center'>
			<InputGroup size='md'>
				<InputLeftElement
					pointerEvents='none'
					children={<SearchIcon color='gray.500' />}
				/>
				<Input type='text' value={query} onChange={handleChange} focusBorderColor="brand.200" placeholder='Type anything about your pokémon here!' />
				<InputRightAddon
					p={0}
					children={
						<Button 
							onClick={() => searchPokemon(query)} 
							borderStartRadius={0} 
							borderEndRadius={5} 
							w="100%" 
							variant="snd_gradient">
							Search
						</Button>
					}
				/>
			</InputGroup>

		</Flex>
	)
}

export default SearchBar