import styled from 'styled-components';
import Head from 'next/head';
import Box from '../components/Box';
import Grid from '../components/Grid';
import Text from '../components/Text';
import { motion } from 'framer-motion';
import { blink, sphere, variants } from '../components/AnimationVariants';

const HeaderWrapper = styled(Text)`
  position: reltative;
  &:after {
    content: '';
    height:90%;
    width: 1px;
    position: absolute;
    background-color: ${props => props.theme.colors.content.primary};
    animation: ${blink} 750ms ${props => props.theme.ease.It} infinite alternate;
  }
`

const EmailLink = styled(Text)`
  position: relative;
  text-decoration: underline dotted;
  text-decoration-thickness: 1px;
  white-space: nowrap;
  font-family: var(--eina-regular);
  color: ${props => props.theme.colors.content.primary};
  &:hover {
    &:after {
      transform: scaleX(1);
      transform-origin: 0%;
    }
  }
  &:after {
    content: '';
    background: ${props => props.theme.colors.content.primary};
    transition: transform 250ms ${props => props.theme.ease.Smooth};
    height: 100%;
    left: 0;
    bottom: 0;
    width: 100%;
    transform: scaleX(0);
    transform-origin: 100%;
    position: absolute;
  }
`

const Ellipse = styled.ellipse`
  animation: ${sphere} 20s linear infinite;
`

const EllipseWrapper = styled(Box)`
  transform: rotate(-30deg);
  width: 100%;
  svg {
    stroke: ${props => props.theme.colors.content.inverseSecondary};
    stroke-width: 1px;
    overflow: visible;
    display: block;
    opacity: 0.5;
  }
`

const ProfilePage = () => {
  return (
    <>
      <Head>
        <title>Profile — Arturo Wibawa</title>
      </Head>
      <Box
        position="fixed"
        width='50%'
        height='100%'
        display={['none', null, null, 'flex']}
        justifyContent="center"
        alignItems="center"
        right={0}
        px="layout.3"
        as={motion.section}
        exit={{ opacity: 0 }}
      >
        <EllipseWrapper>
          <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
              {
                Array.from({ length: 20 }).map((_, i) => (
                  <Ellipse
                    key={i}
                    cy={50}
                    begin={0 + i}
                    vectorEffect="non-scaling-stroke"
                    style={{ animationDelay: 0 + i + 's' }}
                  />
                ))
              }
            </g>
          </svg>
        </EllipseWrapper>
      </Box>
      <Grid
        height="100vh"
        maxHeight={["-webkit-fill-available", null, null, "100%"]}
        mx="layout.1"
        overflow="hidden"
        py="layout.1"
        as={motion.section}
        initial="initial" animate="enter" exit="exit" variants={variants.main}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          columns={['1/span 2', '1/span 4', '2/span 6', '2/span 5']}
          placeSelf="center"
          border={['1px solid', null, null, 'none']}
          borderColor="bg.placeholder"
          p={['layout.1', null, null, 0]}
          borderRadius={8}
          as={motion.div}
          variants={variants.ProfileSection}
        >
          <HeaderWrapper as={motion.h1} variants={variants.ProfileContent} font={["HeadingLarge"]} mb={["layout.1/2", null, 'layout.1/4']}>
            Profile
          </HeaderWrapper>
          <Text as={motion.p} variants={variants.ProfileContent} font={["ParagraphSmall", null, "ParagraphMedium"]} color="content.inverseTertiary" mb="layout.1/4">
            Arturo Wibawa is a product designer based in Los Angeles, California with a strong focus on product strategy, user experience, and interaction design.
          </Text>
          <Text as={motion.p} variants={variants.ProfileContent} font={["ParagraphSmall", null, "ParagraphMedium"]} color="content.inverseTertiary" mb="layout.1/2">
            He's keen to experiment with new technology and believes that the best solutions are the simplest ones.
          </Text>
          <EmailLink
            as={motion.a}
            variants={variants.ProfileContent}
            href="mailto:agwibawa@gmail.com"
            font={["ParagraphSmall", null, "ParagraphMedium", null, "ParagraphLarge"]}
            aria-label="Send Email"
            title="Send Email"
          >
            Discuss project
          </EmailLink>
        </Box>
        <Text as="section" fontSize={3} position="fixed" width="100%" textAlign="center" bottom="layout.1" left={0} placeSelf="center" px="layout.1">
          © {new Date().getFullYear()}. All Rights Reserved.
        </Text>
      </Grid>
    </>
  )
}

export default ProfilePage;