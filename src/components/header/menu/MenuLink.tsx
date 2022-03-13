import React from 'react'
import { 
	Flex,
	HStack,
	Link,
	Box
} from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'

const MenuLink = () => {
	const route = useLocation();

  	return (
		<Box display={{ base: 'none', md: 'flex'}} justifyContent='center'>
			<Flex justifyContent='center' alignItems='center'>
				<HStack spacing={{ md: 8, lg: 20}} letterSpacing={1.1} >
					<Link 
						href="/" 
						_hover={{ color:"brand.100"}} 
						transition="all 0.6s"
						color={route.pathname === '/' ? "brand.100" : ""}
					>Home</Link>
					<Link 
						href="/technologies" 
						_hover={{ color:"brand.100"}}
						transition="all 0.6s"
						color={route.pathname === '/technologies' ? "brand.100" : ""}
					>Technologies</Link>
				</HStack>
			</Flex>
		</Box>
	)
}

export default MenuLink