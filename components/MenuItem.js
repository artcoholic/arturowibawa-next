import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { styled, keyframes } from "../config/stitches.config";
import { variants } from "./AnimationVariants";
import { motion } from "framer-motion";
import { closestEdge } from "../libs/closestEdge";

const MenuItem = ({ path, setOpen, title }) => {
  const [edge, setEdge] = useState("");

  const ref = useRef();

  function findClosestEdge(ev, node) {
    const x = ev.pageX - node.offsetLeft;
    const y = ev.pageY - node.offsetTop;
    return closestEdge(x, y, node.clientWidth, node.clientHeight);
  }

  const onHover = (ev) => {
    setEdge(findClosestEdge(ev, ref.current));
  };

  // console.log('MenuItem');

  return (
    <Link href={path} ref={ref}>
      <Container
        as={motion.div}
        variants={variants.menuItem}
        onClick={() => setOpen(false)}
        aria-label={title}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 100,
        }}
        edge={edge}
        onHoverStart={onHover}
        onHoverEnd={onHover}
      >
        {title}
        <div className="marquee">
          <div className="marquee__inner-wrap">
            <div className="marquee__inner" aria-hidden="true">
              <span>{title}</span>
              <span>{title}</span>
              <span>{title}</span>
              <span>{title}</span>
              <span>{title}</span>
              <span>{title}</span>
              <span>{title}</span>
              <span>{title}</span>
            </div>
          </div>
        </div>
      </Container>
    </Link>
  );
};

export default MenuItem;

const marquee = keyframes({
  "0%": {
    transform: "translate3d(var(--move-initial), 0, 0)",
  },
  "100%": {
    transform: "translate3d(var(--move-final), 0, 0)",
  },
});

const Container = styled("div", {
  position: "relative",
  background: "none",
  outline: "none",
  width: "100vw",
  textDecoration: "none",
  overflow: "hidden",
  borderTop: "1px solid $fg_inversePrimary",
  color: "$fg_inversePrimary",
  px: "$1",
  py: "$0_5",
  font: "$display",
  "@bp3": { py: "$0_25" },
  "@bp5": { font: "$headingLarge" },

  "&:hover": {
    ".marquee": {
      transform: "translateY(0%)",
      ".marquee__inner-wrap": {
        transform: "translateY(0%)",
        ".marquee__inner": {
          animationPlayState: "running",
        },
      },
    },
  },

  ".marquee": {
    position: "absolute",
    top: 0,
    left: 0,
    overflow: "hidden",
    size: "100%",
    pointerEvents: "none",
    background: "$bg_primary",
    transition: "transform 500ms $ease$it",
    transform: "translateY(101%)",
    "--move-initial": "calc(-25% - .5em)",
    "--move-final": "calc(-50% - .5em)",

    ".marquee__inner-wrap": {
      position: "relative",
      height: "100%",
      width: "100%",
      transition: "transform 500ms $ease$it",

      ".marquee__inner": {
        height: "100%",
        width: "fit-content",
        alignItems: "center",
        display: "flex",
        position: "relative",
        transform: "translate3d(var(--move-initial), 0, 0)",
        animation: `${marquee} 10s linear infinite`,
        willChange: "transform",
        animationPlayState: "paused",

        span: {
          color: "$fg_inverseTertiary",
          fontFamily: "Whyte Inktrap Thin",
          whiteSpace: "nowrap",
          textTransform: "uppercase",
          marginRight: ".5em",
        },
      },
    },
  },

  variants: {
    edge: {
      top: {
        ".marquee": {
          transform: "translateY(-101%)",
          ".marquee__inner-wrap": {
            transform: "translateY(200%)",
          },
        },
      },
      bottom: {
        ".marquee": {
          transform: "translateY(101%)",
          ".marquee__inner-wrap": {
            transform: "translateY(-200%)",
          },
        },
      },
    },
  },
});
