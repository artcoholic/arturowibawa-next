import { useState } from 'react'
import styled from 'styled-components';
import Link from 'next/link';
import Box from './Box';
import Text from './Text';
import MenuContainer from './MenuContainer';
import { Cross, Circle } from 'akar-icons';
import { useRouter } from 'next/router';

const Container = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events:none;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

const Dot = styled(Box)`
  --bgPrimary: ${props => props.theme.colors.bg.primary};
  --bgInversePrimary: ${props => props.theme.colors.bg.inversePrimary};
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
  position: relative;
  background: none;
  z-index:99;
  outline: none;
  padding: 0;
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: ${({ open }) => open ? 'var(--bgPrimary)' : 'var(--bgInversePrimary)'};
    transition: all 500ms ${({ theme }) => theme.ease.Smooth};
  }
  &:hover {
    &:before {
    transform: scale(1.2);
    }
  }
  svg {
    z-index: 1;
    display: block;
  }
`

const Name = styled(Text)`
  text-transform: uppercase;
  line-height: 1em;
  text-align: center;
  letter-spacing: 1px;
`

const Logo = styled.svg`
  fill: ${props => props.theme.colors.content.primary};
  display: block;
`

const Header = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <Container as="header" p="layout.1">
      <MenuContainer open={open} setOpen={setOpen} />
      <Link href="/" passHref>
        <a style={{ zIndex: 1, pointerEvents: 'auto' }} title="Home" aria-label="Home">
          <Logo width="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M27.47 23.406L20.083 3.064A1.656 1.656 0 0 0 18.517 2H6.493c-.389 0-.603.348-.464.712l.88 2.466c.74 2.27 1.026 3.148 1.02 4.025-.004.554-.125 1.107-.322 2.01-.018.085-.04.17-.064.256-.018.067-.036.135-.052.205a2.8 2.8 0 0 0 .097 1.582l5.936 16.156c.097.28.374.588.749.588H31.75c.18 0 .291-.168.236-.336l-.658-1.77a.746.746 0 0 0-.707-.504h-.014c-1.348 0-2.042-1.113-3.138-3.984zM6.26 21.152a.398.398 0 0 0-.749 0l-.41 1.078v-.001c-1.67 4.366-2.319 5.16-3.71 5.16H1.38a.746.746 0 0 0-.707.505l-.658 1.77C-.04 29.832.07 30 .25 30h8.627c.277 0 .472-.294.375-.56L6.26 21.152z"></path>
          </Logo>
        </a>
      </Link>
      { router.pathname.startsWith('/work') || router.pathname.startsWith('/blog/[slug]') ? null :
        <Name fontSize={3} pt={3}>Arturo • Wibawa</Name>
      }
      <Dot
        as="button"
        open={open}
        onClick={() => setOpen(!open)}
        size={32}
        aria-label="Menu"
      >
        {open ?
          <Box color='content.primary'><Cross size={14} strokeWidth={3} /></Box>
          :
          <Box color='content.inversePrimary'><Circle size={14} strokeWidth={3} /></Box>
        }
      </Dot>
    </Container >
  )
}

export default Header;