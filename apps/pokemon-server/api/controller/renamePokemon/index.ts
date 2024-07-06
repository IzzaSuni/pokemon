import { Request, Response } from "express";
import { ResponseStatus, response } from "../../../utils/responseWrapper";
import assertIsError from "../../../utils/fn/assertError";
import { findPokemonById } from "../utils/findOnePokemon";
import fibonacci from "../../../utils/fn/fibonaci";
import { PokemonFavoriteModel } from "../../../db/models/PokemonFavorite";

type Payload = {
  id: string;
  nickname: string;
};

export async function renamePokemon(
  req: Request<null, null, Payload>,
  res: Response
) {
  const {
    body: { id, nickname },
  } = req;

  console.log(req.body);

  try {
    if (!id) {
      throw {
        message: `id pokemon wajib diisi`,
      };
    }

    const data = await findPokemonById(id);

    // case not found
    if (!data) throw { message: `pokemon tidak ditemukan` };

    if (!data.iteration) data.iteration = 0;

    if (!data?.iteration) {
      // case catched but not assigned a nickname yet but nickname nil in request
      if (!nickname) throw { message: "panggilan pokemon wajib diisi" };

      const anotherPokemon = await PokemonFavoriteModel.findOne({ nickname });

      // case nickname owned by another pokemon
      if (anotherPokemon) {
        throw {
          message: `nama ${nickname} sudah diberikan kepada ${anotherPokemon.pokemon_name}`,
        };
      }

      // case catched but trying to assign nickname
      data.nickname = nickname;
      data.iteration = data.iteration + 1;
      await data.save();

      return res.json(
        response(
          ResponseStatus.Success,
          "Berhasil memberi nama panggilan",
          data
        )
      );
    }

    // case having a nickname before an trying to be renamed using fibonaci sequence
    if (data.nickname) {
      const prevIterationName = ` - ${fibonacci(data.iteration)}`;
      const nextIterationName = ` - ${fibonacci(data.iteration + 1)}`;

      if (data.nickname.includes(prevIterationName) && data.iteration >= 0) {
        data.nickname = data.nickname.replace(
          prevIterationName,
          nextIterationName
        );
      } else {
        data.nickname = data.nickname + nextIterationName;
      }

      data.iteration = (data.iteration ?? 0) + 1;

      await data.save();

      return res.json(
        response(
          ResponseStatus.Success,
          `Sukses ${data?.iteration ? "merubah" : "memberi"} nama panggilan`,
          data
        )
      );
    }

    /* case having an iteration (meaning have a renamed function before) 
    but doesn't have nickname probably dirty data
    */

    data.iteration = 0;
    await data.save();

    return res.json(
      response(
        ResponseStatus.Error,
        "data kotor, panggilan tidak ada namun iterasi lebih dari 0"
      )
    );
  } catch (err) {
    console.log(err, "asd");
    assertIsError(err);
    return res.json(response(ResponseStatus.Error, err?.message));
  }
}
