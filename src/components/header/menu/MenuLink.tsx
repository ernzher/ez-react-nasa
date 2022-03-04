import React from 'react'
import { 
	Flex,
	HStack,
	Link,
	Box
} from '@chakra-ui/react'

const MenuLink = () => {
  	return (
		<Box display={{ base: 'none', md: 'flex'}} justifyContent='center'>
			<Flex justifyContent='center' alignItems='center'>
				<HStack spacing={8}>
					<Link href="/" _hover={{ color:"brand.100" }}>Home</Link>
					<Link href="/" _hover={{ color:"brand.100" }}>Technologies</Link>
					<Link href="/" _hover={{ color:"brand.100" }}>Projects</Link>
				</HStack>
			</Flex>
		</Box>
	)
}

export default MenuLink