import styled from 'styled-components';
import Link from "next/link";
import { motion, useSpring, useTransform } from 'framer-motion';
import { Cross } from 'akar-icons';
import Box from './Box';

const Wrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: sticky;
  left: 50%;
  z-index: 98;
  transition: all 300ms ${({ theme }) => theme.ease.Smooth};
  border-radius: 50%;
  background-color: ${({ scrollY }) => scrollY > 24 ? 'rgba(255,255,255,0.55)' : 'none'};
  border: ${({ scrollY }) => scrollY > 24 ? '1px solid #AE922E' : 'none'};
  box-shadow: ${({ scrollY }) => scrollY > 24 ? '0 4px 8px 0px rgba(0,0,0,0.25)' : 'none'};
  backdrop-filter: blur(12px);
  &:hover {
    background-color: ${({ scrollY }) => scrollY > 24 ? 'rgba(255,255,255,1)' : 'none'};
    box-shadow: ${({ scrollY }) => scrollY > 24 ? '0 2px 4px 0px rgba(0,0,0,0.15)' : 'none'};
  }
  &:active {
    box-shadow: none;
  }
  svg {
    transition: all 300ms ${({ theme }) => theme.ease.Smooth};
  }
`

const ProgressWrapper = styled(Box)`
  pointer-events: none;
  svg {
    display: block;
  }
`

const CloseButton = ({ hookedYPosition, scrollYProgress }) => {
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const pathLength = useSpring(yRange, { stiffness: 400, damping: 80 });
  return (
    <Link href="/" passHref scroll={false}>
      <Wrapper
        as={motion.a}
        top="layout.1"
        size={hookedYPosition > 24 ? 48 : 32}
        color="lightTheme.contentPrimary"
        scrollY={hookedYPosition}
        initial={{ scale: 0, x: '-50%' }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Cross />
        <Box as="svg" position="absolute" size={60} top={-7} display="block" className="progress-icon" viewBox="0 0 48 48">
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke="#AE922E"
            strokeDasharray="0 1"
            d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
            style={{
              pathLength,
              rotate: 90,
              translateX: 4,
              translateY: 4,
              scaleX: -1 // Reverse direction of line animation
            }}
          />
        </Box>
      </Wrapper>
    </Link>
  )
}

export default CloseButton;