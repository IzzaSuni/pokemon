import { ButtonBase, Typography } from "@mui/material";
import PockemonPocketIcon from "@/src/assets/icon/pockemon-pocket.png";

type Props = {
  disable: boolean;
  text: string;
  onClick: () => void;
  color?: string;
};

export default function ButtonAction({ disable, text, color, ...rest }: Props) {
  return (
    <ButtonBase disabled={disable} disableTouchRipple {...rest}>
      <img src={PockemonPocketIcon} width={"30px"} height={"30px"} />
      <Typography
        fontSize={14}
        ml={1}
        letterSpacing={2}
        fontFamily="Pokemon Solid"
        color={color ?? "black"}
      >
        {text}
      </Typography>
    </ButtonBase>
  );
}
