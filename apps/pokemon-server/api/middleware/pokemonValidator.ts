import { NextFunction, Request, Response } from "express";
import { pokemon_client } from "shared-types";
import assertIsError from "../../utils/fn/assertError";
import { ResponseStatus, response } from "../../utils/responseWrapper";

type Payload = {
  pokemon_name: string;
};

export default async function pokemonValidator(
  req: Request<null, null, Payload>,
  res: Response,
  next: NextFunction
) {
  if (!("pokemon_name" in req.body)) return next();

  try {
    await pokemon_client.getPokemonByName(req.body?.pokemon_name);
    next();
  } catch (err) {
    assertIsError(err);
    return res.json(
      response(
        ResponseStatus.Error,
        `Maaf tidak ada pokemon dengan nama ${req?.body?.pokemon_name}`
      )
    );
  }
}
