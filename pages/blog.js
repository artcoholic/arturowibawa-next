import { createClient } from 'contentful';
import Link from "next/link";
import styled from 'styled-components';
import Box from '../components/Box';
import Text from '../components/Text';
import Grid from '../components/Grid';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { variants, blink, radius, sphere } from '../components/AnimationVariants';

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

const Circle = styled.circle`
  animation: ${radius} 4s cubic-bezier(0.4, 0, 0.1, 0.8) infinite alternate-reverse;
`

const CircleWrapper = styled(Box)`
  width: 100%;
  svg {
    stroke: ${props => props.theme.colors.content.inverseSecondary};
    stroke-width: 1px;
    overflow: visible;
    display: block;
    opacity: 0.5;
  }
`

const ArticleWrapper = styled(Box)`
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.colors.bg.placeholder};
  &:after {
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
  &:hover {
    h2 {
    color: ${props => props.theme.colors.content.primary};
    }
    &:after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
`

const BlogPage = ({ data }) => {
  const entries = data[1].fields.items;

  return (
    <>
      <Head>
        <title>Writing — Arturo Wibawa</title>
      </Head>
      <Box
        position="fixed"
        width='50%'
        height='100%'
        display={['none', null, null, 'flex']}
        justifyContent="center"
        alignItems="center"
        px="layout.3"
        as={motion.section}
        exit={{ opacity: 0 }}
      >
        <CircleWrapper>
          <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
              {
                Array.from({ length: 9 }).map((_, i) => (
                  <Circle
                    key={i}
                    as={motion.circle}
                    cx={50}
                    vectorEffect="non-scaling-stroke"
                    style={{ animationDelay: i / 7 + 's' }}
                    initial={{ cy: 50, opacity: 0 }}
                    animate={{ cy: 5 * (i + 6), opacity: 1, transition: { delay: .5, duration: 2, } }}
                  />
                ))
              }
            </g>
          </svg>
        </CircleWrapper>
      </Box>
      <Grid
        mx="layout.1"
        py="layout.1"
        as={motion.section}
        initial="initial" animate="enter" exit="exit" variants={variants.main}
      >
        <Box as={motion.div} variants={variants.ProfileSection} columns={['span 2', 'span 4', '2/span 6', '7/span 5']} style={{ cursor: 'pointer' }} mt={["layout.4", "layout.3", null, "layout.2"]}>
          <HeaderWrapper as={motion.h1} variants={variants.ProfileContent} font={["HeadingLarge"]} mb="layout.1">
            Thoughts
          </HeaderWrapper>
          {entries.map((entry, index) =>
            <Link key={index} href={`/blog/${entry.fields.slug}`} passHref>
              <a style={{ textDecoration: 'none' }}>
                <ArticleWrapper as={motion.div} variants={variants.ProfileContent} my="layout.1/4">
                  <Text color="content.inverseTertiary" font="ParagraphMedium" mb="layout.1/2">
                    {`${entry.fields.date.slice(5, 7)} / ${entry.fields.date.slice(0, 4)}`}
                  </Text>
                  <Text as="h2" font="HeadingSmall" color="content.inverseTertiary" mb={["layout.1", null, null, "layout.1/2"]}>
                    {entry.fields.title}
                  </Text>
                </ArticleWrapper>
              </a>
            </Link>
          )}
        </Box>
      </Grid>
    </>
  )
}

export default BlogPage;

export async function getStaticProps() {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    removeUnresolved: true,
  })

  const data = await client
    .getEntries({
      content_type: 'list',
      include: 10,
    })
    .then((response) => response.items)

  return {
    props: {
      data,
    },
  }
}