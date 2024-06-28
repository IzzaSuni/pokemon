import { Typography } from "@mui/material";
import useIsDesktop from "../../utils/hooks/useIsDesktop";
import PockemonPocketIcon from "@/src/assets/icon/pockemon-pocket.png";
import { FlexBox } from "../../components/core";

export default function Navbar() {
  const isDesktop = useIsDesktop();

  return (
    <FlexBox
      height={isDesktop ? 36 : 28}
      padding={isDesktop ? 2 : 2}
      justifyContent="center"
      position="sticky"
      top={0}
    >
      <FlexBox alignItems="center" gap={1}>
        <img src={PockemonPocketIcon} width="24px" height="24px" />
        <Typography
          className="navbar"
          fontWeight={700}
          width="fit-content"
          fontSize={24}
        >
          Pokemons
        </Typography>
      </FlexBox>
    </FlexBox>
  );
}
