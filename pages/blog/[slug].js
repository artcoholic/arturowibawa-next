import { useState, useEffect } from "react";
import styled from 'styled-components';
import { createClient } from 'contentful';
import Markdown from 'react-markdown';
import Head from 'next/head';
import Text from '../../components/Text';
import Box from '../../components/Box';
import Grid from '../../components/Grid';
import { motion, useViewportScroll } from 'framer-motion';
import { variants } from '../../components/AnimationVariants';
import CloseButton from '../../components/CloseButton';

const MarkdownWrapper = styled(Text)`
  a {
    position: relative;
    transition: transform 1000ms ${props => props.theme.ease.Smooth};
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
  }
  p {
    margin-bottom: ${props => props.theme.space.layout['1/2']}
  }
`

export default function Slug({ entry }) {
  const [hookedYPosition, setHookedYPosition] = useState(0);
  const { scrollY, scrollYProgress } = useViewportScroll();

  useEffect(() => {
    scrollY.onChange(y => setHookedYPosition(y));
    return () => {
      setHookedYPosition(0);
    }
  }, [scrollY]);
  return (
    <>
      <Head>
        <title>{entry.fields.title} — Arturo Wibawa</title>
      </Head>
      <CloseButton hookedYPosition={hookedYPosition} scrollYProgress={scrollYProgress} path={'/blog'} />
      <Grid mx="layout.1" py="layout.1" as={motion.section} initial="initial" animate="enter" exit="exit" variants={variants.main}>
        <Box as={motion.div} variants={variants.ProfileSection} columns={['1/-1', null, '2/span 6', '4/span 6']} mt={["layout.4", "layout.3"]}>
          <Text as={motion.h2} variants={variants.ProfileContent} font="ParagraphMedium" color="content.primary" mb={['layout.1', "layout.3/4"]} bg="bg.secondary" display="inline-block" pt={3} px=".5em" borderRadius=".25em">
            {entry.fields.date.slice(5, 7)} / {entry.fields.date.slice(0, 4)}
          </Text>
          <Text as={motion.h1} variants={variants.ProfileContent} font="HeadingLarge">
            {entry.fields.title}
          </Text>
        </Box>
        <Box
          as={motion.div}
          width="100%"
          height={1}
          bg="content.inverseSecondary"
          columns={['1/-1', null, null, '3/span 8']}
          mt={["layout.1", "layout.1/2"]}
          mb={["layout.1n", "layout.1"]}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            type: 'spring',
            damping: 20,
          }}
        />
        <MarkdownWrapper
          as={motion.article}
          columns={['1/-1', null, '2/span 6', '4/span 6']}
          font="ParagraphMedium"
          color="content.inverseTertiary"
          variants={variants.ProfileContent}
        >
          <Markdown source={entry.fields.content} escapeHtml={true} linkTarget="_blank" />
        </MarkdownWrapper>
      </Grid>
    </>
  )
}

export async function getStaticProps(context) {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })

  const result = await client
    .getEntries({
      content_type: 'article',
      'fields.slug': context.params.slug,
    })
    .then((response) => response.items);

  const entry = result.pop();

  if (!entry) {
    return { props: {} }
  }

  return {
    props: {
      entry,
    },
  }
}

export async function getStaticPaths() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })
  const entries = await client
    .getEntries({ content_type: 'article' })
    .then((response) => response.items)

  const paths = entries.map(({ fields: { slug } }) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  }
}