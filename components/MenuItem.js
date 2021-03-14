import Link from 'next/link';
import styled from 'styled-components';
import Text from './Text';
import { wipe, blink, variants } from './AnimationVariants';
import { motion } from 'framer-motion';

const StyledNavButton = styled(Text)`
  display: flex;
  align-items: baseline;
  transition: transform 1000ms ${({ theme }) => theme.ease.Smooth};
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
      box-shadow: inset -1px 0 0 ${({ theme }) => theme.colors.lightTheme.backgroundPrimary};
      animation: ${blink} 500ms ${({ theme }) => theme.ease.It} infinite alternate;
    }
  }
  &:hover {
    &:after {
      content: '';
      background: ${({ theme }) => theme.colors.lightTheme.backgroundPrimary};
      animation: ${wipe} 500ms ${({ theme }) => theme.ease.Smooth};
      height: 100%;
      width: 100%;
      transform: scaleX(0);
      position: absolute;
    }
  }
`

const MenuItem = ({ text, path, setOpen }) => {
  return (
    <span style={{ clipPath: 'inset(0%)', display: 'flex' }}>
      <Link href={path} passHref>
        <StyledNavButton
          color="lightTheme.contentInversePrimary"
          font={["Display", null, null, null, null, "HeadingLarge"]}
          as={motion.a}
          variants={variants.menuItem}
          onClick={() => setOpen(false)}
        >
          {text}
        </StyledNavButton>
      </Link>
    </span>
  );
};

export default MenuItem;