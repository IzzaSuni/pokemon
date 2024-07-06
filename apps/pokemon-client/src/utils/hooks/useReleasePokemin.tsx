import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  ResponseStatus,
  useActionPokemonFavorite,
  useGetPokemonFavorite,
} from "@/src/network/useQueryPokemon";
import assertIsError from "../fn/assertError";
import { Typography } from "@mui/material";

export default function useReleasePokemon() {
  const params = useParams<{ name: string }>();

  const { enqueueSnackbar } = useSnackbar();

  const { data: favorite, refetch } = useGetPokemonFavorite({
    pokemon_name: params?.name,
  });

  const { mutateAsync } = useActionPokemonFavorite();

  async function releasePokemon() {
    const id = favorite?.data?._id;

    try {
      if (!id) throw { message: "pokemon favorite tidak ditemukan" };

      const res = await mutateAsync({ data: { id }, method: "DELETE" });

      if (res?.data?.status === ResponseStatus.Error) {
        throw { message: res.message };
      }

      enqueueSnackbar(<Typography>{res?.message}</Typography>, {
        autoHideDuration: 3000,
      });

      refetch();
    } catch (err) {
      assertIsError(err);
      enqueueSnackbar(<Typography>{err?.message}</Typography>, {
        autoHideDuration: 3000,
      });
    }
  }

  return { releasePokemon };
}
