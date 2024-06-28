import { ReactNode } from "react";
import Navbar from "./navbar";
import { Box } from "@mui/material";

export default function ({ children }: { children: ReactNode }) {
  return (
    <Box>
      <Navbar />
      {children}
    </Box>
  );
}
