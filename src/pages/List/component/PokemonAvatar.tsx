import { useGetPokemonDetail } from "@/src/network/useQueryPokemon";
import { Box, Skeleton, Typography } from "@mui/material";
import { Avatar } from "../list.styled";
import { FlexBox } from "@/src/components/core";
import { Link } from "react-router-dom";

export default function PokemonAvatar({ name }: { name: string }) {
  const { data, isFetching, isError } = useGetPokemonDetail(name);

  return (
    <Box width="fit-content" sx={{ cursor: "pointer" }}>
      {!isFetching && (
        <Link to={`/detail/${name}`} style={{ textDecoration: "none" }}>
          <Avatar
            src={
              data?.sprites?.other?.dream_world?.front_default ||
              data?.sprites?.front_default ||
              ""
            }
            alt={name}
          />
          <Typography
            color="var(--color)"
            width="auto"
            textAlign="center"
            fontWeight={700}
          >
            {name}
          </Typography>
        </Link>
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
