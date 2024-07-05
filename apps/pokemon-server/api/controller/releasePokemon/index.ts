import { Request, Response } from "express";
import { ResponseStatus, response } from "../../../utils/responseWrapper";

import { PokemonFavoriteModel } from "../../../db/models/PokemonFavorite";
import assertIsError from "../../../utils/fn/assertError";

type Payload = {
  nickname: string;
};

export async function releasePokemon(
  req: Request<null, null, Payload>,
  res: Response
) {
  const {
    body: { nickname },
  } = req;

  try {
    if (!nickname) throw { message: "nickname wajib diisi" };

    const find = await PokemonFavoriteModel.findOneAndDelete({ nickname });

    if (!find) throw { message: `${nickname} tidak ditemukan` };

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
