import { Request, Response } from "express";
import { PokemonFavoriteModel } from "../../../db/models/PokemonFavorite";
import { ResponseStatus, response } from "../../../utils/responseWrapper";
import { findPokemon } from "../utils/findOnePokemon";

type Payload = {
  pokemon_name: string;
};

export async function catchPokemon(
  req: Request<null, null, Payload>,
  res: Response
) {
  const {
    body: { pokemon_name },
  } = req;

  if (!pokemon_name) {
    return res.json(
      response(ResponseStatus.Error, `pokemon ${pokemon_name} tidak ditemukan`)
    );
  }

  const find = await findPokemon({ pokemon_name: pokemon_name });

  const isCatched = find?.pokemon_name;

  if (find?.nickname) {
    return res.json(
      response(
        ResponseStatus.Error,
        `${pokemon_name} sudah ada di kantongmu sebagai ${find?.nickname}`,
        find
      )
    );
  }

  if (isCatched && !find?.nickname) {
    return res.json(
      response(
        ResponseStatus.Success,
        `${find?.pokemon_name} sudah tertangkap loh, yuk beri nama`,
        find
      )
    );
  }

  const catched = Math.random() > 0.5;

  if (catched) {
    const newPokemon = new PokemonFavoriteModel({
      iteration: 0,
      pokemon_name,
    });

    newPokemon.save();

    return res.json(
      response(
        ResponseStatus.Success,
        `${pokemon_name} berhasil ditangkap, yuk beri nama`
      )
    );
  }
}

export function renamePokemon(req: Request, res: Response) {
  const { body } = req;
}

export async function getFavoritePokemon(req: Request, res: Response) {
  const list = await PokemonFavoriteModel.find();
  return res.json(list);
}
