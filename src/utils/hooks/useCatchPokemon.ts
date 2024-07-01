import { useAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

export const catchPokemonAtom = atomWithStorage<
  | {
      nickname: string;
      pokemon_name: string;
    }[]
  | []
>(
  "catched-pokemon-name",
  [],
  createJSONStorage(() => localStorage)
);
export default function useCatchPokemon() {
  const [catchedPokemon, setCatchedPokemon] = useAtom(catchPokemonAtom);

  const probability = 0.5;

  function catchPokemon() {
    return Math.random() > probability;
  }

  return { catchPokemon, catchedPokemon, setCatchedPokemon };
}
