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
				<HStack spacing={{ md: 8, lg: 20}} letterSpacing={1.1}>
					<Link href="/" _hover={{ color:"brand.100", transform: "scale(1.1)"}}>Home</Link>
					<Link href="/" _hover={{ color:"brand.100", transform: "scale(1.1)"}}>Technologies</Link>
				</HStack>
			</Flex>
		</Box>
	)
}

export default MenuLink