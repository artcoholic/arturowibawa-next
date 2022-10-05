import React, { useRef, useCallback, useState, useEffect } from "react";
import { styled } from "../stitches.config";
import { motion } from "framer-motion";
import { variants } from "../components/AnimationVariants";

const InfiniteScrollLoop = ({
  scrollRef,
  onPan,
  children,
  scrollXProgress,
}) => {
  const contentRef = useRef(null);
  const [width, setWidth] = useState(0);

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
      scrollRef.current.scrollLeft = width;
    }
  }, [contentRef.current]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      onResize(entries);
    });
    resizeObserver.observe(contentRef.current);
    return () => resizeObserver.disconnect();
  }, [onResize]);

  return (
    <HorizontalContainer
      ref={scrollRef}
      onScroll={handleScrollHorizontal}
      as={motion.div}
      onPan={onPan}
    >
      {Array(1)
        .fill()
        .map(() => (
          <div style={styles} key="backup-1">
            {children}
          </div>
        ))}
      <motion.div
        style={styles}
        key="main"
        ref={contentRef}
        variants={variants.entryList}
      >
        {children}
      </motion.div>
      {Array(1)
        .fill()
        .map(() => (
          <div style={styles} key="backup-2">
            {children}
          </div>
        ))}
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
