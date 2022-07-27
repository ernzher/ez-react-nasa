import React from "react";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

type MenuToggleProps = {
  toggle: () => void;
  isOpen: boolean;
};

const MenuToggle = ({ toggle, isOpen }: MenuToggleProps) => {
  const route = useLocation();

  return (
    <Box display={{ base: "block", md: "none" }} zIndex={20}>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant="ghost"
          onClick={toggle}
          _focus={{ boxShadow: "none" }}
        />
        <MenuList>
          <Link to="/" onClick={toggle}>
            <MenuItem
              _focus={{ boxShadow: "none" }}
              color={route.pathname === "/" ? "brand.100" : ""}
            >
              Home
            </MenuItem>
          </Link>
          <Link to="/pokemons" onClick={toggle}>
            <MenuItem
              _focus={{ boxShadow: "none" }}
              color={route.pathname === "/pokemons" ? "brand.100" : ""}
            >
              Pokemons
            </MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default MenuToggle;
