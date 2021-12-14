import Link from 'next/link';
import styled from 'styled-components';
import Box from './Box';
import Text from './Text';
import { variants } from './AnimationVariants';
import { motion } from 'framer-motion';

const StyledNavButton = styled(Text)`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  cursor: pointer;
  background: none;
  outline: none;
  width: 100%;
  text-decoration: none;
  border-top: 1px solid ${props => props.theme.colors.content.inversePrimary};
  &:hover, &:active {
    background: ${props => props.theme.colors.bg.inverseTertiary};
    .svgContainer {
      opacity: 1;
      transform: translateX(0);
    }
  }
  &:after {
    display: none;
  }
  
  .svgContainer {
    transition: all 150ms ${props => props.theme.ease.Btn};
    transform: translateX(0em);
     @media (min-width: ${props => props.theme.breakpoints[2]}) { // 1280
      transform: translateX(-.5em);
    }
  }
`


const MenuItem = ({ children, path, index, setOpen, title, color }) => {
  return (
    <Link href={path} passHref>
      <StyledNavButton
        color={color || "content.inversePrimary"}
        font={["Display", null, null, null, null, "HeadingLarge"]}
        as={motion.a}
        variants={variants.menuItem}
        onClick={() => setOpen(false)}
        aria-label={title}
        px="layout.1"
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 100,
        }}
      >
        {children}
        <Box
          className="svgContainer"
          opacity={[1, null, null, 0]}
        >
          →
        </Box>
      </StyledNavButton>
    </Link>
  );
};

export default MenuItem;