import { styled } from "../stitches.config";
import Link from "next/link";
import { motion, useSpring } from "framer-motion";
import { Cross } from "akar-icons";
import Box from "./Box";

const Wrapper = styled(Box, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  position: "fixed",
  left: "50%",
  zIndex: 98,
  transition: "all 500ms $ease$smooth",
  borderRadius: "50%",
  backgroundColor: "rgba(255,255,255,0.25)",
  border: "1px solid $colors$fg_secondary",
  boxShadow: "0 4px 8px 0px rgba(0,0,0,0.15)",
  backdropFilter: "blur(12px)",
  color: "$fg_secondary",
  size: 48,
  top: "$1",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,1)",
  },
  "&:active": {
    boxShadow: "none",
  },
  svg: {
    transition: "all 300ms $ease$smooth",
  },
  ".path": {
    stroke: "$fg_secondary",
  },
  "&:after": {
    display: "none",
  },
});

const CloseButton = ({ scrollYProgress, path }) => {
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
  });
  // console.log('CloseButton');
  return (
    <Link href={path} passHref scroll={false}>
      <Wrapper
        as={motion.a}
        initial={{ scale: 0, x: "-50%" }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <Cross />
        <Box
          as="svg"
          css={{
            position: "absolute",
            size: 48,
            display: "block",
            overflow: "visible",
          }}
          viewBox="-23 -23 46 46"
        >
          <motion.path
            fill="none"
            className="path"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="0"
            d="M -24 0 a 24 24 0 1 0 48 0 a 24 24 0 1 0 -48 0"
            style={{
              pathLength,
              rotate: 90,
              scaleX: -1, // Reverse direction of line animation
            }}
          />
        </Box>
      </Wrapper>
    </Link>
  );
};

export default CloseButton;
