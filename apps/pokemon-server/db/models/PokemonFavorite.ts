import mongoose from "mongoose";

const PokemonFavoriteSchema = new mongoose.Schema({
  nickname: String,
  pokemon_name: String,
  iteration: Number,
});

export const PokemonFavoriteModel = mongoose.model(
  "pokemon_favorites",
  PokemonFavoriteSchema
);
