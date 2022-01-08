import Link from "next/link";
import styled from 'styled-components';
import Box from '../components/Box';
import Text from '../components/Text';
import Grid from '../components/Grid';
import GradientBox from '../components/GradientBox';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { variants, radius } from '../components/AnimationVariants';
import { getAllArticlesForBlog } from '../utils/api';

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

const ArticleLink = styled.a`
  text-decoration: none;

  &:hover, &:focus {
    .article-wrapper {
       background: ${props => props.theme.colors.bg.secondary};
    }
    @media (min-width: ${props => props.theme.breakpoints[2]}) {
      .article-wrapper {
        background: none;
        h2 {
        color: ${props => props.theme.colors.content.primary};
        }
        &:after {
          transform: scaleX(1);
          transform-origin: left;
        }
      }
    }
  }

`

const ArticleWrapper = styled(Box)`
  width: 100%;
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
  @media (min-width: ${props => props.theme.breakpoints[2]}) {
    border: 0;
    border-bottom: 1px solid ${props => props.theme.colors.bg.placeholder};
  }
`

const BlogPage = ({ allArticles }) => {
  return (
    <>
      <Head>
        <title>Thoughts — Arturo Wibawa</title>
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
        py="layout.2"
        as={motion.section}
        initial="initial" animate="enter" exit="exit" variants={variants.main}
      >
        <Box
          as={motion.div}
          variants={variants.ProfileSection}
          columns={['span 2', 'span 4', '2/span 6', '7/span 5']}
          mt={["layout.4", "layout.3", null, "layout.2"]}
        >
          <Text as={motion.h1} variants={variants.ProfileContent} font={["Display", null, null, "HeadingLarge"]} mb={["layout.1", null, null, 0]}>
            Thoughts
          </Text>
          {allArticles.map((article, index) =>
            <Link key={index} href={`/blog/${article.slug}`} passHref>
              <ArticleLink title={article.title}>
                <ArticleWrapper
                  as={motion.div}
                  className="article-wrapper"
                  variants={variants.ProfileContent}
                  bg={['bg.tertiary', null, null, 'bg.primary']}
                  borderRadius={[8, null, null, 0]}
                  px={['layout.1', null, null, 0]} py={["layout.1", null, null, "layout.1/2"]}
                  my={["layout.3/4", null, null, "layout.1/2"]}
                >
                  <Text color="content.inverseSecondary" font="ParagraphMedium" mb="layout.1/2">
                    {`${article.date.slice(5, 7)} / ${article.date.slice(0, 4)}`}
                  </Text>
                  <Text
                    as="h2"
                    font="HeadingSmall"
                    color="content.inverseTertiary"
                    overflow="hidden"
                    style={{ textOverflow: 'ellipsis' }}
                  >
                    {article.title}
                  </Text>
                </ArticleWrapper>
              </ArticleLink>
            </Link>
          )}
        </Box>
        <GradientBox />
      </Grid>
    </>
  )
}

export default BlogPage;

export async function getStaticProps() {
  const allArticles = await getAllArticlesForBlog() ?? []
  return {
    props: { allArticles },
  }
}