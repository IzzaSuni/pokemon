import { Request, Response } from "express";
import { ResponseStatus, response } from "../../../utils/responseWrapper";
import { PokemonFavoriteModel } from "../../../db/models/PokemonFavorite";
import assertIsError from "../../../utils/fn/assertError";
type Payload = {
  pokemon_name: string;
  nickname: string;
};

export async function renamePokemon(
  req: Request<null, null, Payload>,
  res: Response
) {
  try {
    const {
      body: { pokemon_name, nickname },
    } = req;

    if (!pokemon_name || !nickname) {
      throw {
        message: `${!nickname ? "panggilan " : `nama`} pokemon wajib diisi`,
      };
    }

    const find = await PokemonFavoriteModel.findOneAndUpdate(
      { pokemon_name },
      { nickname, $inc: { iteration: 1 } }
    );

    if (!find) {
      throw { message: `${pokemon_name} tidak ditemukan` };
    } else if (find?.nickname == nickname) {
      throw { message: "nama panggilan tidak boleh sama" };
    }

    return res.json(
      response(
        ResponseStatus.Success,
        `Sukses ${find?.iteration ? "merubah" : "memberi"} nama panggilan`,
        find
      )
    );
  } catch (err) {
    assertIsError(err);

    return res.json(response(ResponseStatus.Error, err?.message));
  }
}
