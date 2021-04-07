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
    transition: transform 250ms ${props => props.theme.ease.smooth};
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
  }
`

const ProfilePage = () => {
  return (
    <>
      <Head>
        <title>Profile — Arturo Wibawa</title>
      </Head>
      <Grid
        height="100vh"
        maxHeight="-webkit-fill-available"
        mx="layout.1"
        overflow="hidden"
        py="layout.1"
        as={motion.article}
        initial="initial" animate="enter" exit="exit" variants={variants.main}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          columns={['1/span 2', '2/span 2', '2/span 6']}
          placeSelf="center"
          border={['1px solid', null, null, 'none']}
          borderColor="bg.placeholder"
          p={['layout.1', null, null, 0]}
          borderRadius={8}
          as={motion.section}
          variants={variants.ProfileSection}
        >
          <HeaderWrapper as={motion.h1} variants={variants.ProfileContent} font={["HeadingLarge"]} mb={["layout.1/2", null, 'layout.1/4']}>
            // Profile
          </HeaderWrapper>
          <Text as={motion.p} variants={variants.ProfileContent} font={["ParagraphSmall", null, "ParagraphMedium", null, "ParagraphLarge"]} color="content.inverseTertiary" mb="layout.1/4">
            Arturo Wibawa is a product designer based in Los Angeles, California with a strong focus on product strategy, user experience, and interaction design.
          </Text>
          <Text as={motion.p} variants={variants.ProfileContent} font={["ParagraphSmall", null, "ParagraphMedium", null, "ParagraphLarge"]} color="content.inverseTertiary" mb="layout.1/2">
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
        <EllipseWrapper
          span={[2, null, 5]}
          p={[0, null, null, "layout.2"]}
          placeSelf="center"
          display={['none', null, null, 'block']}
          as="section"
        >
          <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ strokeWidth: 1, overflow: 'visible', display: 'block', opacity: 0.5 }}>
            <g>
              {
                Array.from({ length: 20 }).map((_, i) => (
                  <Ellipse
                    key={i}
                    cy="50"
                    begin={0 + i}
                    vectorEffect="non-scaling-stroke"
                    style={{ animationDelay: 0 + i + 's' }}
                  />
                ))
              }
            </g>
          </svg>
        </EllipseWrapper>
        <Text as="section" fontSize={3} position="fixed" width="100%" textAlign="center" bottom="layout.1" left={0} placeSelf="center" px="layout.1">
          © 2021. All Rights Reserved.
        </Text>
      </Grid>
    </>
  )
}

export default ProfilePage;