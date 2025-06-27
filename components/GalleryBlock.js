import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { styled } from "../config/stitches.config";
import { wrap } from "popmotion";
import { variants } from "./AnimationVariants";
import Box from "./Box";
import Text from "./Text";
import { TriangleLeft, TriangleRight } from "akar-icons";

const PaginationButton = styled(Box, {
  border: "none",
  padding: 6,
  borderRadius: "50%",
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 1,
  cursor: "pointer",
  color: "#1B1C32",
  background: "none",
  transition: "all 300ms $ease$smooth",
  background: "rgba(255, 255, 255, 0.5)",
  backdropFilter: "blur(4px)",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  "@bp2": {
    padding: 12,
    "&:hover": {
      background: "white",
      svg: {
        fill: "#1B1C32",
      },
    },
  },
});

const PaginationNumber = styled(Text, {
  position: "absolute",
  zIndex: 1,
  color: "#1b1c32",
  background: "rgba(255, 255, 255, 0.5)",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  borderRadius: 20,
  backdropFilter: "blur(4px)",
  bottom: "$0_5",
  fontSize: ".75rem",
  px: 10,
  py: 4,
  "@bp2": { fontSize: "1rem" },
});

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const GalleryBlock = ({ item }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const images = item.assetsCollection.items.map((a) => a.url);

  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  // console.log('GalleryBlock');
  return (
    <>
      <AnimatePresence initial={false} custom={direction}>
        <Box
          as={motion.img}
          css={{
            borderRadius: 8,
            "@bp2": { borderRadius: 16 },
            width: "100%",
            bg: "bg.placeholder",
            position: "absolute",
          }}
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants.gallery}
          initial="initial"
          animate="enter"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 400, damping: 40 },
            opacity: { duration: 0.3 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          alt={item.title || "Gallery Image"}
        />
      </AnimatePresence>
      <PaginationButton
        as="button"
        onClick={() => paginate(-1)}
        css={{
          left: "$0_5",
          "@bp2": { left: "$1" },
        }}
      >
        <TriangleLeft style={{ display: "block" }} />
      </PaginationButton>
      <PaginationButton
        as="button"
        onClick={() => paginate(1)}
        css={{
          right: "$0_5",
          "@bp2": { right: "$1" },
        }}
      >
        <TriangleRight style={{ display: "block" }} />
      </PaginationButton>
      <PaginationNumber>
        {(Math.abs(page) % images.length) + 1} of {images.length}
      </PaginationNumber>
    </>
  );
};

export default GalleryBlock;
