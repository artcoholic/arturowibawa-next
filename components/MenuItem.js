import Link from 'next/link';
import styled from 'styled-components';
import Box from './Box';
import Text from './Text';
import { variants } from './AnimationVariants';
import { motion } from 'framer-motion';
import { ArrowRight } from 'akar-icons';

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
  &:hover {
    .svgContainer {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .svgContainer {
    transition: all 250ms ${props => props.theme.ease.Smooth};
    transform: translateX(0em);
     @media (min-width: ${props => props.theme.breakpoints[2]}) { // 1280
      transform: translateX(-1em);
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
          size=".75em"
          className="svgContainer"
          opacity={[1, null, null, 0]}
        >
          <ArrowRight size="100%" strokeWidth={1} />
        </Box>
      </StyledNavButton>
    </Link>
  );
};

export default MenuItem;