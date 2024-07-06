import { NextFunction, Request, Response } from "express";
import { PokemonFavoriteModel } from "../../../db/models/PokemonFavorite";
import { response } from "../../../utils/responseWrapper";
import getPagination from "../utils/getPagination";

type Pagination = {
  offset: string;
  limit: string;
  search: string;
};

export async function getFavoritePokemon(
  req: Request<null, null, null, Pagination>,
  res: Response
) {
  const {
    query: { offset, limit, search },
  } = req;

  const dbQuery = { $regex: search, $options: "i" };

  const data = await PokemonFavoriteModel.find(
    search
      ? {
          $or: [{ nickname: dbQuery }, { pokemon_name: dbQuery }],
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
