import { FilterQuery } from "mongoose";
import { PokemonFavoriteModel } from "../../../../db/models/PokemonFavorite";

export async function findPokemon(
  filter: FilterQuery<{
    nickname?: string | null | undefined;
    pokemon_name?: string | null | undefined;
    iteration?: number | null | undefined;
  }>
) {
  const find = await PokemonFavoriteModel.findOne();

  return find;
}
