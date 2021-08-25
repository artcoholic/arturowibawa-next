import styled from 'styled-components';
import Head from 'next/head';
import Box from '../../components/Box';
import Grid from '../../components/Grid';
import Text from '../../components/Text';
import GradientBox from '../../components/GradientBox';
import { motion } from 'framer-motion';
import { sphere, variants } from '../../components/AnimationVariants';
import ExperienceItem from './ExperienceItem';
import SocialItem from './SocialItem';

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
    shape-rendering: optimizeSpeed;
  }
`

const List = styled(Text)`
  margin: 0;
  padding: 0;
  list-style: none;
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
          <Text as={motion.h1} variants={variants.ProfileContent} font={["HeadingLarge"]}>
            Profile
          </Text>
          <Text as={motion.p} variants={variants.ProfileContent} font={["ParagraphMedium", null, "ParagraphMedium"]} color="content.inverseTertiary">
            Arturo Wibawa is a product designer based in Los Angeles, California with a strong focus on product strategy, user experience, and interaction design.
            <br /><br />
            He&apos;s keen to experiment with new technology and believes that the best solutions are the simplest ones.
          </Text>
        </Box>
        <Box as={motion.div} variants={variants.ProfileSection} columns={['-1/1', '1/span 4', '2/span 6', '2/span 5']} mt={[0, null, null, "-1.5em"]} mb={["layout.1", null, null, "layout.1/2"]}>
          <Text as={motion.h2} variants={variants.ProfileContent} mb={8} font="HeadingSmall" color="content.inverseSecondary">Areas of Focus</Text>
          <List as={motion.ul} variants={variants.ProfileContent} font="ParagraphMedium" color="content.inverseTertiary">
            <li>UI and UX Design</li>
            <li>Art Direction</li>
            <li>Product Design</li>
            <li>Design Systems and Tooling</li>
            <li>Front-end Development</li>
          </List>
        </Box>
        <Box as={motion.div} variants={variants.ProfileSection} columns={['-1/1', '1/span 4', '2/span 6', '2/span 5']} my={["layout.1", null, null, "layout.1/2"]}>
          <Text as={motion.h2} variants={variants.ProfileContent} mb={8} font="HeadingSmall" color="content.inverseSecondary">Experience</Text>
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
        <Box as={motion.div} variants={variants.ProfileSection} columns={['-1/1', '1/span 4', '2/span 6', '2/span 5']} mt={["layout.1", null, null, "layout.1/2"]}>
          <Text as={motion.h2} variants={variants.ProfileContent} mb={8} font="HeadingSmall" color="content.inverseSecondary">Socials</Text>
          <List as={motion.ul} variants={variants.ProfileContent} font="ParagraphMedium" color="content.inverseTertiary">
            <SocialItem label="Email" social="agwibawa@gmail.com" href="mailto:agwibawa@gmail.com" />
            <SocialItem label="Twitter" social="@agwibawa" href="https://twitter.com/agwibawa" />
            <SocialItem label="LinkedIn" social="@arturowibawa" href="https://www.linkedin.com/in/arturowibawa/" />
            <SocialItem label="Github" social="@artcoholic" href="https://github.com/artcoholic/" />
            <SocialItem label="CodePen" social="@artcoholic" href="https://codepen.io/artcoholic" />
          </List>
        </Box>
      </Grid>
      <GradientBox />
    </>
  )
}

export default ProfilePage;