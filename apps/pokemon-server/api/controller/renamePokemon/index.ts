import { Request, Response } from "express";
import { ResponseStatus, response } from "../../../utils/responseWrapper";
import assertIsError from "../../../utils/fn/assertError";
import findOnePokemon from "../utils/findOnePokemon";
import fibonacci from "../../../utils/fn/fibonaci";
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

  if (!pokemon_name) {
    throw {
      message: `nama pokemon wajib diisi`,
    };
  }

  try {
    const find = await findOnePokemon({ pokemon_name });

    if (!find) throw { message: `${pokemon_name} tidak ditemukan` };

    if (!find.iteration) find.iteration = 0;

    if (!find?.iteration) {
      if (!nickname) throw { message: "panggilan pokemon wajib diisi" };

      find.nickname = nickname;
      find.iteration = find.iteration + 1;
      find.save();

      return res.json(
        response(
          ResponseStatus.Success,
          "Berhasil memberi nama panggilan",
          find
        )
      );
    }

    if (find.nickname) {
      const prevIterationName = ` - ${fibonacci(find.iteration)}`;
      const nextIterationName = ` - ${fibonacci(find.iteration + 1)}`;

      if (find.nickname.includes(prevIterationName) && find.iteration >= 0) {
        find.nickname = find.nickname.replace(
          prevIterationName,
          nextIterationName
        );
      } else {
        find.nickname = find.nickname + nextIterationName;
      }

      find.iteration = (find.iteration ?? 0) + 1;

      await find.save();

      return res.json(
        response(
          ResponseStatus.Success,
          `Sukses ${find?.iteration ? "merubah" : "memberi"} nama panggilan`,
          find
        )
      );
    }

    find.iteration = 0;
    await find.save();

    return res.json(
      response(
        ResponseStatus.Error,
        "data kotor, panggilan tidak ada namun iterasi lebih dari 0"
      )
    );
  } catch (err) {
    assertIsError(err);

    return res.json(response(ResponseStatus.Error, err?.message));
  }
}
