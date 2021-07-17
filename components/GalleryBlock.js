import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import styled from 'styled-components';
import { wrap } from "popmotion";
import { variants } from './AnimationVariants';
import Box from './Box';
import Text from './Text';
import { TriangleLeft, TriangleRight } from 'akar-icons';

const PaginationButton = styled(Box)`
  border: none;
  padding: 6px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  cursor: pointer;
  color: #1B1C32;
  background: none;
  transition: all 300ms ${props => props.theme.ease.Smooth};
  @media (min-width: ${props => props.theme.breakpoints[2]}) {
    padding: 12px;
    &:hover {
       svg {
        fill: #1B1C32;
      }
    }
  }
`

const PaginationNumber = styled(Text)`
  position: absolute;
  z-index: 1;
  color: #1B1C32;
  background: rgba(255,255,255,0.5);
  border-radius: 16px;
  backdrop-filter: blur(4px);
  font-family: var(--system-fonts);
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
          bg="bg.placeholder"
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
        left={["layout.1/4", null, "layout.1/2"]}
      >
        <TriangleLeft />
      </PaginationButton>
      <PaginationButton
        as="button"
        onClick={() => paginate(1)}
        right={["layout.1/4", null, "layout.1/2"]}
      >
        <TriangleRight />
      </PaginationButton>
      <PaginationNumber
        bottom="layout.1/2"
        fontSize={['.75rem', null, '1rem']}
        px={[6, null, 8]}
        py={[2, null, 4]}
      >
        {(page % images.length) + 1} of {images.length}
      </PaginationNumber>
    </>
  )
}

export default GalleryBlock;