import React from "react";
import Link from "next/link";
import { styled } from "../stitches.config";
import { motion } from "framer-motion";
import Text from "./Text";
import Box from "./Box";
import { ArrowForwardThickFill, ArrowLeft, ArrowRight } from "akar-icons";

const ButtonWrapper = styled(Text, {
  textDecoration: "none",
  display: "flex",
  height: 56,
  alignItems: "center",
  justifyContent: "space-between",
  border: "1px solid $fg_secondary",
  boxShadow: "0 4px 8px 0px rgba(0,0,0,0.15)",
  transition: "all 300ms $ease$button",
  borderRadius: 28,
  backgroundColor: "rgba(255,255,255,0.5)",
  overflow: "hidden",
  pointerEvents: "auto",
  backdropFilter: "blur(12px)",
  px: "1rem",
  "@bp2": { px: "1.5rem" },
  "&:hover": {
    backgroundColor: "rgba(255,255,255,1)",
  },
  "&:active": {
    boxShadow: "none",
  },
  "&:after": {
    display: "none",
  },

  "&.previous, &.next": {
    color: "#1B1C32",
    width: 56,
    justifyContent: "center",
    "&::before": {
      transition: "all 300ms $ease$button",
      position: "absolute",
      opacity: 0,
    },
    svg: {
      flexShrink: 0,
    },
  },
  "&.previous": {
    flexDirection: "row-reverse",
    "&:before": {
      content: "PREV",
      marginLeft: ".25rem",
    },
    "&:hover": {
      width: 106,
      "&:before": {
        position: "relative",
        opacity: 1,
      },
    },
  },
  "&.next": {
    "&:before": {
      content: "NEXT",
      marginRight: ".25rem",
    },
    "&:hover": {
      width: 106,
      "&:before": {
        position: "relative",
        opacity: 1,
      },
    },
  },
});

const DynamicUI = ({ entry, prevUrl, nextUrl }) => {
  // console.log('ProjectSlugUI');
  return (
    <Box
      as={motion.div}
      css={{
        position: "fixed",
        zIndex: 98,
        width: "100%",
        bottom: 0,
        p: "$0_5",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        pointerEvents: "none",
      }}
      initial={{ y: 92 }}
      animate={{ y: 0 }}
      exit={{ y: 92 }}
      transition={{ type: "spring", stiffness: 300, damping: 50 }}
    >
      <Box css={{ display: "flex" }}>
        <Link href={`/work/${prevUrl}`} passHref>
          <ButtonWrapper as="a" className="previous" css={{ mr: ".5rem" }}>
            <ArrowLeft />
          </ButtonWrapper>
        </Link>
        <Link href={`/work/${nextUrl}`} passHref>
          <ButtonWrapper className="next" as="a" css={{ mr: "1.5rem" }}>
            <ArrowRight />
          </ButtonWrapper>
        </Link>
      </Box>
      <ButtonWrapper
        as={motion.a}
        href={entry.info.url}
        target="_blank"
        css={{
          cursor: entry.info.url ? "pointer" : "not-allowed",
          px: "1.5rem",
          minWidth: 0,
        }}
      >
        <Box
          as={motion.div}
          css={{
            display: "flex",
            flexDirection: "column",
            pt: 4,
            minWidth: 0,
          }}
        >
          <Text
            css={{
              letterSpacing: 1.2,
              fontSize: 8,
              fontWeight: "bold",
              color: "#1B1C32",
              textTransform: "uppercase",
            }}
          >
            Visit
          </Text>
          <Text
            css={{
              color: "#1B1C32",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {entry.info.url ? entry.title : "Unavailable"}
          </Text>
        </Box>
        {entry.info.url && (
          <Box as={motion.div} css={{ minWidth: 24, ml: "1rem" }}>
            <ArrowForwardThickFill
              color="#1B1C32"
              style={{ display: "block" }}
            />
          </Box>
        )}
      </ButtonWrapper>
    </Box>
  );
};

export default DynamicUI;
