import { Button, Typography } from "@mui/material";
import PockemonPocketIcon from "@/src/assets/icon/pockemon-pocket.png";
import useIsDesktop from "@/src/utils/hooks/useIsDesktop";
import { FlexBox } from "@/src/components/core";

import { UilFavorite, UilMoon, UilSun } from "@iconscout/react-unicons";
import useTheme, { Theme } from "@/src/utils/hooks/useTheme";
import { Container } from "./navbar.styled";

export default function Navbar() {
  const isDesktop = useIsDesktop();
  const { toggleTheme, theme } = useTheme();

  return (
    <Container
      zIndex={10}
      height={isDesktop ? 36 : 28}
      padding={2}
      justifyContent="center"
      position="sticky"
      top={0}
    >
      <FlexBox alignItems="center" gap={1}>
        <img
          alt="pockemon-icon"
          src={PockemonPocketIcon}
          width="24px"
          height="24px"
        />
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
        size="small"
        sx={{
          borderRadius: "100%",
          position: "absolute",
          right: 0,
          color: "inherit",
        }}
      >
        <Typography>
          {theme === Theme.dark ? <UilMoon /> : <UilSun />}{" "}
        </Typography>
      </Button>
      <Button
        onClick={() => toggleTheme()}
        size="small"
        sx={{
          borderRadius: "100%",
          position: "absolute",
          left: 0,
          color: "inherit",
          textTransform: "none",
        }}
      >
        <UilFavorite />
        <Typography fontSize={12}>Favorite</Typography>
      </Button>
    </Container>
  );
}
