import { Request, Response } from "express";
import { ResponseStatus, response } from "../../../utils/responseWrapper";

import { PokemonFavoriteModel } from "../../../db/models/PokemonFavorite";
import assertIsError from "../../../utils/fn/assertError";
import { getIsPrime } from "../../../utils/fn/primeNumber";
import findOnePokemon from "../utils/findOnePokemon";

type Payload = {
  nickname: string;
  pokemon_name: string;
};

export async function releasePokemon(
  req: Request<null, null, Payload>,
  res: Response
) {
  const {
    body: { nickname, pokemon_name },
  } = req;

  try {
    if (!pokemon_name) throw { message: "nama pokemon wajib diisi" };

    const find = await findOnePokemon({ pokemon_name });

    if (!find) throw { message: `${pokemon_name} tidak ditemukan` };

    const randomNum = Math.floor(Math.random() * (Math.floor(1000) + 1));

    if (!getIsPrime(randomNum)) {
      throw { message: `Maaf gagal melepas ${pokemon_name}` };
    }

    await find.deleteOne();

    return res.json(
      response(ResponseStatus.Success, `${find?.nickname} berhasil dilepas`)
    );
  } catch (err) {
    assertIsError(err);

    return res.json(
      response(ResponseStatus.Error, (err?.message || "") as string)
    );
  }
}
