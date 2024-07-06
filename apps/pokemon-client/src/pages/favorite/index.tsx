import { FlexBox } from "@/src/components/core";
import PokemonAvatar from "@/src/pages/list-pokemon/component/PokemonAvatar";
import useBreakPoint, { breakpoint } from "@/src/utils/hooks/useBreakPoint";
import { Box, Typography } from "@mui/material";
import { useGetPokemonFavorite } from "@/src/network/useQueryPokemon";
import LoadingPokemonState from "../list-pokemon/component/LoadingPokemonState";
import PokemonSearch from "../list-pokemon/component/PokemonSearch";
import { useAtomValue } from "jotai";
import { searchPokemonAtom } from "../list-pokemon";
import { PaginationStyled } from "../list-pokemon/list.styled";
import { useState } from "react";

export default function Favorite() {
  const search = useAtomValue(searchPokemonAtom);
  const [page, setPage] = useState(0);

  const { isDesktop } = useBreakPoint();
  const { data, isFetching } = useGetPokemonFavorite({
    limit: 10,
    offset: page * 10,
    search,
  });

  const isEmpty = !data?.data.length;

  return (
    <Box maxWidth={breakpoint.m} overflow="auto" margin="auto">
      <Typography variant="h4" width="100%" textAlign="center" my={2}>
        My Pokemon
      </Typography>
      {!!data?.data?.length && <PokemonSearch />}
      <FlexBox flexWrap="wrap" gap={1} justifyContent={"center"}>
        {data?.data?.map((pokemon) => (
          <FlexBox>
            <PokemonAvatar
              name={pokemon.pokemon_name}
              nickname={pokemon?.nickname}
              key={pokemon.nickname}
            />
          </FlexBox>
        ))}
        {isFetching && <LoadingPokemonState count={20} />}
        {isEmpty && !isFetching && (
          <Typography textAlign="center">
            {search
              ? `Maaf tidak ada ${search} disini`
              : "Kamu belom punya pokemon favorite"}
          </Typography>
        )}
      </FlexBox>
      {!!data?.data?.length && (
        <PaginationStyled
          count={Math.floor((data?.pagination?.count || 10) / 10) || 1}
          onChange={(_, page) => setPage(page)}
          size={isDesktop ? "large" : "medium"}
          variant="outlined"
          color="primary"
        />
      )}
    </Box>
  );
}
