import React from 'react'
import { 
	IconButton,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Box
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'

interface Props {
	toggle: () => void, 
	isOpen: boolean
}

const MenuToggle: React.FC<Props> = ({ toggle, isOpen }) => {
	return (
		<Box display={{ base: 'block', md: 'none'}} zIndex={20}>
			<Menu>
				<MenuButton
					as={IconButton}
					aria-label='Options'
					icon={isOpen ? <CloseIcon /> : <HamburgerIcon /> }
					variant='ghost'
					onClick={toggle}
					_focus={{ boxShadow:"none" }}
				/>
				<MenuList>
					<MenuItem fontWeight="bold">
						Home
					</MenuItem>
					<MenuItem  fontWeight="bold">
						Technologies
					</MenuItem>
					<MenuItem  fontWeight="bold">
						Projects
					</MenuItem>
				</MenuList>
			</Menu>
		</Box>
	)
}


export default MenuToggle