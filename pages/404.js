import Link from "next/link";
import { styled } from "../stitches.config";
import Box from "../components/Box";
import Text from "../components/Text";
import { motion } from "framer-motion";
import { variants } from "../components/AnimationVariants";

export default function Custom404() {
  return (
    <Box
      css={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      as={motion.div}
      variants={variants.main}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <Text
        css={{
          font: "$headingLarge",
          mb: 16,
          textAlign: "center",
          px: "$1",
        }}
      >
        Woah! You found 404
      </Text>
      <Wrapper href="/">Go back home</Wrapper>
      <Image src="/images/404.gif" />
    </Box>
  );
}

const Wrapper = styled(Link, {
  transition: "all 500ms $ease$smooth",
  borderRadius: 24,
  backgroundColor: "rgba(255,255,255,0.25)",
  border: "1px solid $colors$fg_secondary",
  boxShadow: "0 4px 8px 0px rgba(0,0,0,0.15)",
  backdropFilter: "blur(12px)",
  color: "$fg_primary",
  p: ".75rem 1rem",
  textDecoration: "none",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,1)",
  },
  "&:active": {
    boxShadow: "none",
  },
  "&:after": {
    display: "none",
  },
});

const Image = styled("img", {
  position: "absolute",
  bottom: 0,
  minWidth: 200,
  maxWidth: "20vw",
  pointerEvents: "none",
});
