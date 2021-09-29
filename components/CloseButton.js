import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from "next/link";
import { motion, useSpring, useTransform } from 'framer-motion';
import { Cross } from 'akar-icons';
import Box from './Box';

const Wrapper = styled(Box)`
  --contentSecondary: ${props => props.theme.colors.content.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  left: 50%;
  z-index: 98;
  transition: all 500ms ${props => props.theme.ease.Smooth};
  border-radius: 50%;
  background-color: ${({ scrollY }) => scrollY > 0 ? 'rgba(255,255,255,0.25)' : 'none'};
  border: ${({ scrollY }) => scrollY > 0 ? '1px solid var(--contentSecondary)' : 'none'};
  box-shadow: ${({ scrollY }) => scrollY > 0 ? '0 4px 8px 0px rgba(0,0,0,0.15)' : 'none'};
  backdrop-filter: ${({ scrollY }) => scrollY > 0 ? 'blur(12px)' : 'none'};
  &:hover {
    background-color: ${({ scrollY }) => scrollY > 0 ? 'rgba(255,255,255,1)' : 'none'};
  }
  &:active {
    box-shadow: none;
  }
  svg {
    transition: all 300ms ${props => props.theme.ease.Smooth};
  }
  .path {
    stroke: ${props => props.theme.colors.content.secondary};
  }
  &:after {
    display: none;
  }
`

const CloseButton = ({ scrollYProgress, path }) => {
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const pathLength = useSpring(yRange, { stiffness: 400, damping: 40 });
  const [yPos, setYPos] = useState(0);
  useEffect(() => {
    const unsubsribe = scrollYProgress.onChange((y) => {
      setYPos(y);
    });
    return () => {
      unsubsribe();
    }
  }, []);
  return (
    <Link href={path} passHref scroll={false}>
      <Wrapper
        as={motion.a}
        top="layout.1"
        size={yPos > 0 ? 48 : 32}
        color="content.primary"
        scrollY={yPos}
        initial={{ scale: 0, x: '-50%' }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <Cross />
        <Box as="svg" position="absolute" size={48} display="block" className="progress-icon" viewBox="-23 -23 46 46" overflow="visible">
          <motion.path
            fill="none"
            className="path"
            strokeWidth="2"
            strokeDasharray="0 1"
            d="M -24 0 a 24 24 0 1 0 48 0 a 24 24 0 1 0 -48 0"
            style={{
              pathLength,
              rotate: 90,
              scaleX: -1 // Reverse direction of line animation
            }}
          />
        </Box>
      </Wrapper>
    </Link>
  )
}

export default CloseButton;