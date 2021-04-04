import Link from 'next/link';
import styled from 'styled-components';
import Text from './Text';
import { blink, variants } from './AnimationVariants';
import { motion } from 'framer-motion';

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
  &:focus {
    &:before {
      content: '';
      height:100%;
      width: 100%;
      position: absolute;
      box-shadow: inset -1px 0 0 ${props => props.theme.colors.bg.primary};
      animation: ${blink} 750ms ${props => props.theme.ease.It} infinite alternate;
    }
  }
  &:hover {
    &:after {
      transform: scaleX(1);
      transform-origin: 0%;
    }
  }
  &:after {
    content: '';
    position: absolute;
    background: ${props => props.theme.colors.bg.primary};
    transition: transform 250ms ${props => props.theme.ease.smooth};
    height: 100%;
    width: 100%;
    transform: scaleX(0);
    transform-origin: 100%;
  }
  sup {
    font-size: xxx-large;
  }
`

const MenuItem = ({ children, path, setOpen, style, title, color }) => {
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
          title={title}
        >
          {children}
        </StyledNavButton>
      </Link>
    </span>
  );
};

export default MenuItem;