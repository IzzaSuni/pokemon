import { FlexBox } from "@/src/components/core";
import { LinearProgress, keyframes, styled } from "@mui/material";

import { bounceIn } from "react-animations";

const bounceAnimation = keyframes`${bounceIn}`;

export const Image = styled("img")`
  margin: auto;
`;

export const ImageContainer = styled(FlexBox)`
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
    transform: translate3d(3px, 0px, 0) scale(1);
    filter: blur(10px);
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
    animation: 1s ${bounceAnimation};
  }
`;

export const Progress = styled(LinearProgress)<{ label: number }>`
  height: 12px;
  border-radius: 12px;

  &:before {
    content: ${({ label }) => `"${label}"`};
    position: absolute;
    left: 50%;
    top: -3px;
    font-size: 12px;
    color: ${({ value }) => ((value ?? 0) > 50 ? "white" : "black")};
    font-family: Roboto;
    z-index: 10;
    font-weight: 700;
  }
`;
