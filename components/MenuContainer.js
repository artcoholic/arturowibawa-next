import { useEffect } from 'react';
import styled from 'styled-components';
import MenuItem from './MenuItem';
import Box from './Box';
import Grid from './Grid';
import Toggle from './Toggle';
import SocialLink from './SocialLink';
import { variants } from './AnimationVariants'
import { motion, AnimatePresence } from 'framer-motion';
import { LinkedInFill, CodepenFill, TwitterFill, GithubFill } from 'akar-icons';
import useDarkMode from 'use-dark-mode';

const Container = styled(Box)`
  pointer-events: auto;
  width: 100vw;
  height: 100vh;
  max-height: -webkit-fill-available;
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  z-index: 99;
`

const Logo = styled(Box)`
  fill: ${props => props.theme.colors.content.inversePrimary};
`

const MenuContainer = ({ open, setOpen }) => {
  useEffect(() => {
    open ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto";
  });
  const darkMode = useDarkMode(false);
  return (
    <AnimatePresence exitBeforeEnter>
      {open && (
        <Container
          as={motion.nav}
          p="layout.1"
          flexDirection={["column", null, "row"]}
          justifyContent={["center", null, "space-between"]}
          alignItems={["flex-start", null, "flex-end"]}
          bg="bg.inversePrimary"
          open={open}
          initial="closed"
          animate="open"
          exit="closed"
          variants={variants.menuContainer}
          key="menu"
        >
          <Logo as="svg" width={32} top="layout.1" position="absolute" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M27.47 23.406L20.083 3.064A1.656 1.656 0 0 0 18.517 2H6.493c-.389 0-.603.348-.464.712l.88 2.466c.74 2.27 1.026 3.148 1.02 4.025-.004.554-.125 1.107-.322 2.01-.018.085-.04.17-.064.256-.018.067-.036.135-.052.205a2.8 2.8 0 0 0 .097 1.582l5.936 16.156c.097.28.374.588.749.588H31.75c.18 0 .291-.168.236-.336l-.658-1.77a.746.746 0 0 0-.707-.504h-.014c-1.348 0-2.042-1.113-3.138-3.984zM6.26 21.152a.398.398 0 0 0-.749 0l-.41 1.078v-.001c-1.67 4.366-2.319 5.16-3.71 5.16H1.38a.746.746 0 0 0-.707.505l-.658 1.77C-.04 29.832.07 30 .25 30h8.627c.277 0 .472-.294.375-.56L6.26 21.152z"></path></Logo>
          <Grid gridRowGap={[12, null, 24]} gridTemplateColumns="1fr" width={['100%', null, 'auto']} justifyItems={['center', null, 'start']}>
            <MenuItem key="1" path="/" setOpen={setOpen} title="Work">
              Work
            </MenuItem>
            <MenuItem key="2" path="/profile" setOpen={setOpen} title="About Arturo">
              Profile
            </MenuItem>
            <MenuItem
              key="3"
              path="#"
              setOpen={setOpen}
              style={{ textDecoration: 'line-through', textDecorationThickness: 4, pointerEvents: 'none' }}
              color="content.secondary"
              title="Experiments"
            >
              Lab
            </MenuItem>
          </Grid>
          <Grid
            gridRowGap={8}
            gridColumnGap={12}
            gridTemplateColumns={["repeat(4, 1fr)", null, "1fr"]}
            position={["fixed", null, 'relative']}
            bottom={["layout.2", null, 0]}
            placeSelf={["center", null, "flex-end"]}
          >
            <SocialLink href="https://www.linkedin.com/in/arturowibawa/"><LinkedInFill size={16} /></SocialLink>
            <SocialLink href="https://twitter.com/agwibawa"><TwitterFill size={16} /></SocialLink>
            <SocialLink href="https://github.com/artcoholic/"><GithubFill size={16} /></SocialLink>
            <SocialLink href="https://codepen.io/artcoholic"><CodepenFill size={16} /></SocialLink>
          </Grid>
          <Toggle checked={darkMode.value} onChange={darkMode.toggle} />
        </Container >
      )}
    </AnimatePresence>
  )
}

export default MenuContainer;
