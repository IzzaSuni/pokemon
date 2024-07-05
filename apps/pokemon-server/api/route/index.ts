import express from "express";
import { catchPokemon, getFavoritePokemon } from "../controller/catchPokemon";
import { releasePokemon } from "../controller/releasePokemon";
import { renamePokemon } from "../controller/renamePokemon";

const router = express.Router();

router
  .route("/")
  .get(getFavoritePokemon)
  .post(catchPokemon)
  .delete(releasePokemon)
  .patch(renamePokemon);

export default router;
