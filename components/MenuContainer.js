import styled from 'styled-components';
import MenuItem from './MenuItem';
import Box from './Box';
import SocialLink from './SocialLink';
import { variants } from './AnimationVariants'
import { motion } from 'framer-motion';
import { LinkedinFill, CodepenFill, TwitterFill, OctocatFill, Water } from 'akar-icons';

const Container = styled(Box)`
  pointer-events: auto;
  width: 100vw;
  height: 100vh;
  max-height: -webkit-fill-available;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  top: 0;
  left: 0;
  z-index: 99;
`

const Button = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.bg.primary};
  color: ${props => props.theme.colors.content.inverseTertiary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  position: relative;
  transition: all 300ms ${props => props.theme.ease.Btn};
  svg {
    display: block;
    color: ${props => props.theme.colors.content.inverseTertiary};
    fill: ${props => props.theme.colors.content.inverseTertiary};
  }
  &:hover {
    background-color: ${props => props.theme.colors.bg.secondary};
    .tooltip {
      opacity: 1;
      transform: translateY(-12px);
    }
  }
  .tooltip {
      position: absolute;
      background-color: ${props => props.theme.colors.bg.primary};
      color: ${props => props.theme.colors.content.inverseTertiary};
      text-align: center;
      border-radius: 4px;
      font-size: 12px;
      opacity: 0;
      top: -28px;
      padding: .5em .75em;
      white-space: nowrap;
      pointer-events: none;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      transition: all 300ms ${props => props.theme.ease.Btn};
      &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -4px;
        border-width: 4px;
        border-style: solid;
        border-color: ${props => props.theme.colors.bg.primary} transparent transparent transparent;
      }
    }
`

const Logo = styled(Box)`
  fill: ${props => props.theme.colors.content.inversePrimary};
`

const MenuContainer = ({setOpen, setTheme, theme, toggler }) => {
  // console.log('MenuContainer');
  return (
    <Container
      as={motion.nav}
      bg="bg.inversePrimary"
      initial="closed"
      animate="open"
      exit="closed"
      variants={variants.menuContainer}
      key="menu"
    >
      <Logo as="svg" width={32} top="layout.1" left="layout.1" position="absolute" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M27.47 23.406L20.083 3.064A1.656 1.656 0 0 0 18.517 2H6.493c-.389 0-.603.348-.464.712l.88 2.466c.74 2.27 1.026 3.148 1.02 4.025-.004.554-.125 1.107-.322 2.01-.018.085-.04.17-.064.256-.018.067-.036.135-.052.205a2.8 2.8 0 0 0 .097 1.582l5.936 16.156c.097.28.374.588.749.588H31.75c.18 0 .291-.168.236-.336l-.658-1.77a.746.746 0 0 0-.707-.504h-.014c-1.348 0-2.042-1.113-3.138-3.984zM6.26 21.152a.398.398 0 0 0-.749 0l-.41 1.078v-.001c-1.67 4.366-2.319 5.16-3.71 5.16H1.38a.746.746 0 0 0-.707.505l-.658 1.77C-.04 29.832.07 30 .25 30h8.627c.277 0 .472-.294.375-.56L6.26 21.152z"></path></Logo>
      <MenuItem
        key="1"
        path="/"
        setOpen={setOpen}
        index={1}
        title="Project Gallery"
        keyword_1="Product"
        keyword_2="Web Design"
        keyword_3="User Interface"
        keyword_4="work"
      >
        Work
      </MenuItem>
      <MenuItem
        key="2"
        path="/blog"
        setOpen={setOpen}
        index={2}
        title="Blog Collection"
        keyword_1="Blog"
        keyword_2="Writing"
        keyword_3="Ideas"
        keyword_4="thoughts"
      >
        Thoughts
      </MenuItem>
      <MenuItem
        key="3"
        path="/profile"
        setOpen={setOpen}
        index={3}
        title="About Me"
        keyword_1="About"
        keyword_2="Contact"
        keyword_3="History"
        keyword_4="profile"
      >
        Profile
      </MenuItem>
      <Box
        display="flex"
        flexFlow="row"
        px="layout.1"
        py={["layout.1", null, null, "layout.1/2"]}
        borderTop="1px solid"
        borderColor="content.inversePrimary"
        bg="bg.inversePrimary"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          display="flex"
          flexFlow="row"
        >
          <SocialLink href="https://www.linkedin.com/in/arturowibawa/" title="LinkedIn"><LinkedinFill size={16} /></SocialLink>
          <SocialLink href="https://twitter.com/agwibawa" title="Twitter"><TwitterFill size={16} /></SocialLink>
          <SocialLink href="https://github.com/artcoholic/" title="Github"><OctocatFill size={16} /></SocialLink>
          <SocialLink href="https://codepen.io/artcoholic" title="Codepen"><CodepenFill size={16} /></SocialLink>
        </Box>
        <Button onClick={toggler} aria-label="Theme Toggle">
          <span className="tooltip">
            Change theme
          </span>
          <Water size={12} /> {theme}
        </Button>
      </Box>
    </Container >
  )
}

export default MenuContainer;
