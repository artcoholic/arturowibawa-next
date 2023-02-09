import { useEffect, useRef } from "react";
import { styled } from "../config/stitches.config";
import Image from "next/image";
import Box from "./Box";
import Text from "./Text";
import Link from "next/link";
import { variants, eyeLid, eyeBall } from "./AnimationVariants";
import { motion } from "framer-motion";
import VanillaTilt from "vanilla-tilt";

const EntryItem = ({ entry, index }) => {
  const ref = useRef();

  useEffect(() => {
    const node = ref.current;
    VanillaTilt.init(node, vanillaTiltOptions);
    return () => node.vanillaTilt.destroy();
  }, []);

  // console.log('EntryItem');
  return (
    <Box
      as={motion.article}
      variants={variants.entryItem}
      css={{
        display: "flex",
        mx: "$0_5",
        "@bp3": { mx: "$1" },
      }}
    >
      <Box
        css={{
          width: "50vw",
          minWidth: 240,
          maxWidth: 320,
          zIndex: 5,
          "@bp4": { maxWidth: 400 },
          "@bp5": { maxWidth: 600 },
        }}
      >
        <Tilt ref={ref}>
          <AnchorWrapper
            href={`/work/${entry.slug}`}
            aria-label={entry.info.title}
            style={{}}
          >
            <Image
              src={entry.info.image.url}
              alt={entry.info.title}
              width={40}
              height={50}
              layout="responsive"
              placeholder="blur"
              blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
              sizes="(max-width: 600px) 48vw, (max-width: 1023px) 96vw"
            />
          </AnchorWrapper>
          <IconWrapper className="icon-wrapper">
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="eye-lid"
                d="M21.257 10.962C21.731 11.582 21.731 12.419 21.257 13.038C19.764 14.987 16.182 19 12 19C7.81801 19 4.23601 14.987 2.74301 13.038C2.51239 12.7411 2.38721 12.3759 2.38721 12C2.38721 11.6241 2.51239 11.2589 2.74301 10.962C4.23601 9.013 7.81801 5 12 5C16.182 5 19.764 9.013 21.257 10.962V10.962Z"
                vectorEffect="non-scaling-stroke"
              />
              <path
                id="eye-ball"
                d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </IconWrapper>
        </Tilt>
        <Text
          as="h1"
          css={{
            typeScale: "$paragraphLarge",
            mt: ".5em",
            zIndex: 1,
            textAlign: "center",
          }}
        >
          {entry.info.title}
        </Text>
      </Box>
      {/* <Text
        css={{
          writingMode: "vertical-lr",
          textTransform: "uppercase",
          zIndex: 1,
          ml: ".5em",
          letterSpacing: 1,
          fontSize: 12,
          "@bp2": { fontSize: 16 },
        }}
      >
        0{index + 1} • {entry.info.category}
      </Text> */}
    </Box>
  );
};

export default EntryItem;

const Tilt = styled("div", {
  position: "relative",
  zIndex: 2,
  borderRadius: 16,
  transformStyle: "preserve-3d",
  ".js-tilt-glare": {
    borderRadius: "inherit",
  },
});

const AnchorWrapper = styled(Link, {
  position: "relative",
  display: "block",
  borderRadius: 16,
  overflow: "hidden",
  bg: "$bg_placeholder",
  transition: "all 500ms $ease$smooth",
  "&:hover": {
    bg: "$bg_entryCard",
    boxShadow: "0 16px 32px 0 $colors$bg_boxShadow",
    "~.icon-wrapper": {
      transform: "translate3d(-50%, -50%, 48px) scale(1)",
    },
  },
  "&:after": {
    display: "none",
  },
});

const IconWrapper = styled("div", {
  position: "absolute",
  top: "50%",
  left: "50%",
  bg: "white",
  padding: 16,
  borderRadius: "50%",
  transition: "transform 500ms $ease$smooth",
  border: "1px solid $colors$fg_inverseSecondary",
  transform: "translate3d(-50%, -50%, 48px) scale(0)",
  pointerEvents: "none",
  boxShadow: "0 16px 32px 0 $colors$bg_boxShadow",
  willChange: "transform",
  "& svg": {
    stroke: "#1B1C32",
    display: "block",
    size: "2vw",
    minSize: 24,
  },
  "& #eye-lid": {
    transformOrigin: "center",
    animation: `${eyeLid} 1500ms infinite alternate-reverse`,
  },
  "& #eye-ball": {
    animation: `${eyeBall} 1500ms infinite alternate-reverse`,
  },
});

const vanillaTiltOptions = {
  max: 6,
  perspective: 1000,
  speed: 500,
  glare: true,
  "max-glare": 0.25,
  scale: 1.1,
  reverse: true,
  easing: "cubic-bezier(.23,1,.32,1)",
};
