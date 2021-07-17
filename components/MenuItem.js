import Link from 'next/link';
import styled from 'styled-components';
import Box from './Box';
import Text from './Text';
import { variants } from './AnimationVariants';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'akar-icons';

const StyledNavButton = styled(Text)`
  display: flex;
  align-items: baseline;
  transition: transform 1000ms ${props => props.theme.ease.Smooth};
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  padding: 0;
  text-decoration: none;
  &:hover, &:focus {
    .hovered-element {
      transform: translateX(0%);
      transform-origin: 100%;
    }
  }
  .hovered-element {
    position: absolute;
    left: 0;
    top: 0;
    background: ${props => props.theme.colors.bg.primary};
    transition: transform 300ms ${props => props.theme.ease.Smooth};
    height: 100%;
    width: 100%;
    transform: translateX(-101%);
    transform-origin: 0%;
    color: ${props => props.theme.colors.content.inverseTertiary};
    padding: ${props => props.theme.space.layout['1/2']};
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    box-sizing: inherit;
    span {
      display: none;
    }
    svg {
      position: absolute;
      top: -8px;
      right: -8px;
    }
  }
`


const MenuItem = ({ children, path, index, setOpen, style, title, color }) => {
  return (
    <span style={{ clipPath: 'inset(0%)', display: 'flex' }}>
      <Link href={path} passHref>
        <StyledNavButton
          color={color || "content.inversePrimary"}
          font={["Display", null, null, null, null, "HeadingLarge"]}
          as={motion.a}
          variants={variants.menuItem}
          onClick={() => setOpen(false)}
          style={style}
          aria-label={title}
        >
          {children}
          <Box className="hovered-element">
            <Box
              display={["none", null, "flex"]}
              justifyContent="space-between"
            >
              <Text fontSize={3} color="inverse.tertiary">_00{index}</Text>
              <ArrowUpRight strokeWidth={1.5} />
            </Box>
            <Text color="content.inverseTertiary" fontSize={[null, null, 6, 8]} display={["none", null, "block"]}>{title}</Text>
          </Box>
        </StyledNavButton>
      </Link>
    </span>
  );
};

export default MenuItem;