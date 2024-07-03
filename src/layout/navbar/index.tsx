import { Button, Typography } from "@mui/material";
import PockemonPocketIcon from "@/src/assets/icon/pockemon-pocket.png";
import useBreakPoint from "@/src/utils/hooks/useBreakPoint";
import { FlexBox } from "@/src/components/core";

import { UilFavorite, UilMoon, UilSun } from "@iconscout/react-unicons";
import useTheme, { Theme } from "@/src/utils/hooks/useTheme";
import { Container } from "./navbar.styled";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { isDesktop } = useBreakPoint();
  const { toggleTheme, theme } = useTheme();

  const ThemeIcon = theme === Theme.dark ? UilMoon : UilSun;

  const nav = useNavigate();

  return (
    <Container
      zIndex={10}
      height={isDesktop ? 36 : 28}
      padding={2}
      justifyContent="center"
      top={0}
    >
      <FlexBox alignItems="center" gap={1}>
        <Button
          onClick={() => nav("/")}
          sx={{ textTransform: "none", color: "var(--color)" }}
        >
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
        </Button>
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
          <ThemeIcon
            width={isDesktop ? "32px" : "24px"}
            height={isDesktop ? "32px" : "24px"}
          />
        </Typography>
      </Button>
      <Link to={"/favorite"}>
        <Button
          onClick={() => toggleTheme()}
          size="large"
          sx={{
            borderRadius: "100%",
            position: "absolute",
            left: 0,
            color: "inherit",
            textTransform: "none",
          }}
        >
          <UilFavorite
            scale={2}
            width={isDesktop ? "32px" : "24px"}
            height={isDesktop ? "32px" : "24px"}
          />
          <Typography fontSize={isDesktop ? 16 : 12}>Favorite</Typography>
        </Button>
      </Link>
    </Container>
  );
}
