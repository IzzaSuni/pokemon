import Navbar from "./navbar";
import { Box, Snackbar } from "@mui/material";
import useTheme from "../utils/hooks/useTheme";
import useBreakPoint, { breakpoint } from "../utils/hooks/useBreakPoint";
import { Outlet } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

export default function Layout() {
  useTheme();
  const { isDesktop } = useBreakPoint();

  return (
    <Box>
      <Analytics />
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
