import { styled, keyframes } from "../../stitches.config";
import Box from "../Box";
import Text from "../Text";

const animateThunder = keyframes({
  "0%": {
    transform: "scale(0.2) translate(20px, 20px)",
  },
  "40%": {
    transform: "scale(1.2) translate(20px, 20px)",
  },
  "100%": {
    transform: "scale(1) translate(20px, 20px)",
  },
});

const animateThunderOut = keyframes({
  "0%": {
    transform: "scale(1.4) translate(20px, 20px)",
  },
  "100%": {
    transform: "scale(1) translate(20px, 20px)",
  },
});

const animateCircle = keyframes({
  "40%": {
    transform: "scale(10)",
    opacity: 1,
    fill: "#dd4688",
  },
  "55%": {
    transform: "scale(11)",
    opacity: 1,
    fill: "#d46abf",
  },
  "65%": {
    transform: "scale(12)",
    opacity: 1,
    fill: "#cc8ef5",
  },
  "75%": {
    transform: "scale(13)",
    opacity: 1,
    fill: "transparent",
    stroke: "#cc8ef5",
    strokeWidth: 0.5,
  },
  "85%": {
    transform: "scale(17)",
    opacity: 1,
    fill: "transparent",
    stroke: "#cc8ef5",
    strokeWidth: 0.2,
  },
  "95%": {
    transform: "scale(18)",
    opacity: 1,
    fill: "transparent",
    stroke: "#cc8ef5",
    strokeWidth: 0.1,
  },
  "100%": {
    transform: "scale(19)",
    opacity: 1,
    fill: "transparent",
    stroke: "#cc8ef5",
    strokeWidth: 0,
  },
});

export const Wrapper = styled(Box, {
  display: "flex",
  alignItems: "center",
});

export const Tooltip = styled(Text, {
  position: "absolute",
  top: 0,
  fontSize: 12,
  padding: ".25rem .5rem",
  borderRadius: 4,
  left: "50%",
  transform: "translateX(-50%) translateY(-1em)",
  textTransform: "uppercase",
  transition: "all 0.15s ease-out",
  pointerEvents: "none",
  opacity: 0,
  display: "flex",
  justifyContent: "center",
  bg: "$bg_inversePrimary",
  color: "$fg_tertiary",
  "&::after": {
    content: "",
    position: "absolute",
    bottom: -4,
    width: 12,
    height: 12,
    backgroundColor: "$bg_inversePrimary",
    transform: "rotate(45deg)",
    transformOrigin: "center",
    borderRadius: 2,
    transition: "background-color 150ms ease-out",
    zIndex: -1,
  },
});

export const Button = styled(Box, {
  background: "none",
  cursor: "pointer",
  transition: "opacity 0.15s ease-out",
  "&:hover": {
    [`& ${Tooltip}`]: {
      transform: "translateX(-50%) translateY(-2em)",
      opacity: 1,
    },
  },
  svg: {
    display: "block",
    width: 60,
    overflow: "visible",
    ".thunder": {
      transformOrigin: "center",
    },
    "#main-circ": {
      transition: "all 2s",
      transformOrigin: "29px 29px",
    },
  },
  variants: {
    liked: {
      true: {
        ".thunder": {
          stroke: "$colors$zappedStroke",
          fill: "$colors$zappedFill",
          animation: `${animateThunder} 0.3s linear forwards`,
        },
        "#main-circ": {
          opacity: 1,
          animation: `${animateCircle} 0.3s linear forwards`,
        },
        "#grp1": {
          opacity: 1,
          transition: "0.1s all 0.3s",
          "#oval1": {
            transform: "scale(0) translate(0, -30px)",
            transformOrigin: "0 0 0",
            transition: "0.5s transform 0.3s",
          },
          "#oval2": {
            transform: "scale(0) translate(10px, -50px)",
            transformOrigin: "0 0 0",
            transition: "1.5s transform 0.3s",
          },
        },
        "#grp2": {
          opacity: 1,
          transition: "0.1s all 0.3s",
          "#oval1": {
            transform: "scale(0) translate(30px, -15px)",
            transformOrigin: "0 0 0",
            transition: "0.5s transform 0.3s",
          },
          "#oval2": {
            transform: "scale(0) translate(60px, -15px)",
            transformOrigin: "0 0 0",
            transition: "1.5s transform 0.3s",
          },
        },
        "#grp3": {
          opacity: 1,
          transition: "0.1s all 0.3s",
          "#oval1": {
            transform: "scale(0) translate(30px, 0px)",
            transformOrigin: "0 0 0",
            transition: "0.5s transform 0.3s",
          },
          "#oval2": {
            transform: "scale(0) translate(60px, 10px)",
            transformOrigin: "0 0 0",
            transition: "1.5s transform 0.3s",
          },
        },
        "#grp4": {
          opacity: 1,
          transition: "0.1s all 0.3s",
          "#oval1": {
            transform: "scale(0) translate(30px, 15px)",
            transformOrigin: "0 0 0",
            transition: "0.5s transform 0.3s",
          },
          "#oval2": {
            transform: "scale(0) translate(40px, 50px)",
            transformOrigin: "0 0 0",
            transition: "1.5s transform 0.3s",
          },
        },
        "#grp5": {
          opacity: 1,
          transition: "0.1s all 0.3s",
          "#oval1": {
            transform: "scale(0) translate(-10px, 20px)",
            transformOrigin: "0 0 0",
            transition: "0.5s transform 0.3s",
          },
          "#oval2": {
            transform: "scale(0) translate(-60px, 30px)",
            transformOrigin: "0 0 0",
            transition: "1.5s transform 0.3s",
          },
        },
        "#grp6": {
          opacity: 1,
          transition: "0.1s all 0.3s",
          "#oval1": {
            transform: "scale(0) translate(-30px, 0px)",
            transformOrigin: "0 0 0",
            transition: "0.5s transform 0.3s",
          },
          "#oval2": {
            transform: "scale(0) translate(-60px, -5px)",
            transformOrigin: "0 0 0",
            transition: "1.5s transform 0.3s",
          },
        },
        "#grp7": {
          opacity: 1,
          transition: "0.1s all 0.3s",
          "#oval1": {
            transform: "scale(0) translate(-30px, -15px)",
            transformOrigin: "0 0 0",
            transition: "0.5s transform 0.3s",
          },
          "#oval2": {
            transform: "scale(0) translate(-55px, -30px)",
            transformOrigin: "0 0 0",
            transition: "1.5s transform 0.3s",
          },
        },
        "#grp8": {
          opacity: 1,
          transition: "0.1s all 0.3s",
          "#oval1": {
            transform: "scale(0) translate(0px, 30px)",
            transformOrigin: "0 0 0",
            transition: "1.5s transform 0.3s",
          },
          "#oval2": {
            transform: "scale(0) translate(-10px, 50px)",
            transformOrigin: "0 0 0",
            transition: "1.5s transform 0.3s",
          },
        },
      },
      false: {
        ".thunder": {
          stroke: "$colors$fg_inverseSecondary",
          fill: "none",
          animation: `${animateThunderOut} 0.3s linear forwards`,
        },
        "#main-circ": {
          opacity: 0,
        },
      },
    },
  },
});
