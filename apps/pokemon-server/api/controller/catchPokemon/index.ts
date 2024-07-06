import { Request, Response } from "express";
import { PokemonFavoriteModel } from "../../../db/models/PokemonFavorite";
import { ResponseStatus, response } from "../../../utils/responseWrapper";
import assertIsError from "../../../utils/fn/assertError";
import { findOnePokemon } from "../utils/findOnePokemon";

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
      throw { message: "nama pokemon wajib diisi" };
    }

    const data = await findOnePokemon({
      pokemon_name: pokemon_name,
    });

    if (!data) {
      // case not catched try to catch by 0.5 prob
      const catched = Math.random() > 0.5;

      if (catched) {
        const newPokemon = new PokemonFavoriteModel({
          iteration: 0,
          pokemon_name,
        });

        await newPokemon.save();

        return res.json(
          response(
            ResponseStatus.Success,
            `${pokemon_name} berhasil ditangkap, yuk beri nama`
          )
        );
      }

      throw { message: `gagal menangkap ${pokemon_name} silahkan coba lagi` };
    }

    // case already catched
    // case has a pokemon_name mean already catched
    if (!data?.nickname) {
      throw {
        message: `${data?.pokemon_name} sudah tertangkap loh, yuk beri nama`,
      };
    }

    // case has a nickname mean already catched and be named
    if (data?.nickname) {
      throw {
        message: `${pokemon_name} sudah ada di kantongmu sebagai ${data?.nickname}`,
      };
    }
  } catch (err) {
    assertIsError(err);

    return res.json(response(ResponseStatus.Error, err?.message));
  }
}
