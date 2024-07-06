import { Box, Skeleton, Typography } from "@mui/material";

export default function LoadingState() {
  return (
    <Box>
      <Typography
        mb={2}
        fontFamily="Pokemon Solid"
        textAlign="center"
        variant="h3"
      >
        Loading
      </Typography>
      <Skeleton style={{ background: "var(--color)" }} variant="rounded" />
    </Box>
  );
}
