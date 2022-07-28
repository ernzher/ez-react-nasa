import React from "react";
import { Flex, HStack, Box, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { ArrowBackIcon, ArrowLeftIcon } from "@chakra-ui/icons";

const MenuLink = () => {
  const route = useLocation();

  return (
    <Box display={{ base: "none", md: "flex" }} justifyContent="center">
      <Flex justifyContent="center" alignItems="center">
        {route.pathname === "/" || route.pathname === "/pokemons" ? (
          <HStack spacing={{ md: 8, lg: 20 }} letterSpacing={1.1}>
            <Link to="/" color={route.pathname === "/" ? "brand.100" : ""}>
              <Text
                _hover={{ color: "brand.100" }}
                color={route.pathname === "/" ? "brand.100" : ""}
              >
                Home
              </Text>
            </Link>
            <Link to="/pokemons">
              <Text
                _hover={{ color: "brand.100" }}
                color={route.pathname === "/pokemons" ? "brand.100" : ""}
              >
                Pokemons
              </Text>
            </Link>
          </HStack>
        ) : (
          <Link to="/pokemons">
            <Flex
              gap={2}
              justifyContent="center"
              alignItems="center"
              _hover={{ color: "brand.100" }}
            >
              <ArrowBackIcon
                fontSize="lg"
                color="white.800"
              />
              <Text letterSpacing={1}>
                Back
              </Text>
            </Flex>
          </Link>
        )}
      </Flex>
    </Box>
  );
};

export default MenuLink;
