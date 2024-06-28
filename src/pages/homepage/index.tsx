import useIsDesktop, { breakpoint } from "@/src/utils/hooks/useIsDesktop";
import { ButtonStyled, ImageContainer, Text } from "./homepage.style";

import { FlexBox } from "@/src/components/core";
import PokemonIcon from "@/src/assets/icon/pockemon-pocket.png";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Homepage() {
  const isDesktop = useIsDesktop();

  return (
    <FlexBox
      margin="auto"
      mt={isDesktop ? 24 : 8}
      maxWidth={isDesktop ? breakpoint.m : "auto"}
      padding={1}
      justifyContent="space-between"
      flexDirection={isDesktop ? "row" : "column"}
      textAlign={isDesktop ? "left" : "center"}
    >
      <Box width={isDesktop ? "50%" : "100%"}>
        <Text
          variant="h1"
          letterSpacing={2}
          fontSize={isDesktop ? 56 : 36}
          fontWeight={700}
          width="100%"
        >
          Discover, Catch,
          <br /> Claim your favorite <br />
          <span>Pokemon</span>
        </Text>
        <Text variant="h2" fontSize={isDesktop ? 18 : 14} mt={2}>
          with the probability of cathing the Pokemon is 50% to make it yours!
        </Text>
        <Link to="/list">
          <ButtonStyled variant="contained">Discover Pokemons</ButtonStyled>
        </Link>
      </Box>
      <ImageContainer m="auto" mt={isDesktop ? 0 : 12}>
        <img src={PokemonIcon} width={isDesktop ? 300 : 200} />
      </ImageContainer>
    </FlexBox>
  );
}
