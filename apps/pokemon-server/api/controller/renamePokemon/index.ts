import { Request, Response } from "express";
import { ResponseStatus, response } from "../../../utils/responseWrapper";
import { PokemonFavoriteModel } from "../../../db/models/PokemonFavorite";
type Payload = {
  pokemon_name: string;
  nickname: string;
};

export async function renamePokemon(
  req: Request<null, null, Payload>,
  res: Response
) {
  const {
    body: { pokemon_name, nickname },
  } = req;

  if (!pokemon_name || !nickname) {
    return res.json(
      response(
        ResponseStatus.Error,
        `${!nickname ? "panggilan " : `nama`} pokemon wajib diisi`
      )
    );
  }

  try {
    const find = await PokemonFavoriteModel.findOneAndUpdate(
      { pokemon_name },
      { nickname, $inc: { iteration: 1 } }
    );

    if (!find) throw Error;
  } catch (err) {}
}
