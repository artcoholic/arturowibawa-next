import { useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Box from '../../components/Box';
import Grid from '../../components/Grid';
import Text from '../../components/Text';
import GradientBox from '../../components/GradientBox';
import { motion, useViewportScroll, useMotionValue } from 'framer-motion';
import { variants } from '../../components/AnimationVariants';
import ExperienceItem from './ExperienceItem';
import SocialItem from './SocialItem';
import { ArrowDown } from 'akar-icons';

const EllipseWrapper = styled(Box)`
  transform: rotate(-30deg);
  width: 100%;
  opacity: 0.5;
  svg {
    stroke: ${props => props.theme.colors.content.inverseSecondary};
    stroke-width: 1px;
    overflow: visible;
    display: block;
  }
`

const List = styled(Text)`
  margin: 0;
  padding: 0;
  list-style: none;
`

const ProfilePage = () => {
  const { scrollYProgress } = useViewportScroll();
  const opacity = useMotionValue(1);
  const y = useMotionValue(0);
  useEffect(() => {
    scrollYProgress.onChange((latest) => {
      if (latest > 0.2) {
        y.set(12);
        opacity.set(0);
      } else {
        y.set(0);
        opacity.set(1);
      }
    });
  }, [opacity, scrollYProgress, y]);
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
                  <motion.ellipse
                    key={i}
                    cy={50}
                    vectorEffect="non-scaling-stroke"
                    animate={{
                      x: [100, 0],
                      rx: [0, 10, 18, 22, 24.5, 25, 24.5, 22, 18, 10, 0],
                      ry: [0, 20, 36, 44, 49, 50, 49, 44, 36, 20, 0]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 20,
                      delay: i,
                      ease: 'linear',
                    }}
                  />
                ))
              }
            </g>
          </svg>
        </EllipseWrapper>
      </Box>
      <Grid
        mx="layout.1"
        pt={["layout.2", null, null, 0]}
        pb="layout.2"
        as={motion.section}
        initial="initial" animate="enter" exit="exit" variants={variants.main}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          columns={['-1/1', '1/span 4', '2/span 6', '2/span 5']}
          height={['auto', null, null, "100vh"]}
          justifyContent="center"
          as={motion.div}
          variants={variants.ProfileSection}
          mt={["layout.4", null, null, 0]}
          mb={["layout.2", null, null, 0]}
        >
          <Text as={motion.h1} variants={variants.ProfileContent} font={["Display", null, null, "HeadingLarge"]} mb="layout.1/2">
            Profile
          </Text>
          <Text as={motion.p} variants={variants.ProfileContent} font={["ParagraphMedium", null, null, null, "ParagraphLarge"]} color="content.inverseTertiary">
            Arturo Wibawa is a product designer based in Los Angeles, California with a strong focus on product strategy, user experience, and interaction design.
            <br /><br />
            He&apos;s keen to experiment with new technology and believes that the best solutions are the simplest ones.
          </Text>
        </Box>
        <Box as={motion.div} variants={variants.ProfileSection} columns={['-1/1', '1/span 4', '2/span 6', '2/span 5']} mt={[0, null, null, "-4em"]} mb={["layout.1", null, null, "layout.1/2"]}>
          <Text as={motion.h2} variants={variants.ProfileContent} mb="1rem" font="HeadingSmall" color="content.inverseSecondary">Areas of Focus</Text>
          <List as={motion.ul} variants={variants.ProfileContent} font="ParagraphMedium" color="content.inverseTertiary">
            <li>UI and UX Design</li>
            <li>Art Direction</li>
            <li>Product Design</li>
            <li>Design Systems and Tooling</li>
            <li>Front-end Development</li>
          </List>
        </Box>
        <Box as={motion.div} variants={variants.ProfileSection} columns={['-1/1', '1/span 4', '2/span 6', '2/span 5']} my={["layout.1", null, null, "layout.1/2"]}>
          <Text as={motion.h2} variants={variants.ProfileContent} mb="1rem" font="HeadingSmall" color="content.inverseSecondary">Experience</Text>
          <List as={motion.ul} variants={variants.ProfileContent} font="ParagraphMedium" color="content.inverseTertiary">
            <Box as="li" mb="layout.1/4">
              <Text as="a" href="https://madeinhaus.com/" target="_blank">HAUS</Text>
              <ExperienceItem position="Senior Product Designer" date="2020 – Present" mt />
              <ExperienceItem position="Product Designer" date="2018 – 2020" />
              <ExperienceItem position="Web Designer" date="2016 – 2018" line={false} />
            </Box>
            <Box as="li" mb="layout.1/4">
              <Text as="a" href="https://wonderful.io/" target="_blank">Wonderful Collective</Text>
              <ExperienceItem position="Web Designer" date="2014 – 2016" line={false} mt />
            </Box>
            <Box as="li" mb="layout.1/4">
              <Text as="a" href="https://www.columnfivemedia.com/" target="_blank">Column Five Media</Text>
              <ExperienceItem position="Visual Designer" date="2012 – 2014" line={false} mt />
            </Box>
            <Box as="li">
              <Text color="content.inverseTertiary">Cal Poly Pomona</Text>
              <ExperienceItem position="Graphic Designer" date="2010 – 2011" line={false} mt />
            </Box>
          </List>
        </Box>
        <Box as={motion.div} variants={variants.ProfileSection} columns={['-1/1', '1/span 4', '2/span 6', '2/span 4']} mt={["layout.1", null, null, "layout.1/2"]}>
          <Text as={motion.h2} variants={variants.ProfileContent} mb="1rem" font="HeadingSmall" color="content.inverseSecondary">Socials</Text>
          <List as={motion.ul} variants={variants.ProfileContent} font="ParagraphMedium" color="content.inverseTertiary">
            <SocialItem label="Email" social="agwibawa@gmail.com" href="mailto:agwibawa@gmail.com" />
            <SocialItem label="Twitter" social="@agwibawa" href="https://twitter.com/agwibawa" />
            <SocialItem label="LinkedIn" social="@arturowibawa" href="https://www.linkedin.com/in/arturowibawa/" />
            <SocialItem label="Github" social="@artcoholic" href="https://github.com/artcoholic/" />
            <SocialItem label="CodePen" social="@artcoholic" href="https://codepen.io/artcoholic" />
            <SocialItem label="Dribbble" social="@artcoholic" href="https://dribbble.com/artcoholic" />
          </List>
        </Box>
      </Grid>
      <Box
        as={motion.div}
        position="fixed"
        bottom="layout.1" left="layout.1"
        style={{
          opacity: opacity,
          transition: 'all 300ms ease-out',
          y: y,
        }}
        display={['none', null, null, 'block']}
        color="content.primary"
      >
        <ArrowDown size={32} style={{ display: 'block' }} />
      </Box>
      <GradientBox />
    </>
  )
}

export default ProfilePage;