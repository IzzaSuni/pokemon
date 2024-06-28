import { ReactNode } from "react";
import Navbar from "./navbar";
import { Box } from "@mui/material";
import useTheme from "../utils/hooks/useTheme";

export default function ({ children }: { children: ReactNode }) {
  useTheme();

  return (
    <Box>
      <Navbar />
      {children}
    </Box>
  );
}
