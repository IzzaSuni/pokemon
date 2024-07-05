import { Request, Response } from "express";
import { ResponseStatus, response } from "../../../utils/responseWrapper";

import { PokemonFavoriteModel } from "../../../db/models/PokemonFavorite";

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

  if (!nickname) {
    return res.json(response(ResponseStatus.Error, "nickname wajib diisi"));
  }

  try {
    const find = await PokemonFavoriteModel.findOneAndDelete({ nickname });

    if (find) {
      return res.json(
        response(ResponseStatus.Success, `${find?.nickname} berhasil dilepas`)
      );
    }

    throw Error;
  } catch (err) {
    return res.json(
      response(ResponseStatus.Error, `${nickname} tidak ditemukan`)
    );
  }
}
