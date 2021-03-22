import { useEffect } from 'react';
import styled from 'styled-components';
import MenuItem from './MenuItem';
import Box from './Box';
import Grid from './Grid';
import { variants } from './AnimationVariants'
import { motion, AnimatePresence } from 'framer-motion';
import { LinkedInFill, CodepenFill, TwitterFill } from 'akar-icons';

const Container = styled(Box)`
  pointer-events: auto;
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  z-index: 99;
`

const SocialLinks = styled(Box)`
  padding: 8px;
  color: ${({ theme }) => theme.colors.lightTheme.contentSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightTheme.contentSecondary};
  transition: all 250ms ${({ theme }) => theme.ease.smooth};
  &:hover {
    color: ${({ theme }) => theme.colors.lightTheme.contentTertiary};
    border-bottom-color: ${({ theme }) => theme.colors.lightTheme.contentInversePrimary};
  }
`

const MenuContainer = ({ open, setOpen }) => {
  useEffect(() => {
    open ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto";
  });
  return (
    <AnimatePresence>
      {open && (
        <Container
          as={motion.nav}
          p="layout.1"
          flexDirection={["column", null, "row"]}
          justifyContent={["center", null, "space-between"]}
          alignItems={["flex-start", null, "flex-end"]}
          bg="lightTheme.backgroundInversePrimary"
          open={open}
          initial="closed"
          animate="open"
          exit="closed"
          variants={variants.menuContainer}
          key="menu"
        >
          <Box as="svg" width={32} top="layout.1" position="absolute" fill='#FFD542' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M27.47 23.406L20.083 3.064A1.656 1.656 0 0 0 18.517 2H6.493c-.389 0-.603.348-.464.712l.88 2.466c.74 2.27 1.026 3.148 1.02 4.025-.004.554-.125 1.107-.322 2.01-.018.085-.04.17-.064.256-.018.067-.036.135-.052.205a2.8 2.8 0 0 0 .097 1.582l5.936 16.156c.097.28.374.588.749.588H31.75c.18 0 .291-.168.236-.336l-.658-1.77a.746.746 0 0 0-.707-.504h-.014c-1.348 0-2.042-1.113-3.138-3.984zM6.26 21.152a.398.398 0 0 0-.749 0l-.41 1.078v-.001c-1.67 4.366-2.319 5.16-3.71 5.16H1.38a.746.746 0 0 0-.707.505l-.658 1.77C-.04 29.832.07 30 .25 30h8.627c.277 0 .472-.294.375-.56L6.26 21.152z"></path></Box>
          <Grid gridRowGap={[12, null, 24]} gridTemplateColumns="1fr" width={['100%', null, 'auto']} justifyItems={['center', null, 'start']}>
            <MenuItem key="1" text="Work" path="/" setOpen={setOpen} />
            <MenuItem key="2" text="Profile" path="#" setOpen={setOpen} />
            <MenuItem key="3" text="Lab" path="#" setOpen={setOpen} />
          </Grid>
          <Grid
            gridRowGap={8}
            gridTemplateColumns={["repeat(3, 1fr)", null, "1fr"]}
            position={["absolute", null, 'relative']}
            bottom={["layout.2", null, 0]}
            placeSelf={["center", null, "flex-end"]}
          >
            <SocialLinks as="a" href="https://twitter.com/agwibawa" target="_blank" rel="noopener"><TwitterFill size={16} /></SocialLinks>
            <SocialLinks as="a" href="https://codepen.io/artcoholic" target="_blank" rel="noopener"><CodepenFill size={16} /></SocialLinks>
            <SocialLinks as="a" href="https://www.linkedin.com/in/arturowibawa/" target="_blank" rel="noopener"><LinkedInFill size={16} /></SocialLinks>
          </Grid>
        </Container >
      )}
    </AnimatePresence>
  )
}

export default MenuContainer;
