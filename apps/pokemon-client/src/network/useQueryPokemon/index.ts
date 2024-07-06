import { pokemon_client } from "../pokemon.client";
import { QUERY_KEY } from "../network.util";
import request from "../network.config";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Method } from "axios";

export enum ResponseStatus {
  Error,
  Success,
}
type PokemonBaseResponse = {
  status: ResponseStatus;
  message: string;
};

type PokemonResponse = {
  _id: string;
  pokemon_name: string;
  nickname: string;
  iteration: number;
};

type Params = {
  search: string;
  offset: number;
  limit: number;
  pokemon_name: string;
};

export function useGetListPokemons({ page = 1, perPage = 10 }) {
  return useQuery({
    queryKey: [QUERY_KEY.LIST_POKEMONS, page],
    queryFn: () => pokemon_client.listPokemons(page * perPage, perPage),
  });
}

export function useGetPokemonDetail(name: string) {
  return useQuery({
    queryKey: [QUERY_KEY.DETAIL_POKEMONS, name],
    queryFn: () => pokemon_client.getPokemonByName(name),
    enabled: !!name,
  });
}

type PokemonQueryResult<T> = T extends { pokemon_name: string | undefined }
  ? PokemonResponse
  : PokemonResponse[];

export function useGetPokemonFavorite<T extends Partial<Params>>(params: T) {
  return useQuery({
    queryKey: [QUERY_KEY.POKEMON_FAVORITE_LIST, params],
    queryFn: () =>
      request<PokemonQueryResult<T>>({
        method: "GET",
        params,
        url: "pokemon",
      }),
  });
}

type Payload = { id: string; nickname: string; pokemon_name: string };
export function useActionPokemonFavorite() {
  return useMutation({
    mutationFn: ({
      data,
      method,
    }: Partial<{ data: Partial<Payload>; method: Method }>) =>
      request<PokemonBaseResponse>({ data, method, url: "pokemon" }),
  });
}
