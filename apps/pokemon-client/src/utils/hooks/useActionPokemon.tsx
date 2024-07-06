import {
  ResponseStatus,
  useActionPokemonFavorite,
  useGetPokemonFavorite,
} from "@/src/network/useQueryPokemon";
import MiniForm from "@/src/pages/list-pokemon/component/MiniForm";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import assertIsError from "../fn/assertError";
import { Typography } from "@mui/material";
import { Method } from "axios";
import { useMemo } from "react";

type Action = "catch" | "release" | "rename" | "naming";

const actionMethod: Record<Action, Method> = {
  catch: "post",
  release: "delete",
  rename: "patch",
  naming: "patch",
};

export default function useActionPokemon() {
  const params = useParams<{ name: string }>();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { mutateAsync, isPending } = useActionPokemonFavorite();

  const { data: favorite, refetch } = useGetPokemonFavorite({
    pokemon_name: params?.name,
  });

  const favoritePokemon = favorite?.data;
  const isCatched = !!favoritePokemon?._id;
  const isNamed = !!favoritePokemon?._id && favoritePokemon?.nickname;

  let type = useMemo(() => {
    if (isCatched && !isNamed) return "naming";
    if (isCatched && isNamed) return "release";

    return "catch";

    if (isCatched) return "";
  }, [isCatched, isNamed]) as Action;

  async function action(nickname = "", rename = false) {
    closeSnackbar();

    if (rename) type = "rename";

    if (type === "naming" && !nickname) {
      return enqueueSnackbar(
        <Typography>Beri nama {params?.name} mu</Typography>,
        {
          preventDuplicate: true,
          action: (
            <MiniForm
              label="nama"
              submit={(nickname) => nickname && action(nickname)}
            />
          ),
        }
      );
    }

    try {
      const res = await mutateAsync({
        data: {
          pokemon_name: params?.name,
          id: favoritePokemon?._id,
          nickname,
        },
        method: actionMethod[type],
      });

      if (res?.status === ResponseStatus.Error) {
        throw { message: res.message };
      }

      enqueueSnackbar(<Typography>{res?.message}</Typography>, {
        autoHideDuration: 3000,
        preventDuplicate: true,
      });

      refetch();
    } catch (err) {
      assertIsError(err);
      enqueueSnackbar(<Typography>{err?.message}</Typography>, {
        autoHideDuration: 3000,
        preventDuplicate: true,
      });
    }
  }

  return {
    action,
    favoritePokemon,
    isCatched,
    isNamed,
    isPending,
  };
}
