import React, { useRef, useCallback, useState, useEffect } from "react";
import { styled } from "../stitches.config";
import { motion } from "framer-motion";
import { variants } from "./AnimationVariants";
import Box from "./Box";

const InfiniteScrollLoop = ({ scrollRef, onPan, children }) => {
  const contentRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  const handleScrollHorizontal = useCallback(() => {
    if (scrollRef.current) {
      const scroll = scrollRef.current.scrollLeft;
      if (scroll >= width * 2 || scroll === 0) {
        scrollRef.current.scrollLeft = width + (scroll % width);
      }
    }
  }, [width]);

  const onResize = useCallback((entries) => {
    for (let entry of entries) {
      setWidth(entry.contentRect.width);
    }
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      setWidth(contentRef.current.offsetWidth);
      scrollRef.current.scrollLeft = viewportWidth > 1280 ? width : 0;
    }
  }, [contentRef.current]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      onResize(entries);
    });
    resizeObserver.observe(contentRef.current);
    return () => resizeObserver.disconnect();
  }, [onResize]);

  useEffect(() => {
    setViewportWidth(window.innerWidth);
    const handleWindowResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <HorizontalContainer
      ref={scrollRef}
      onScroll={viewportWidth > 1280 ? handleScrollHorizontal : null}
      as={motion.div}
      onPan={onPan}
    >
      {viewportWidth > 1280
        ? Array(1)
            .fill()
            .map(() => (
              <div style={styles} key="backup-1">
                {children}
              </div>
            ))
        : null}
      <Box
        as={motion.div}
        key="main"
        ref={contentRef}
        variants={variants.entryList}
        css={{
          display: "flex",
          mx: "$0_5",
          "@bp3": { mx: 0 },
        }}
      >
        {children}
      </Box>
      {viewportWidth > 1280
        ? Array(1)
            .fill()
            .map(() => (
              <div style={styles} key="backup-2">
                {children}
              </div>
            ))
        : null}
    </HorizontalContainer>
  );
};

export default InfiniteScrollLoop;

const HorizontalContainer = styled("div", {
  display: "flex",
  flexFlow: "row nowrap",
  alignItems: "center",
  height: "100vh",
  maxHeight: "-webkit-fill-available",
  cursor: "grab",
  overflow: "scroll",
  scrollbarWidth: "none",
  userSelect: "none",
  "&:active": {
    cursor: "grabbing",
  },
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const styles = {
  display: "flex",
};
