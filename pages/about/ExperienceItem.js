import React from "react";
import { styled } from "../../config/stitches.config";
import Box from "../../components/Box";
import Text from "../../components/Text";

const Dot = styled(Box, {
  width: 5,
  height: 5,
  borderRadius: 1,
  flexShrink: 0,
  transform: "rotate(45deg)",
  background: "$fg_inverseSecondary",
  marginBottom: 8,
});

const Line = styled(Box, {
  width: 1,
  height: "100%",
  background: "$fg_inverseSecondary",
});

const ExperienceItem = ({ position, date, mt, line, timeline }) => (
  <Box css={{ mt: mt ? 8 : 0, display: "flex" }}>
    <Box
      css={{
        flexDirection: "column",
        alignItems: "center",
        mt: 10,
        mr: 12,
        display: timeline === false ? "none" : "flex",
      }}
    >
      <Dot />
      <Line css={{ display: line === false ? "none" : "block" }} />
    </Box>
    <Box css={{ mb: "$0_125" }}>
      <Text
        css={{ typeScale: "$paragraphSmall", color: "$fg_inverseTertiary" }}
      >
        {position}
      </Text>
      <Text
        css={{ typeScale: "$paragraphSmall", color: "$fg_inverseTertiary" }}
      >
        {date}
      </Text>
    </Box>
  </Box>
);

export default ExperienceItem;
