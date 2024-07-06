import { NextFunction, Request, Response } from "express";
import { PokemonClient } from "pokenode-ts";
import assertIsError from "../../utils/fn/assertError";
import { ResponseStatus, response } from "../../utils/responseWrapper";

type Payload = {
  pokemon_name: string;
  nickname: string;
  id: string;
};

export default async function pokemonValidator(
  req: Request<null, null, Payload>,
  res: Response,
  next: NextFunction
) {
  const pokemon_client = new PokemonClient();

  try {
    if (req.method === "POST") {
      if (!req.body.pokemon_name) return next();

      await pokemon_client.getPokemonByName(req.body?.pokemon_name);
      return next();
    }

    if (req.method === "PATCH") {
      if (!req.body?.nickname) return next();

      await pokemon_client.getPokemonByName(req.body?.nickname);

      throw {
        message: "nama panggilan jangan sama dengan pokemon saat ini dan lain",
      };
    }

    return next();
  } catch (err) {
    assertIsError(err);

    /* isFalseNegative happened in patch scope when it throw error from pokemon_client meaning 
    nickname are not the same with any other pokemon name */

    const isFalseNegative = err?.message.includes("404");

    if (isFalseNegative) return next();

    return res.json(response(ResponseStatus.Error, err?.message));
  }
}
