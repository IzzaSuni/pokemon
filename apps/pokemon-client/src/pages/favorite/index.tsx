import { FlexBox } from "@/src/components/core";
import useCatchPokemon from "@/src/utils/hooks/useCatchPokemon";
import PokemonAvatar from "@/src/pages/list-pokemon/component/PokemonAvatar";
import { breakpoint } from "@/src/utils/hooks/useBreakPoint";
import { Box, Typography } from "@mui/material";

export default function Favorite() {
  const { catchedPokemon } = useCatchPokemon();

  return (
    <Box maxWidth={breakpoint.m} overflow="auto" margin="auto">
      <Typography variant="h4" width="100%" textAlign="center" my={2}>
        My Pokemon
      </Typography>
      <FlexBox flexWrap="wrap" gap={1} justifyContent={"center"}>
        {catchedPokemon.map((pokemon) => (
          <FlexBox>
            <PokemonAvatar
              name={pokemon.pokemon_name}
              nickname={pokemon?.nickname}
              key={pokemon.nickname}
            />
          </FlexBox>
        ))}
      </FlexBox>
    </Box>
  );
}
