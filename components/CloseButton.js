import styled from 'styled-components';
import Link from "next/link";
import { motion, useSpring } from 'framer-motion';
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
  background-color: rgba(255,255,255,0.25);
  border: 1px solid var(--contentSecondary);
  box-shadow: 0 4px 8px 0px rgba(0,0,0,0.15);
  backdrop-filter: blur(12px);
  &:hover {
    background-color: rgba(255,255,255,1);
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
  const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });
  // console.log('CloseButton');
  return (
    <Link href={path} passHref scroll={false}>
      <Wrapper
        as={motion.a}
        top="layout.1"
        size={48}
        color="content.primary"
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