import styled, { keyframes } from 'styled-components';
import Head from 'next/head';
import Box from '../components/Box';
import Grid from '../components/Grid';
import Text from '../components/Text';
import { motion } from 'framer-motion';
import { blink, sphere, variants } from '../components/AnimationVariants';
import { LinkedInFill, CodepenFill, TwitterFill, GithubFill, Envelope } from 'akar-icons';

const HeaderWrapper = styled(Text)`
  position: reltative;
  &:after {
    content: '';
    height:90%;
    width: 1px;
    position: absolute;
    background-color: ${({ theme }) => theme.colors.lightTheme.contentPrimary};
    animation: ${blink} 750ms ${({ theme }) => theme.ease.It} infinite alternate;
  }
`

const SocialLinks = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  color: ${({ theme }) => theme.colors.lightTheme.contentInverseSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightTheme.contentInverseSecondary};
  transition: all 250ms ${({ theme }) => theme.ease.smooth};
  text-decoration: none;
  clip-path: inset(0%);
  &:hover {
    color: ${({ theme }) => theme.colors.lightTheme.contentPrimary};
    &:after {
      transform: scaleX(1);
      transform-origin: 0%;
    }
  }
  &:after {
    content: '';
    width: 100%;
    height: 1px;
    transition: transform 250ms ${({ theme }) => theme.ease.smooth};
    background-color: ${({ theme }) => theme.colors.lightTheme.contentPrimary};
    position: absolute;
    bottom: -1px;
    left: 0;
    transform: scaleX(0);
    transform-origin: 100%;
  }
`

const Ellipse = styled.ellipse`
  animation: ${sphere} 20s linear infinite;
  transition: all 300ms;
`

const EllipseWrapper = styled(Box)`
  transform: rotate(-30deg);
  width: 100%;
`

const ProfilePage = () => {
  return (
    <motion.main initial="initial" animate="enter" exit="exit">
      <Head>
        <title>Profile — Arturo Wibawa</title>
      </Head>
      <Grid
        height="100vh"
        mx="layout.1"
        overflow="hidden"
        py="layout.1"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          columns={['1/span 2', '2/span 2', '2/span 6']}
          placeSelf="center"
          border={['1px solid rgba(174,146,46,0.3)', null, null, 'none']}
          p={['layout.1', null, null, 0]}
          borderRadius={8}
        >
          <HeaderWrapper as={motion.h1} variants={variants.ProfileHeader} font={["HeadingLarge"]} mb={["layout.1/2", null, 'layout.1/4']}>
            // Profile
          </HeaderWrapper>
          <Text as={motion.p} variants={variants.ProfileParagraph} font={["ParagraphSmall", null, "ParagraphMedium", null, "ParagraphLarge"]} color="lightTheme.contentInverseTertiary" mb="layout.1/4">
            Arturo Wibawa is a product designer based in Los Angeles, California with a strong focus on product strategy, user experience, and interaction design.
          </Text>
          <Text as={motion.p} variants={variants.ProfileParagraph} font={["ParagraphSmall", null, "ParagraphMedium", null, "ParagraphLarge"]} color="lightTheme.contentInverseTertiary" mb="layout.1">
            He's keen to experiment with new technology and believes that the best solutions are the simplest ones.
          </Text>
          <Grid
            gridColumnGap={12}
            gridTemplateColumns="repeat(5, 1fr)"
            as={motion.section}
            exit={{ opacity: 0 }}
          >
            <SocialLinks as="a" href="https://www.linkedin.com/in/arturowibawa/" target="_blank" rel="noopener">
              <motion.span variants={variants.ProfileSocialButtons} transition={{ delay: 0.5 }}><LinkedInFill size={16} /></motion.span>
            </SocialLinks>
            <SocialLinks as="a" href="https://twitter.com/agwibawa" target="_blank" rel="noopener">
              <motion.span variants={variants.ProfileSocialButtons} transition={{ delay: 0.6 }}><TwitterFill size={16} /></motion.span>
            </SocialLinks>
            <SocialLinks as="a" href="https://github.com/artcoholic/" target="_blank" rel="noopener">
              <motion.span variants={variants.ProfileSocialButtons} transition={{ delay: 0.7 }}><GithubFill size={16} /></motion.span>
            </SocialLinks>
            <SocialLinks as="a" href="https://codepen.io/artcoholic" target="_blank" rel="noopener">
              <motion.span variants={variants.ProfileSocialButtons} transition={{ delay: 0.8 }}><CodepenFill size={16} /></motion.span>
            </SocialLinks>
            <SocialLinks as="a" href="mailto:agwibawa@gmail.com" target="_blank" rel="noopener">
              <motion.span variants={variants.ProfileSocialButtons} transition={{ delay: 0.9 }}><Envelope size={16} /></motion.span>
            </SocialLinks>
          </Grid>
        </Box>
        <EllipseWrapper
          span={[2, null, 5]}
          p={[0, null, null, "layout.2"]}
          placeSelf="center"
          display={['none', null, null, 'block']}
          as={motion.div}
          exit={{ opacity: 0 }}
        >
          <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" stroke="#AE922E" xmlns="http://www.w3.org/2000/svg" style={{ strokeWidth: 1, overflow: 'visible', display: 'block', opacity: 0.5 }}>
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
        <Text as={motion.p} exit={{ opacity: 0 }} fontSize={3} position="absolute" bottom="layout.1" placeSelf="center">© 2021. All Rights Reserved.</Text>
      </Grid>
    </motion.main >
  )
}

export default ProfilePage;