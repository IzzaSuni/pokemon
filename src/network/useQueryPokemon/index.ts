import { useQuery } from "react-query";
import { pokemon_client } from "../pokemon.client";
import { QUERY_KEY } from "../network.util";

export function useGetListPokemons({ page = 1, perPage = 10 }) {
  return useQuery([QUERY_KEY.LIST_POKEMONS, page], () =>
    pokemon_client.listPokemons(page, perPage)
  );
}

export function useGetPokemonDetail(name: string) {
  return useQuery(
    [QUERY_KEY.DETAIL_POKEMONS, name],
    () => pokemon_client.getPokemonByName(name),
    { enabled: !!name }
  );
}
