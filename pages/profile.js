import styled from 'styled-components';
import Head from 'next/head';
import Box from '../components/Box';
import Grid from '../components/Grid';
import Text from '../components/Text';
import GradientBox from '../components/GradientBox';
import { motion } from 'framer-motion';
import { sphere, variants } from '../components/AnimationVariants';

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

const Dot = styled(Box)`
  width: 5px;
  height: 5px;
  border-radius:1px;
  flex-shrink: 0;
  transform: rotate(45deg);
  background: ${props => props.theme.colors.content.inverseSecondary};
  margin-bottom: 8px;
`

const Line = styled(Box)`
  width: 1px;
  height: 100%;
  background: ${props => props.theme.colors.content.inverseSecondary};
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
          <Text as={motion.h2} variants={variants.ProfileContent} font="HeadingSmall" color="content.inverseSecondary">Areas of Focus</Text>
          <List as={motion.ul} variants={variants.ProfileContent} font="ParagraphMedium" color="content.inverseTertiary">
            <li>UI and UX Design</li>
            <li>Art Direction</li>
            <li>Product Design</li>
            <li>Design Systems and Tooling</li>
            <li>Front-end Development</li>
          </List>
        </Box>
        <Box as={motion.div} variants={variants.ProfileSection} columns={['-1/1', '1/span 4', '2/span 6', '2/span 5']} my={["layout.1", null, null, "layout.1/2"]}>
          <Text as={motion.h2} variants={variants.ProfileContent} font="HeadingSmall" color="content.inverseSecondary">Experience</Text>
          <List as={motion.ul} variants={variants.ProfileContent} font="ParagraphMedium" color="content.inverseTertiary">
            <Box as="li" mb="layout.1/4">
              <Text as="a" href="https://madeinhaus.com/" target="_blank">HAUS</Text>
              <ExperienceItem position="Senior Product Designer" date="2020 – Present" />
              <ExperienceItem position="Product Designer" date="2018 – 2020" />
              <ExperienceItem position="Web Designer" date="2016 – 2018" line={false} />
            </Box>
            <Box as="li" mb="layout.1/4">
              <Text as="a" href="https://wonderful.io/" target="_blank">Wonderful Collective</Text>
              <ExperienceItem position="Web Designer" date="2014 – 2016" line={false} />
            </Box>
            <Box as="li" mb="layout.1/4">
              <Text as="a" href="https://www.columnfivemedia.com/" target="_blank">Column Five Media</Text>
              <ExperienceItem position="Visual Designer" date="2012 – 2014" line={false} />
            </Box>
            <Box as="li">
              <Text color="content.inverseTertiary">Cal Poly Pomona</Text>
              <ExperienceItem position="Graphic Designer" date="2010 – 2011" line={false} />
            </Box>
          </List>
        </Box>
        <Box as={motion.div} variants={variants.ProfileSection} columns={['-1/1', '1/span 4', '2/span 6', '2/span 5']} mt={["layout.1", null, null, "layout.1/2"]}>
          <Text as={motion.h2} variants={variants.ProfileContent} font="HeadingSmall" color="content.inverseSecondary">Socials</Text>
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

const ExperienceItem = ({ position, date, line, timeline }) => {
  return (
    <Box display="flex" pt="layout.1/8">
      <Box flexDirection="column" alignItems="center" mt={10} mr={12} display={timeline === false ? "none" : "flex"}>
        <Dot />
        <Line display={line === false ? "none" : "block"} />
      </Box>
      <Box mb="layout.1/8">
        <Text font="ParagraphSmall" color="content.inverseTertiary">{position}</Text>
        <Text font="ParagraphSmall" color="content.inverseTertiary">{date}</Text>
      </Box>
    </Box>
  )
}

const SocialItemWrapper = styled(Box)`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  text-decoration: none;
  align-items: baseline;
  border-bottom: 1px solid ${props => props.theme.colors.bg.placeholder};
  padding-bottom: .5em;
  &:hover {
    &:before {
      transform: scaleX(1);
      transform-origin: left;
    }
    .social {
      color: ${props => props.theme.colors.content.inverseTertiary};
    }
  }
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: ${props => props.theme.colors.content.primary};
    bottom: 0;
    left: 0;
    transform: scaleX(0);
    transition: transform 300ms ${props => props.theme.ease.Smooth};
    transform-origin: right;
  }
  &:after {
    display: none;
  }
`

const SocialItem = ({ label, social, href }) => {
  return (
    <SocialItemWrapper as="a" href={href} my="layout.1/4" target="_blank">
      <Text color="content.inverseTertiary">{label}</Text>
      <Text className="social" font="ParagraphSmall" color="content.inverseSecondary">{social}</Text>
    </SocialItemWrapper>
  )
}