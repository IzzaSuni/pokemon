import { FlexBox } from "@/src/components/core";
import useBreakPoint from "@/src/utils/hooks/useBreakPoint";
import { Box, Chip, Typography } from "@mui/material";
import { Pokemon } from "pokenode-ts";

function ChipView({ label }: { label: string }) {
  return (
    <Chip
      variant="outlined"
      label={label}
      sx={{
        background: "linear-gradient(-45deg, #60efff 0%, #0061ff 100% );",
        color: "var(--color)",
      }}
    />
  );
}

export default function PokemonDataView({ data }: { data?: Pokemon }) {
  const { isTablet } = useBreakPoint();

  return (
    <FlexBox flexWrap={"wrap"} mt={6}>
      <Box>
        <Typography variant="h3" fontSize={isTablet ? 42 : 36}>
          moves
        </Typography>
        <FlexBox padding={2} flexWrap={"wrap"} gap={1}>
          {data?.moves?.map((v) => (
            <ChipView key={v.move.name} label={v.move.name.replace("-", " ")} />
          ))}
        </FlexBox>
      </Box>
      <Box width="fit-content">
        <Typography variant="h3" fontSize={isTablet ? 42 : 36}>
          Type
        </Typography>
        <FlexBox padding={2} flexWrap={"wrap"} gap={1}>
          {data?.types?.map((v) => (
            <ChipView
              key={v.type.name}
              label={v.type?.name.replace("-", " ")}
            />
          ))}
        </FlexBox>
      </Box>
    </FlexBox>
  );
}
