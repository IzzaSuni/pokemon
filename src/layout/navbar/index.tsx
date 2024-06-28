import { Box, Button, Typography } from "@mui/material";
import PockemonPocketIcon from "@/src/assets/icon/pockemon-pocket.png";
import useIsDesktop from "@/src/utils/hooks/useIsDesktop";
import { FlexBox } from "@/src/components/core";
import { UilMoon, UilSun } from "@iconscout/react-unicons";
import useTheme, { Theme } from "@/src/utils/hooks/useTheme";

export default function Navbar() {
  const isDesktop = useIsDesktop();
  const { toggleTheme, theme } = useTheme();

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
      <Button
        onClick={() => toggleTheme()}
        position="absolute"
        right={0}
        sx={{ borderRadius: "100%", aspectRatio: 1 / 1 }}
      >
        <Typography>
          {theme === Theme.dark ? <UilMoon /> : <UilSun />}{" "}
        </Typography>
      </Button>
    </FlexBox>
  );
}
