import { Request, Response } from "express";
import { ResponseStatus, response } from "../../../utils/responseWrapper";

import assertIsError from "../../../utils/fn/assertError";
import { getIsPrime } from "../../../utils/fn/primeNumber";
import { findPokemonById } from "../utils/findOnePokemon";

type Payload = {
  id: string;
};

export async function releasePokemon(
  req: Request<null, null, Payload>,
  res: Response
) {
  const {
    body: { id },
  } = req;

  try {
    if (!id) throw { message: "id pokemon wajib diisi" };

    const data = await findPokemonById(id);

    // case not found a pokemon
    if (!data) throw { message: `pokemon tidak ditemukan` };

    // case found and try delete one
    const randomNum = Math.floor(Math.random() * (Math.floor(1000) + 1));

    if (!getIsPrime(randomNum)) {
      throw { message: `Maaf gagal melepas ${data?.nickname}` };
    }

    await data.deleteOne();

    return res.json(
      response(ResponseStatus.Success, `${data?.nickname} berhasil dilepas`)
    );
  } catch (err) {
    assertIsError(err);

    return res.json(
      response(ResponseStatus.Error, (err?.message || "") as string)
    );
  }
}
