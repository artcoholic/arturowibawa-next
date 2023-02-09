import Link from "next/link";
import { styled } from "../config/stitches.config";
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
      <Image src="/images/404.gif" alt="404" />
    </Box>
  );
}

const Wrapper = styled(Link, {
  borderRadius: 32,
  bg: "none",
  border: "1px solid $colors$fg_secondary",
  color: "$fg_primary",
  p: "1rem 2rem",
  typeScale: "$paragraphMedium",
  cursor: "pointer",
  mt: "$0_25",
  transition: "all 500ms $ease$smooth",
  "&:hover": {
    backgroundColor: "$fg_primary",
    color: "$fg_inversePrimary",
    borderColor: "$fg_primary",
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
