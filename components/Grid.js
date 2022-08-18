import { styled } from "../stitches.config";

const Grid = styled("div", {
  display: "grid",
  gridColumnGap: `var(--gutter)`,
  gridTemplateColumns: "repeat(var(--columns), 1fr)",
});

export default Grid;
