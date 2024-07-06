import express from "express";
import { catchPokemon } from "../controller/catchPokemon";
import { releasePokemon } from "../controller/releasePokemon";
import { renamePokemon } from "../controller/renamePokemon";
import { getFavoritePokemon } from "../controller/showPokemon";

import pokemonValidator from "../middleware/pokemonValidator";

const router = express.Router();

router
  .route("/")
  .get(getFavoritePokemon)
  .post(pokemonValidator, catchPokemon)
  .delete(releasePokemon)
  .patch(pokemonValidator, renamePokemon);

export default router;
