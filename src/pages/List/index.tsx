import {
  useGetListPokemons,
  useGetPokemonDetail,
} from "@/src/network/useQueryPokemon";
import { Skeleton, Typography } from "@mui/material";
import { Text } from "./listStyled";
import { FlexBox } from "@/src/components/core";
import useBreakPoint, { breakpoint } from "@/src/utils/hooks/useBreakPoint";
import PokemonAvatar from "./component/PokemonAvatar";
import PokemonSearch from "./component/PokemonSearch";
import { atom, useAtomValue } from "jotai";

export const searchPokemonAtom = atom("");

export default function ListPokemons() {
  const search = useAtomValue(searchPokemonAtom);

  const { isDesktop } = useBreakPoint();
  const { data, isFetching } = useGetListPokemons({
    page: 1,
    perPage: 100,
  });
  const {
    isError,
    isSuccess,
    isFetching: isSearching,
    data: searchQuery,
  } = useGetPokemonDetail(search);

  return (
    <FlexBox justifyContent="center" flexDirection="column">
      <Text
        variant="h1"
        letterSpacing={2}
        fontSize={isDesktop ? 56 : 36}
        fontWeight={700}
        width="100%"
        textAlign={"center"}
      >
        There are{" "}
        {isFetching ? (
          "🤔"
        ) : (
          <>
            <span>{data?.count} Pokemons</span> here waiting for you to be
            catched
          </>
        )}
      </Text>
      <PokemonSearch />
      <FlexBox
        justifyContent="center"
        gap={2}
        flexWrap="wrap"
        maxWidth={breakpoint.m}
        height={500}
        overflow="auto"
      >
        {!search &&
          data?.results?.map((value) => (
            <PokemonAvatar key={value?.name} name={value?.name} />
          ))}

        {search && isSearching && (
          <FlexBox flexDirection={"column"} alignItems={"center"}>
            <Skeleton variant="circular" width={100} height={100} />
            <Skeleton
              sx={{ marginTop: 2 }}
              variant="rectangular"
              width={100}
              height={12}
            />
          </FlexBox>
        )}
        {search && isError && (
          <Typography textAlign="center">
            Maaf pokemon dengan nama {search} tidak ditemukan{" "}
          </Typography>
        )}
        {search && isSuccess && <PokemonAvatar name={searchQuery?.name} />}
      </FlexBox>
    </FlexBox>
  );
}
