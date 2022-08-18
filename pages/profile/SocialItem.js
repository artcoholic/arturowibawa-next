import React from "react";
import { styled } from "../../stitches.config";
import Box from "../../components/Box";
import Text from "../../components/Text";

const SocialItemWrapper = styled(Box, {
  display: "flex",
  flexFlow: "row nowrap",
  justifyContent: "space-between",
  textDecoration: "none",
  alignItems: "baseline",
  borderBottom: "1px solid $bg_placeholder",
  paddingBottom: ".5em",
  mb: "$0_5",
  "&:hover": {
    "&:before": {
      transform: "scaleX(1)",
      transformOrigin: "left",
    },
    ".social": {
      color: "$fg_inverseTertiary",
    },
  },
  "&:before": {
    content: "",
    position: "absolute",
    width: "100%",
    height: 1,
    backgroundColor: "$fg_primary",
    bottom: 0,
    left: 0,
    transform: "scaleX(0)",
    transition: "transform 300ms $ease$smooth",
    transformOrigin: "right",
  },
  "&:after": {
    display: "none",
  },
});

const SocialItem = ({ label, social, href }) => {
  return (
    <SocialItemWrapper as="a" href={href} target="_blank">
      <Text css={{ color: "$fg_inverseTertiary" }}>{label}</Text>
      <Text
        className="social"
        css={{ typeScale: "$paragraphSmall", color: "$fg_inverseSecondary" }}
      >
        {social}
      </Text>
    </SocialItemWrapper>
  );
};

export default SocialItem;
