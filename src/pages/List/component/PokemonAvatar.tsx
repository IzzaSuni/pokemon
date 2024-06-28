import { useGetPokemonDetail } from "@/src/network/useQueryPokemon";
import { Box, Skeleton, Typography } from "@mui/material";
import { Avatar } from "../list.styled";
import { FlexBox } from "@/src/components/core";

export default function PokemonAvatar({ name }: { name: string }) {
  const { data, isFetching, isError } = useGetPokemonDetail(name);

  return (
    <Box width="fit-content" sx={{ cursor: "pointer" }}>
      {!isFetching && (
        <>
          <Avatar
            src={
              // @ts-expect-error no types
              data?.sprites?.other?.showdown?.front_default ||
              data?.sprites?.front_default
            }
            alt={name}
          />
          <Typography width="auto" textAlign="center" fontWeight={700}>
            {name}
          </Typography>
        </>
      )}
      {isFetching && (
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
      {isError && (
        <FlexBox
          textAlign="center"
          flexDirection={"column"}
          alignItems={"center"}
        >
          Maaf terjadi kesalahan
        </FlexBox>
      )}
    </Box>
  );
}
