import { useQuery } from "react-query";
import { pokemon_client } from "../pokemon.client";
import { QUERY_KEY } from "../network.util";

export default function useGetListPokemons({ page, perPage = 10 }) {
  return useQuery([QUERY_KEY.LIST_POKEMONS, page], () =>
    pokemon_client.listPokemons(page * perPage, perPage)
  );
}
