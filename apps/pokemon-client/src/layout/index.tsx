import Navbar from "./navbar";
import { Box, Snackbar } from "@mui/material";
import useTheme from "../utils/hooks/useTheme";
import useBreakPoint, { breakpoint } from "../utils/hooks/useBreakPoint";
import { Outlet } from "react-router-dom";

export default function Layout() {
  useTheme();
  const { isDesktop } = useBreakPoint();

  return (
    <Box>
      <Navbar />
      <Box
        margin="auto"
        mt={isDesktop ? 16 : 8}
        maxWidth={isDesktop ? breakpoint.m : "auto"}
        padding={1}
      >
        <Outlet />
      </Box>
      <Snackbar />
    </Box>
  );
}
