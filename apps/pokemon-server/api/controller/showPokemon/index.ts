import { NextFunction, Request, Response } from "express";
import { PokemonFavoriteModel } from "../../../db/models/PokemonFavorite";
import { response } from "../../../utils/responseWrapper";
import getPagination from "../utils/getPagination";

type Query = {
  offset: string;
  limit: string;
  search: string;
  pokemon_name: string;
};

export async function getFavoritePokemon(
  req: Request<null, null, null, Query>,
  res: Response
) {
  const {
    query: { offset, limit, search, pokemon_name },
  } = req;

  const searchQuery = { $regex: search, $options: "i" };

  if (!pokemon_name) {
    const data = await PokemonFavoriteModel.find(
      search
        ? {
            $or: [{ nickname: searchQuery }, { pokemon_name: searchQuery }],
          }
        : {}
    )
      ?.limit(parseInt(limit) || 100)
      .skip(parseInt(offset));

    const pagination = getPagination(
      req,
      await PokemonFavoriteModel.countDocuments()
    );

    return res.json(response(data, pagination));
  }

  const data = await PokemonFavoriteModel.findOne({ pokemon_name });

  return res.json(response(data));
}
