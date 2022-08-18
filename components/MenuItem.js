import { useRef, useState } from "react";
import Link from "next/link";
import { styled, keyframes } from "../stitches.config";
import { variants } from "./AnimationVariants";
import { motion } from "framer-motion";
import { closestEdge } from "../utils/ClosestEdge";

const marquee = keyframes({
  "100%": {
    transform: "translate3d(-50%, 0, 0)",
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
  "@bp3": { py: "$0_25" },
  font: "$display",
  "@bp5": { font: "$headingLarge" },

  "&:hover": {
    ".marquee": {
      transform: "translateY(0%)",
      ".marquee__inner-wrap": {
        transform: "translateY(0%)",
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

    ".marquee__inner-wrap": {
      height: "100%",
      width: "100%",
      transition: "transform 500ms $ease$it",

      ".marquee__inner": {
        height: "100%",
        width: "fit-content",
        alignItems: "center",
        display: "flex",
        position: "relative",
        animation: `${marquee} 20s linear infinite`,
        willChange: "transform",
        gap: "2rem",

        span: {
          color: "$fg_inverseTertiary",
          fontFamily: "Whyte Light",
          whiteSpace: "nowrap",
          textTransform: "uppercase",
        },

        img: {
          height: ".9em",
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

const MenuItem = ({
  children,
  path,
  setOpen,
  title,
  keyword_1,
  keyword_2,
  keyword_3,
  keyword_4,
}) => {
  const [edge, setEdge] = useState("bottom");
  const ref = useRef(null);
  function findClosestEdge(ev, node) {
    const x = ev.pageX - node.offsetLeft;
    const y = ev.pageY - node.offsetTop;
    return closestEdge(x, y, node.clientWidth, node.clientHeight);
  }
  // console.log('MenuItem');
  return (
    <Link href={path} passHref>
      <Container
        as={motion.a}
        variants={variants.menuItem}
        onClick={() => setOpen(false)}
        aria-label={title}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 100,
        }}
        edge={edge}
        ref={ref}
        onHoverStart={(ev) => setEdge(findClosestEdge(ev, ref.current))}
        onHoverEnd={(ev) => setEdge(findClosestEdge(ev, ref.current))}
      >
        {children}
        <div className="marquee">
          <div className="marquee__inner-wrap">
            <div className="marquee__inner" aria-hidden="true">
              <span>{keyword_1}</span>
              <img src={`/images/menu/${keyword_4}-01.png`} alt="menu icon" />
              <span>{keyword_2}</span>
              <img src={`/images/menu/${keyword_4}-02.png`} alt="menu icon" />
              <span>{keyword_3}</span>
              <img src={`/images/menu/${keyword_4}-03.png`} alt="menu icon" />
              <span>{keyword_4}</span>
              <img src={`/images/menu/${keyword_4}-04.png`} alt="menu icon" />
              <span>{keyword_1}</span>
              <img src={`/images/menu/${keyword_4}-01.png`} alt="menu icon" />
              <span>{keyword_2}</span>
              <img src={`/images/menu/${keyword_4}-02.png`} alt="menu icon" />
              <span>{keyword_3}</span>
              <img src={`/images/menu/${keyword_4}-03.png`} alt="menu icon" />
              <span>{keyword_4}</span>
              <img src={`/images/menu/${keyword_4}-04.png`} alt="menu icon" />
            </div>
          </div>
        </div>
      </Container>
    </Link>
  );
};

export default MenuItem;
