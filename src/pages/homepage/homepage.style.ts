import { Box, Button, Typography, keyframes } from "@mui/material";
import { styled } from "@mui/system";

import { shake } from "react-animations";

export const Text = styled(Typography)`
  span {
    position: relative;
    background: linear-gradient(-45deg, #fff95b 0%, #ff930f 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: "Pokemon Solid";
  }
`;

const bounceAnimation = keyframes`${shake}`;

export const ImageContainer = styled(Box)`
  width: fit-content;
  height: fit-content;
  position: relative;
  border-radius: 100%;

  &:before {
    content: "";
    z-index: -1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(-18deg, #f5f4f2 33%, #ff4081 106%);
    transform: translate3d(3px, 0px, 0) scale(1.27);
    filter: blur(30px);
    opacity: var(0.75);
    transition: opacity 0.3s;
    border-radius: inherit;
  }

  &::after {
    content: "";
    z-index: -1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: inherit;
    border-radius: inherit;
  }

  img {
    &:hover {
      animation: 1s ${bounceAnimation} infinite;
    }
  }
`;

export const ButtonStyled = styled(Button)`
  background: linear-gradient(-45deg, #fff95b 0%, #ff930f 100%);
  color: black;
  margin-top: 32px;
  font-size: 18px;
`;
