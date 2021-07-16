import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import styled from 'styled-components';
import { wrap } from "popmotion";
import { variants } from './AnimationVariants';
import Box from './Box';
import { TriangleLeft, TriangleRight } from 'akar-icons';

const PaginationButton = styled(Box)`
  border: none;
  padding: 14px;
  border-radius: 50%;
  position: absolute;
  z-index: 2;
  cursor: pointer;
  color: #1B1C32;
  background: rgba(255,255,255,0.5);
  backdrop-filter: blur(4px);
  border: 1px solid ${props => props.theme.colors.content.tertiary};
  transition: all 500ms ${props => props.theme.ease.Smooth};
  &:hover {
    background: white;
    svg {
      fill: #1B1C32;
    }
  }
`

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const GalleryBlock = ({ item }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const images = item.assetsCollection.items.map(a => a.url);

  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };
  return (
    <>
      <AnimatePresence initial={false} custom={direction}>
        <Box
          as={motion.img}
          borderRadius={[8, null, 16]}
          width="100%"
          position="absolute"
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants.gallery}
          initial="initial"
          animate="enter"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 400, damping: 40 },
            opacity: { duration: .3 }
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
        />
      </AnimatePresence>
      <PaginationButton
        as="button"
        onClick={() => paginate(-1)}
        left="layout.1"
      >
        <TriangleLeft size={28} strokeWidth={1.5} />
      </PaginationButton>
      <PaginationButton
        as="button"
        onClick={() => paginate(1)}
        right="layout.1"
      >
        <TriangleRight size={28} strokeWidth={1.5} />
      </PaginationButton>
    </>
  )
}

export default GalleryBlock;