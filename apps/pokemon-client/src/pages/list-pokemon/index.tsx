import {
  useGetListPokemons,
  useGetPokemonDetail,
} from "@/src/network/useQueryPokemon";
import { Skeleton, Typography } from "@mui/material";
import { PaginationStyled, Text } from "./list.styled";
import { FlexBox } from "@/src/components/core";
import useBreakPoint, { breakpoint } from "@/src/utils/hooks/useBreakPoint";
import PokemonAvatar from "./component/PokemonAvatar";
import PokemonSearch from "./component/PokemonSearch";
import { atom, useAtomValue } from "jotai";
import { useState } from "react";

export const searchPokemonAtom = atom("");

export default function ListPokemons() {
  const [page, setPage] = useState(0);
  const search = useAtomValue(searchPokemonAtom);

  const { isDesktop } = useBreakPoint();

  const { data: dataTotal, isLoading: isLoadingTotal } = useGetListPokemons({
    page: 1,
    perPage: 1,
  });

  const { data, isFetching } = useGetListPokemons({
    page,
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
        fontSize={isDesktop ? 56 : 24}
        fontWeight={700}
        width="100%"
        textAlign={"center"}
      >
        There are{" "}
        {isLoadingTotal ? (
          "🤔"
        ) : (
          <>
            <span>{dataTotal?.count} Pokemons</span> here waiting for you to be
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
        {!search && isFetching ? (
          <FlexBox flexDirection={"column"} alignItems={"center"}>
            <Skeleton variant="circular" width={100} height={100} />
            <Skeleton
              sx={{ marginTop: 2 }}
              variant="rectangular"
              width={100}
              height={12}
            />
          </FlexBox>
        ) : (
          !isError &&
          data?.results?.map((value) => (
            <PokemonAvatar key={value?.name} name={value?.name} />
          ))
        )}

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

      {!isError && (
        <PaginationStyled
          count={Math.floor((dataTotal?.count || 100) / 100)}
          onChange={(_e, nextPage) => setPage(nextPage - 1)}
          size={isDesktop ? "large" : "medium"}
          variant="outlined"
          color="primary"
        />
      )}
    </FlexBox>
  );
}
