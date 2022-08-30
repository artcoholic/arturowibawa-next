import React, {
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
  useRef,
} from "react";
import ResizeObserver from "resize-observer-polyfill";
import { useScroll, useTransform, useSpring, motion } from "framer-motion";
import Box from "../components/Box";

const SmoothScroll = ({ children, css }) => {
  const scrollRef = useRef(null);
  const ghostRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);

  useEffect(() => {
    scrollRef && setScrollRange(scrollRef.current.scrollWidth);
  }, [scrollRef]);

  const onResize = useCallback((entries) => {
    for (let entry of entries) {
      setPageWidth(entry.contentRect.width);
    }
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      onResize(entries);
    });
    resizeObserver.observe(ghostRef.current);
    return () => resizeObserver.disconnect();
  }, [onResize]);

  const { scrollYProgress } = useScroll();
  const transform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -scrollRange + pageWidth]
  );

  const physics = { damping: 15, mass: 0.27, stiffness: 55 };

  const spring = useSpring(transform, physics);

  return (
    <>
      <Box as={motion.div} ref={scrollRef} style={{ x: spring }} css={css}>
        {children}
      </Box>
      <Box
        ref={ghostRef}
        style={{
          height: scrollRange,
        }}
      />
    </>
  );
};

export default SmoothScroll;
