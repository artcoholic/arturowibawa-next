import { useState, useEffect } from "react";
import { styled } from "../stitches.config";
import Link from "next/link";
import Box from "./Box";
import Text from "./Text";
import MenuContainer from "./MenuContainer";
import { Cross, Circle, TwoLineHorizontal } from "akar-icons";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import { getRootState } from "@react-three/fiber";

const Container = styled(Box, {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  pointerEvents: "none",
  width: "100%",
  top: 0,
  left: 0,
  zIndex: 99,
  p: "$1",
  position: "absolute",
  "@bp3": { position: "fixed" },

  a: {
    "&:after": {
      display: "none",
    },
  },
});

const Dot = styled(Box, {
  borderRadius: "50%",
  border: "none",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  pointerEvents: "auto",
  position: "relative",
  background: "none",
  zIndex: 99,
  outline: "none",
  padding: 0,
  size: "2rem",
  "&:before": {
    content: "",
    position: "absolute",
    left: 0,
    top: 0,
    size: "100%",
    borderRadius: "50%",
    transition: "all 500ms $ease$smooth",
  },
  "&:hover": {
    "&:before": {
      transform: "scale(1.2)",
    },
  },
  svg: {
    zIndex: 1,
    display: "block",
  },
  variants: {
    active: {
      true: {
        "&:before": {
          bg: "$bg_primary",
        },
      },
      false: {
        "&:before": {
          bg: "$bg_inversePrimary",
        },
      },
    },
  },
});

const Name = styled(Text, {
  textTransform: "uppercase",
  lineHeight: "1em",
  textAlign: "center",
  letterSpacing: 2,
  fontSize: ".75rem",
  "@bp5": { fontSize: "1rem" },
});

const Logo = styled("svg", {
  fill: "$fg_primary",
  display: "block",
});

const Burger = styled("span", {
  size: 14,
  display: "flex",
  flexFlow: "column nowrap",
  transition: "300ms ease-out",
  "&:before, &:after": {
    content: "",
    borderRadius: 1,
    display: "block",
    width: "100%",
    height: 2,
    bg: "$fg_tertiary",
    transition: "300ms ease-out",
    position: "absolute",
  },
  "&:before": {
    bottom: 3,
  },
  "&:after": {
    top: 3,
  },
  variants: {
    open: {
      true: {
        "&:before, &:after": {
          bg: "$fg_primary",
        },
        "&:before": {
          transform: "rotate(45deg) translate(-2px, -2px)",
        },
        "&:after": {
          transform: "rotate(135deg) translate(2px, -2px)",
        },
      },
      false: {
        "&:before, &:after": {
          bg: "$fg_tertiary",
        },
      },
    },
  },
});

const Header = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  });
  // console.log('Header');
  return (
    <Container as="header">
      <AnimatePresence>
        {open && <MenuContainer setOpen={setOpen} />}
      </AnimatePresence>
      <Link href="/" passHref>
        <a
          style={{ zIndex: 1, pointerEvents: "auto" }}
          title="Home"
          aria-label="Home"
        >
          <Logo
            width="32"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M27.47 23.406L20.083 3.064A1.656 1.656 0 0 0 18.517 2H6.493c-.389 0-.603.348-.464.712l.88 2.466c.74 2.27 1.026 3.148 1.02 4.025-.004.554-.125 1.107-.322 2.01-.018.085-.04.17-.064.256-.018.067-.036.135-.052.205a2.8 2.8 0 0 0 .097 1.582l5.936 16.156c.097.28.374.588.749.588H31.75c.18 0 .291-.168.236-.336l-.658-1.77a.746.746 0 0 0-.707-.504h-.014c-1.348 0-2.042-1.113-3.138-3.984zM6.26 21.152a.398.398 0 0 0-.749 0l-.41 1.078v-.001c-1.67 4.366-2.319 5.16-3.71 5.16H1.38a.746.746 0 0 0-.707.505l-.658 1.77C-.04 29.832.07 30 .25 30h8.627c.277 0 .472-.294.375-.56L6.26 21.152z"></path>
          </Logo>
        </a>
      </Link>
      {router.pathname.startsWith("/work") ||
      router.pathname.startsWith("/blog/[slug]") ? null : (
        <Name>Arturo • Wibawa</Name>
      )}
      <Dot
        as="button"
        active={open}
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        title="Menu"
      >
        <Box css={{ color: open ? "$fg_primary" : "$fg_inversePrimary" }}>
          <Burger open={open} />
        </Box>
      </Dot>
    </Container>
  );
};

export default Header;
