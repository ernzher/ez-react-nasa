import React from 'react'
import { 
	Box,
	Button,
	Flex,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightAddon,
} from '@chakra-ui/react'
import { SearchIcon, CloseIcon } from '@chakra-ui/icons'
import { useState } from 'react'

interface Props {
	searchPokemon: (query: string) => void,
	isSearching: boolean
}

interface State {
	query: string
}

const SearchBar: React.FC<Props> = ({ searchPokemon, isSearching }) => {
	 
	const [query, setQuery] = useState<State["query"]>('')

	const handleChange = (e: any) => setQuery(e.target.value)

  	return (
		<Flex justifyContent='center' alignItems='center'>
			<InputGroup size='md'>
				<InputLeftElement
					pointerEvents='none'
					children={<SearchIcon color='gray.500' />}
				/>
				<Input type='text' value={query} onChange={handleChange} focusBorderColor="brand.200" placeholder='Enter a pokémon ID or name here!' />				
				<InputRightAddon
					p={0}
					children={
						<Box position='relative'> 
							{
								query && 
								<CloseIcon 
									color='red.500' 
									fontSize='sm' 
									position='absolute' 
									left={-7} 
									top="50%" 
									transform="translateY(-50%)" 
									cursor='pointer' 
									zIndex={10} 
									onClick={ () => setQuery("") }
								/>
							} 
							<Button  
								onClick={() => searchPokemon(query)} 
								borderStartRadius={0} 
								borderEndRadius={5} 
								w="100%" 
								isLoading={isSearching && query.length > 0}
								loadingText='Searching'
								variant="snd_gradient"
							>
								Search
							</Button>
						</Box>
					}
				/>
			</InputGroup>

		</Flex>
	)
}

export default SearchBar