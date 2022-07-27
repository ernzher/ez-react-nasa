import axios from "axios";
import {
  convertToFoot,
  convertToPounds,
  processString,
  toCapitalCase,
} from "../utils/helper";

export const fetchPokemons = async (offset: number) => {
  try {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
    );
    return data;
  } catch (error) {
    return null;
  }
};

export const fetchPokemonsFromQuery = async (
  query: string,
  pageNumber: number
) => {
  try {
    const { data } = await axios.get(
      `/pokemons/search?name=${query}&page=${pageNumber}&pageSize=20`
    );
    return data;
  } catch (error) {
    return null;
  }
};

export const fetchBattleConditionData = async (typeList: string[]) => {
  try {
    let result: any = {
      double_damage_from: [],
      double_damage_to: [],
    };
    for (const type of typeList) {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/type/${type}`
      );
      result = {
        double_damage_from: [
          ...result.double_damage_from,
          ...data.damage_relations.double_damage_from.map(
            (type: any) => type.name
          ),
        ],
        double_damage_to: [
          ...result.double_damage_to,
          ...data.damage_relations.double_damage_to.map(
            (type: any) => type.name
          ),
        ],
      };
    }
    Object.keys(result).forEach((key) => {
      result[key] = [...new Set(result[key])];
    });
    return result;
  } catch (error) {
    return null;
  }
};

export const getPokemonData = async (idOrName: any) => {
  try {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${idOrName}`
    );
    return {
      id: data.id,
      name: toCapitalCase(data.name),
      gender: data.name.includes("-f")
        ? "f"
        : data.name.includes("-m")
        ? "m"
        : null,
      height: {
        m: data.height / 10,
        foot: convertToFoot(data.height / 10),
      },
      weight: {
        kg: data.weight / 10,
        lbs: convertToPounds(data.weight / 10),
      },
      img:
        data.sprites.other.dream_world.front_default ||
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
      types: data.types.map((type: any) => type.type.name),
      abilities: data.abilities.map((ability: any) =>
        toCapitalCase(processString(ability.ability.name))
      ),
      stats: data.stats.map((stat: any) => {
        return {
          stat_name: stat.stat.name,
          base_stat: stat.base_stat,
        };
      }),
      moves: data.moves.map((move: any) =>
        toCapitalCase(processString(move.move.name))
      ),
    };
  } catch (error) {
    return null;
  }
};

const getEvolutionChain = async (url: string) => {
  let result: any[] = [];
  let order = 1;
  const { data } = await axios.get(url);
  let evoData: any[] = [data.chain];
  let pokemonData;
  do {
    if (evoData.length > 1) {
      let evolutions: any[] = [];
      for (const data of evoData) {
        pokemonData = await getPokemonData(data.species.name);
        pokemonData &&
          evolutions.push({
            order: order,
            id: pokemonData.id,
            name: pokemonData.name,
            img: pokemonData.img,
            gender: pokemonData.gender,
          });
      }
      result.push(evolutions);
    } else {
      pokemonData = await getPokemonData(evoData[0].species.name);
      pokemonData &&
        result.push({
          order: order,
          id: pokemonData.id,
          name: pokemonData.name,
          img: pokemonData.img,
          gender: pokemonData.gender,
        });
    }
    evoData = evoData[0].evolves_to;
    order++;
  } while (evoData.length);
  return result;
};

export const getPokemonDetailData = async (idOrName: any) => {
  const pokemonData = await getPokemonData(idOrName);
  if (pokemonData) {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${idOrName}`
    );
    const evolutionChain = await getEvolutionChain(data.evolution_chain.url);
    const battleConditionData = await fetchBattleConditionData(
      pokemonData.types
    );
    return {
      ...pokemonData,
      prevAndNext: {
        prev_id: pokemonData.id - 1,
        next_id: pokemonData.id + 1,
      },
      species_name: data.genera.find(
        (genus: any) => genus.language.name === "en"
      ).genus,
      egg_groups: data.egg_groups.map((egg_group: any) =>
        toCapitalCase(egg_group.name)
      ),
      habitat: data.habitat ? toCapitalCase(data.habitat.name) : "Unknown",
      growth_rate: toCapitalCase(processString(data.growth_rate.name)),
      description: processString(
        data.flavor_text_entries.find(
          (flavor_text_entry: any) => flavor_text_entry.language.name === "en"
        ).flavor_text
      ),
      battle_condition: battleConditionData,
      evolution_chain: evolutionChain,
    };
  }
  return null;
};
