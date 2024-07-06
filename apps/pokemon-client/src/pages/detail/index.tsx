import { FlexBox } from "@/src/components/core";
import { useGetPokemonDetail } from "@/src/network/useQueryPokemon";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Image, ImageContainer, Progress } from "./detail.style";
import useBreakPoint from "@/src/utils/hooks/useBreakPoint";
import { useCallback, useEffect, useMemo, useState } from "react";

import LoadingState from "@/src/components/LoadingState";
import useActionPokemon from "@/src/utils/hooks/useActionPokemon";
import ButtonAction from "./component/ButtonAction";
import PokemonDataView from "./component/PokemonDataView";

export default function Detail() {
  const params = useParams<{ name: string }>();
  const [urlImageIdx, setUrlImageIdx] = useState(0);

  const { action, favoritePokemon, isCatched, isPending, isNamed } =
    useActionPokemon();
  const { action: rename, isPending: isRenaming } = useActionPokemon();

  const { isTablet } = useBreakPoint();
  const { data, isFetching } = useGetPokemonDetail(params?.name || "");

  const getProgress = useCallback(
    (value: number) => {
      const sortedStats = data?.stats
        ?.map((v) => v.base_stat)
        .sort((a, b) => a - b);

      const MAX = sortedStats?.pop() ?? 100;

      return MAX > 100 ? (value * 100) / MAX : value;
    },
    [data]
  );

  const buttonCopy = useMemo(() => {
    if (!isNamed && isCatched) {
      return isPending ? "Giving name..." : "Give name";
    }

    if (isCatched) {
      return isPending ? "Releasing..." : "Release";
    }

    return isPending ? "Catching..." : "Catch";
  }, [isPending, isCatched, isNamed]);

  const images = useMemo(() => {
    return Object.values(
      data?.sprites.other?.["official-artwork"] || {}
    ).filter((e) => e);
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setUrlImageIdx((v) => (v == images.length - 1 ? 0 : v + 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (isFetching) return <LoadingState />;

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
            <ButtonAction
              disable={isPending}
              onClick={() => action()}
              text={buttonCopy}
            />
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
            {favoritePokemon?.nickname && `${favoritePokemon?.nickname} as `}
            {params?.name}
          </Typography>
          <FlexBox justifyContent={"center"} mt={4}>
            {isNamed && (
              <ButtonAction
                disable={isRenaming}
                onClick={() => rename("", true)}
                text={isRenaming ? "Renaming..." : "Rename"}
                color="var(--color)"
              />
            )}
          </FlexBox>
          <Typography
            fontSize={isTablet ? 42 : 36}
            variant="h3"
            width="100%"
            my={4}
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
                    value={getProgress(v.base_stat)}
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
            <ButtonAction
              disable={isPending}
              onClick={() => action()}
              text={buttonCopy}
            />
          </ImageContainer>
        )}
      </FlexBox>
      <PokemonDataView data={data} />
    </>
  );
}
