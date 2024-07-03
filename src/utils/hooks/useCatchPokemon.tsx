import MiniForm from "@/src/pages/list/component/MiniForm";
import { useAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { useSnackbar } from "notistack";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

export const catchPokemonAtom = atomWithStorage<
  | {
      nickname: string;
      pokemon_name: string;
      iteration: number;
    }[]
  | []
>(
  "catched-pokemon-name",
  [],
  createJSONStorage(() => localStorage)
);

export default function useCatchPokemon() {
  const params = useParams<{ name: string }>();
  const [catchedPokemon, setCatchedPokemon] = useAtom(catchPokemonAtom);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const probability = 0.5;

  const currentPokemonFavorite = useMemo(() => {
    return catchedPokemon.find(
      (pokemon) => pokemon.pokemon_name === params?.name
    );
  }, [params, catchedPokemon]);

  function submitToFavorite(nickname: string) {
    const payload = {
      nickname: nickname,
      pokemon_name: params?.name || "",
      iteration: 0,
    };

    const sameNickName = catchedPokemon.find(
      (pokemon) => pokemon.nickname === nickname
    );

    if (sameNickName?.nickname) {
      closeSnackbar();
      enqueueSnackbar(
        `Sorry that nickname given to ${sameNickName.pokemon_name}`,
        { autoHideDuration: 3000 }
      );
      return;
    }

    if (!catchedPokemon?.length) {
      setCatchedPokemon([payload]);
    } else setCatchedPokemon((v) => [...v, payload]);

    closeSnackbar();
    enqueueSnackbar(`success catch ${nickname}`, { autoHideDuration: 3000 });
  }

  function catchPokemon() {
    closeSnackbar();
    const catched = Math.random() > probability;

    if (catched) {
      enqueueSnackbar(`${params?.name} catched`, {
        action: <MiniForm submit={(nickname) => submitToFavorite(nickname)} />,
        autoHideDuration: null,
      });
    } else {
      enqueueSnackbar("Sorry it miss", { autoHideDuration: 3000 });
    }
  }

  return {
    catchPokemon,
    catchedPokemon,
    setCatchedPokemon,
    isCatched: !!currentPokemonFavorite?.nickname,
    currentPokemonFavorite,
  };
}
