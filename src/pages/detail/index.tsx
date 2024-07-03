import { FlexBox } from "@/src/components/core";
import { useGetPokemonDetail } from "@/src/network/useQueryPokemon";
import { Box, ButtonBase, Chip, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Image, ImageContainer, Progress } from "./detail.style";
import useBreakPoint from "@/src/utils/hooks/useBreakPoint";
import { useEffect, useState } from "react";

import PockemonPocketIcon from "@/src/assets/icon/pockemon-pocket.png";
import useCatchPokemon from "@/src/utils/hooks/useCatchPokemon";
import useReleasePokemon from "@/src/utils/hooks/useReleasePokemin";

export default function Detail() {
  const params = useParams<{ name: string }>();
  const [urlImageIdx, setUrlImageIdx] = useState(0);
  const { catchPokemon, isCatched, currentPokemonFavorite } = useCatchPokemon();
  const { releasePokemon } = useReleasePokemon();

  const buttonAction = isCatched ? releasePokemon : catchPokemon;

  const { isTablet } = useBreakPoint();
  const { data, isFetching } = useGetPokemonDetail(params?.name || "");

  const sortedStats = data?.stats
    ?.map((v) => v.base_stat)
    .sort((a, b) => a - b);
  const MAX = sortedStats?.pop() ?? 100;

  const normalise = (value: number) =>
    MAX > 100 ? (value * 100) / MAX : value;

  const images = Object.values(
    data?.sprites.other?.["official-artwork"] || {}
  ).filter((e) => e);

  useEffect(() => {
    const interval = setInterval(() => {
      setUrlImageIdx((v) => (v == images.length - 1 ? 0 : v + 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <FlexBox flexDirection={isTablet ? "row" : "column"}>
        {!isTablet && (
          <ImageContainer
            margin="auto"
            width="60%"
            mb={5}
            flexDirection={"column"}
          >
            <Image width="100%" height="auto" src={images[urlImageIdx] || ""} />
            <ButtonBase disableTouchRipple onClick={() => buttonAction()}>
              <img src={PockemonPocketIcon} width={"30px"} height={"30px"} />
              <Typography
                fontSize={12}
                ml={1}
                letterSpacing={3}
                fontFamily="Pokemon Solid"
                color={"var(--background-color)"}
              >
                {isCatched ? "Release" : "Catch"}
              </Typography>
            </ButtonBase>
          </ImageContainer>
        )}
        <Box width={isTablet ? "50%" : "100%"}>
          <Typography
            fontFamily="Pokemon Solid"
            letterSpacing={5}
            variant="h1"
            fontSize={isTablet ? 56 : 32}
            width="100%"
            textAlign={"center"}
          >
            {currentPokemonFavorite?.nickname &&
              `${currentPokemonFavorite?.nickname} as `}
            {params?.name}
          </Typography>
          <Typography
            fontSize={isTablet ? 42 : 36}
            variant="h3"
            width="100%"
            my={2}
          >
            Statistic
          </Typography>
          <FlexBox flexDirection="column">
            {data?.stats?.map((v, index) => (
              <FlexBox key={index} alignItems="center">
                <FlexBox mb={1} width={"20%"}>
                  <Typography>{v.stat?.name.replace("-", " ")}</Typography>
                </FlexBox>
                <Box sx={{ width: "70%" }}>
                  <Progress
                    variant={isFetching ? "indeterminate" : "determinate"}
                    value={normalise(v.base_stat)}
                    label={v.base_stat}
                  />
                </Box>
              </FlexBox>
            ))}
          </FlexBox>
        </Box>
        {isTablet && (
          <ImageContainer width="50%">
            <Image width="80%" height="auto" src={images[urlImageIdx] || ""} />

            <ButtonBase disableTouchRipple onClick={() => buttonAction()}>
              <img src={PockemonPocketIcon} width={"30px"} height={"30px"} />
              <Typography fontSize={12} ml={1} fontFamily="Pokemon Solid">
                {isCatched ? "Release" : "Catch"}
              </Typography>
            </ButtonBase>
          </ImageContainer>
        )}
      </FlexBox>
      <FlexBox flexWrap={"wrap"} mt={6}>
        <Box>
          <Typography variant="h3" fontSize={isTablet ? 42 : 36}>
            moves
          </Typography>
          <FlexBox padding={2} flexWrap={"wrap"} gap={1}>
            {data?.moves?.map((v) => (
              <Chip
                sx={{
                  background:
                    "linear-gradient(-45deg, #60efff 0%, #0061ff 100% );",
                  color: "var(--color)",
                }}
                key={v.move.name}
                variant="outlined"
                label={v.move.name.replace("-", " ")}
              />
            ))}
          </FlexBox>
        </Box>
        <Box width="fit-content">
          <Typography variant="h3" fontSize={isTablet ? 42 : 36}>
            Type
          </Typography>
          <FlexBox padding={2} flexWrap={"wrap"} gap={1}>
            {data?.types?.map((v) => (
              <Chip
                sx={{
                  background:
                    "linear-gradient(-45deg, #60efff 0%, #0061ff 100% );",
                  color: "var(--color)",
                }}
                key={v.type?.name}
                variant="outlined"
                label={v.type?.name.replace("-", " ")}
              />
            ))}
          </FlexBox>
        </Box>
      </FlexBox>
    </>
  );
}
