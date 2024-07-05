import { Request, Response } from "express";
import { PokemonFavoriteModel } from "../../../db/models/PokemonFavorite";

export async function getFavoritePokemon(req: Request, res: Response) {
  const list = await PokemonFavoriteModel.find();
  return res.json(list);
}
