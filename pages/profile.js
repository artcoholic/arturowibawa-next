import styled from 'styled-components';
import Head from 'next/head';
import Box from '../components/Box';
import Grid from '../components/Grid';
import Text from '../components/Text';
import { motion } from 'framer-motion';
import { blink, variants } from '../components/AnimationVariants';
import { LinkedInFill, CodepenFill, TwitterFill, GithubFill } from 'akar-icons';

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

const ProfilePage = () => {
  const cxValues = '100;0';
  const rxValues = '0;12;20;24;25;24;20;12;0';
  const ryValues = '0;24;40;48;50;48;40;24;0';
  const duration = '14s';
  return (
    <motion.main initial="initial" animate="enter" exit="exit">
      <Head>
        <title>Profile — Arturo Wibawa</title>
      </Head>
      <Grid
        height="100vh"
        mx="layout.1"
      >
        <Box display="flex" flexDirection="column" alignItems="flex-start" columns={['1/span 4', null, '3/span 4', '2/span 6']} placeSelf="center">
          <HeaderWrapper as={motion.h1} variants={variants.ProfileHeader} font="HeadingLarge" mb="layout.1/4">
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
            gridTemplateColumns="repeat(4, 1fr)"
            as="section"
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
          </Grid>
        </Box>
        <Box position="absolute" right={0} size={400} placeSelf="center" style={{ transform: 'rotate(-30deg)' }}>
          <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" stroke="#1B1C32" xmlns="http://www.w3.org/2000/svg" style={{ strokeWidth: 0.25, overflow: 'visible' }}>
            <g>
              <ellipse cy="50">
                <animate attributeName="cx" values={cxValues} dur={duration} repeatCount="indefinite" begin="0s" />
                <animate attributeName="rx" values={rxValues} dur={duration} repeatCount="indefinite" begin="0s" />
                <animate attributeName="ry" values={ryValues} dur={duration} repeatCount="indefinite" begin="0s" />
              </ellipse>
              <ellipse cy="50">
                <animate attributeName="cx" values={cxValues} dur={duration} repeatCount="indefinite" begin="1s" />
                <animate attributeName="rx" values={rxValues} dur={duration} repeatCount="indefinite" begin="1s" />
                <animate attributeName="ry" values={ryValues} dur={duration} repeatCount="indefinite" begin="1s" />
              </ellipse>
              <ellipse cy="50">
                <animate attributeName="cx" values={cxValues} dur={duration} repeatCount="indefinite" begin="2s" />
                <animate attributeName="rx" values={rxValues} dur={duration} repeatCount="indefinite" begin="2s" />
                <animate attributeName="ry" values={ryValues} dur={duration} repeatCount="indefinite" begin="2s" />
              </ellipse>
              <ellipse cy="50">
                <animate attributeName="cx" values={cxValues} dur={duration} repeatCount="indefinite" begin="3s" />
                <animate attributeName="rx" values={rxValues} dur={duration} repeatCount="indefinite" begin="3s" />
                <animate attributeName="ry" values={ryValues} dur={duration} repeatCount="indefinite" begin="3s" />
              </ellipse>
              <ellipse cy="50">
                <animate attributeName="cx" values={cxValues} dur={duration} repeatCount="indefinite" begin="4s" />
                <animate attributeName="rx" values={rxValues} dur={duration} repeatCount="indefinite" begin="4s" />
                <animate attributeName="ry" values={ryValues} dur={duration} repeatCount="indefinite" begin="4s" />
              </ellipse>
              <ellipse cy="50">
                <animate attributeName="cx" values={cxValues} dur={duration} repeatCount="indefinite" begin="5s" />
                <animate attributeName="rx" values={rxValues} dur={duration} repeatCount="indefinite" begin="5s" />
                <animate attributeName="ry" values={ryValues} dur={duration} repeatCount="indefinite" begin="5s" />
              </ellipse>
              <ellipse cy="50">
                <animate attributeName="cx" values={cxValues} dur={duration} repeatCount="indefinite" begin="6s" />
                <animate attributeName="rx" values={rxValues} dur={duration} repeatCount="indefinite" begin="6s" />
                <animate attributeName="ry" values={ryValues} dur={duration} repeatCount="indefinite" begin="6s" />
              </ellipse>
              <ellipse cy="50">
                <animate attributeName="cx" values={cxValues} dur={duration} repeatCount="indefinite" begin="7s" />
                <animate attributeName="rx" values={rxValues} dur={duration} repeatCount="indefinite" begin="7s" />
                <animate attributeName="ry" values={ryValues} dur={duration} repeatCount="indefinite" begin="7s" />
              </ellipse>
              <ellipse cy="50">
                <animate attributeName="cx" values={cxValues} dur={duration} repeatCount="indefinite" begin="8s" />
                <animate attributeName="rx" values={rxValues} dur={duration} repeatCount="indefinite" begin="8s" />
                <animate attributeName="ry" values={ryValues} dur={duration} repeatCount="indefinite" begin="8s" />
              </ellipse>
              <ellipse cy="50">
                <animate attributeName="cx" values={cxValues} dur={duration} repeatCount="indefinite" begin="9s" />
                <animate attributeName="rx" values={rxValues} dur={duration} repeatCount="indefinite" begin="9s" />
                <animate attributeName="ry" values={ryValues} dur={duration} repeatCount="indefinite" begin="9s" />
              </ellipse>
              <ellipse cy="50">
                <animate attributeName="cx" values={cxValues} dur={duration} repeatCount="indefinite" begin="10s" />
                <animate attributeName="rx" values={rxValues} dur={duration} repeatCount="indefinite" begin="10s" />
                <animate attributeName="ry" values={ryValues} dur={duration} repeatCount="indefinite" begin="10s" />
              </ellipse>
              <ellipse cy="50">
                <animate attributeName="cx" values={cxValues} dur={duration} repeatCount="indefinite" begin="11s" />
                <animate attributeName="rx" values={rxValues} dur={duration} repeatCount="indefinite" begin="11s" />
                <animate attributeName="ry" values={ryValues} dur={duration} repeatCount="indefinite" begin="11s" />
              </ellipse>
              <ellipse cy="50">
                <animate attributeName="cx" values={cxValues} dur={duration} repeatCount="indefinite" begin="12s" />
                <animate attributeName="rx" values={rxValues} dur={duration} repeatCount="indefinite" begin="12s" />
                <animate attributeName="ry" values={ryValues} dur={duration} repeatCount="indefinite" begin="12s" />
              </ellipse>
              <ellipse cy="50">
                <animate attributeName="cx" values={cxValues} dur={duration} repeatCount="indefinite" begin="13s" />
                <animate attributeName="rx" values={rxValues} dur={duration} repeatCount="indefinite" begin="13s" />
                <animate attributeName="ry" values={ryValues} dur={duration} repeatCount="indefinite" begin="13s" />
              </ellipse>
            </g>
          </svg>
        </Box>
      </Grid>
    </motion.main >
  )
}

export default ProfilePage;