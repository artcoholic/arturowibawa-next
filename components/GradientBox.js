import React from "react";
import { styled } from "../config/stitches.config";
import Box from "./Box";

const GradientBox = styled(Box, {
  background: "$gradient2",
  background: "-moz-linear-gradient(0deg, $gradient1 0%, $gradient2 100%)",
  background: "-webkit-linear-gradient(0deg, $gradient1 0%, $gradient2 100%)",
  background: "linear-gradient(0deg, $gradient1 0%, $gradient2 100%)",
  filter:
    'progid:DXImageTransform.Microsoft.gradient(startColorstr="#1b1c32",endColorstr="#1b1c32",GradientType=1)',
  pointerEvents: "none",
  columns: "-1/1",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  pt: "$4",
});

export default GradientBox;
