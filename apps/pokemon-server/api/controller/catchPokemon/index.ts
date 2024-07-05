import { Request, Response } from "express";
import { PokemonFavoriteModel } from "../../../db/models/PokemonFavorite";
import { ResponseStatus, response } from "../../../utils/responseWrapper";
import assertIsError from "../../../utils/fn/assertError";
import findOnePokemon from "../utils/findOnePokemon";

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

  try {
    if (!pokemon_name) {
      throw { message: `pokemon ${pokemon_name} tidak ditemukan` };
    }

    const find = await findOnePokemon({
      pokemon_name: pokemon_name,
    });

    const isCatched = find?.pokemon_name;

    if (find?.nickname) {
      throw {
        message: `${pokemon_name} sudah ada di kantongmu sebagai ${find?.nickname}`,
      };
    }

    if (isCatched && !find?.nickname) {
      throw {
        message: `${find?.pokemon_name} sudah tertangkap loh, yuk beri nama`,
      };
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

    throw { message: `gagal menangkap ${pokemon_name} silahkan coba lagi` };
  } catch (err) {
    assertIsError(err);

    return res.json(response(ResponseStatus.Error, err?.message));
  }
}
