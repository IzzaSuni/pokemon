import { ReactNode } from "react";
import Navbar from "./navbar";
import { Box } from "@mui/material";
import useTheme from "../utils/hooks/useTheme";
import useIsDesktop, { breakpoint } from "../utils/hooks/useIsDesktop";

export default function Layout({ children }: { children: ReactNode }) {
  useTheme();
  const isDesktop = useIsDesktop();

  return (
    <Box>
      <Navbar />
      <Box
        margin="auto"
        mt={isDesktop ? 24 : 8}
        maxWidth={isDesktop ? breakpoint.m : "auto"}
        padding={1}
      >
        {children}
      </Box>
    </Box>
  );
}
