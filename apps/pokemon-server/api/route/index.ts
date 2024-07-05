import express from "express";
import {
  catchPokemon,
  getFavoritePokemon,
  renamePokemon,
} from "../controller/catchPokemon";
import { releasePokemon } from "../controller/releasePokemon";

const router = express.Router();

router
  .route("/")
  .get(getFavoritePokemon)
  .post(catchPokemon)
  .delete(releasePokemon)
  .patch(renamePokemon);

export default router;
