import { FlexBox } from "@/src/components/core";
import { Skeleton } from "@mui/material";

export default function LoadingPokemonState({ count }: { count?: number }) {
  return (
    <>
      {Array(count || 1)
        .fill("")
        .map(() => (
          <FlexBox flexDirection={"column"} alignItems={"center"}>
            <Skeleton variant="circular" width={100} height={100} />
            <Skeleton
              sx={{ marginTop: 2 }}
              variant="rectangular"
              width={100}
              height={12}
            />
          </FlexBox>
        ))}
    </>
  );
}
