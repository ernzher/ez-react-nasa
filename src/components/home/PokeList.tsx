import React from "react";
import {
  Box,
  SimpleGrid,
  Spinner,
  Flex,
  Text,
  Image,
  VStack,
} from "@chakra-ui/react";
import PokeCard from "./PokeCard";
import CustomDivider from "../common/CustomDivider";
import SearchBar from "./SearchBar";
import { useRecoilValue } from "recoil";
import { loadingState, pokemonListState } from "../../atoms/pokemons";

type PokeListProps = {
  lastPokemonElementRef: (node: any) => void;
  searchPokemon: (query: string) => void;
  clearData: () => void;
};

const PokeList = ({
  lastPokemonElementRef,
  searchPokemon,
  clearData,
}: PokeListProps) => {
  
  const pokemons = useRecoilValue(pokemonListState);
  const loading = useRecoilValue(loadingState);

  return (
    <Box mx={[3, 10, 15, 20]} py={10} position="relative">
      <SimpleGrid columns={{ base: 1, md: 2 }} mx={5} spacing={5} pb={5}>
        <Box
          textAlign={{ base: "center", md: "left" }}
          cursor="pointer"
          onClick={() => {
            searchPokemon("");
            clearData();
          }}
          fontFamily="Roboto"
        >
          <Text color="brand.100" fontSize={{ base: "md", md: "lg" }}>
            POKÉMONS
          </Text>
          <Text
            fontSize={{ base: "2xl", sm: "4xl" }}
            fontWeight="1000"
            letterSpacing={2}
          >
            Welcome To The Pokédex
          </Text>
        </Box>
        <SearchBar searchPokemon={searchPokemon} clearData={clearData} />
      </SimpleGrid>
      <CustomDivider />
      {pokemons.length ? (
        <SimpleGrid
          columns={[2, 2, 3, 4, 5, 6]}
          alignItems="center"
          spacing={2}
          pt={5}
        >
          {pokemons.map((pokemon, index: number) => {
            if (pokemon.img) {
              if (pokemons.length === index + 1) {
                return (
                  <div key={index} ref={lastPokemonElementRef}>
                    <PokeCard pokemon={pokemon} />
                  </div>
                );
              }
              return <PokeCard key={index} pokemon={pokemon} />;
            }
          })}
        </SimpleGrid>
      ) : (
        !loading && (
          <VStack py={5}>
            <Flex justifyContent="center">
              <Image
                src="assets/images/sad_pikachu.png"
                width={{ base: 100, md: 150 }}
              />
            </Flex>
            <Text fontSize={{ base: "md", md: "lg" }}>No pokémons found!</Text>
          </VStack>
        )
      )}
      {loading && (
        <Flex justifyContent="center" alignItems="center" mt={10}>
          <Spinner size="lg" />
        </Flex>
      )}
    </Box>
  );
};

export default PokeList;
