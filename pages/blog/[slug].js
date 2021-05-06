import { useState, useEffect } from "react";
import styled from 'styled-components';
import Markdown from 'react-markdown';
import Head from 'next/head';
import Text from '../../components/Text';
import Box from '../../components/Box';
import Grid from '../../components/Grid';
import PreviewLabel from '../../components/PreviewLabel';
import { motion, useViewportScroll } from 'framer-motion';
import { variants } from '../../components/AnimationVariants';
import CloseButton from '../../components/CloseButton';
import { getAllArticlesForBlog, getArticlesAndMoreArticles } from '../../utils/api';

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

const Signature = styled(Box)`
 svg {
   fill: ${props => props.theme.colors.content.inverseSecondary};
 }
`

export default function Slug({ article, preview }) {
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
        <title>{article.title} — Arturo Wibawa</title>
      </Head>
      {preview && <PreviewLabel />}
      <CloseButton hookedYPosition={hookedYPosition} scrollYProgress={scrollYProgress} path={preview ? '/api/exit-preview' : '/blog'} />
      <Grid mx="layout.1" py="layout.1" as={motion.section} initial="initial" animate="enter" exit="exit" variants={variants.main}>
        <Box as={motion.div} variants={variants.ProfileSection} columns={['1/-1', null, '2/span 6', '4/span 6']} mt={["layout.4", "layout.3"]}>
          <Text as={motion.div} variants={variants.ProfileContent} font="ParagraphMedium" color="content.inverseTertiary" mb={['layout.1', "layout.3/4"]} display="flex" alignItems="baseline">
            {`${article.date.slice(5, 7)} / ${article.date.slice(0, 4)}`}
          </Text>
          <Text as={motion.h1} variants={variants.ProfileContent} font="HeadingLarge">
            {article.title}
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
          <Markdown source={article.content} escapeHtml={true} linkTarget="_blank" />
          <Signature width={240} mt="layout.1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1581.75 205.29"><path d="M1395.23,69c-10.09,4.9-18.09,12.66-24.65,21.46-12.09,16.26-23.43,33.08-35.09,49.66-1,1.39-2,2.71-3.07,4.06l-2-.43c0-3.86,0-7.72,0-11.58.07-10.3.42-20.61,0-30.9-.1-2.73-2.41-5.38-3.7-8.07-2.68,1.35-6,2.12-7.91,4.17-5.34,5.69-10,12-15.12,17.9-7,8.13-14.21,16.12-21.32,24.17l-2-1a62.48,62.48,0,0,1,1.82-8c3.13-8.59,7-16.94,9.53-25.69,1.1-3.78.51-8.58-.8-12.4-1.44-4.22-5.73-4.1-7.88-.1-1.64,3.06-2.51,6.51-4,9.65-1.27,2.59-2.4,5.87-4.6,7.3-12,7.79-24,15.68-36.57,22.36-6.9,3.65-14.88,5.74-22.63,7.19-8.75,1.63-13.89-2.78-13.15-11.62.7-8.3,3.17-16.49,5.3-24.61,1.89-7.21,5.26-14.12,6.43-21.41,3.14-19.56-14.65-34-33.26-27.33-4.32,1.56-8.88,3.52-12.21,6.53-7.85,7.1-15.83,14.32-22.32,22.61-12.53,16-21.47,33.94-24.81,54.3-2.17,13.16,3.6,23.68,15.25,25.55a32,32,0,0,0,15.56-1.61c12.81-4.74,22-14.65,31.34-24.14,2.06-2.1,3.75-4.56,6.07-7.42a54.69,54.69,0,0,1,3.91,5.1c5.68,10.09,14.86,14.09,25.65,12.56a114.15,114.15,0,0,0,26.74-7.39c8.35-3.41,16-8.64,24.49-13.4-.49,1.8-.85,3.31-1.32,4.8-1.74,5.55-3.59,11.06-5.24,16.63s-.43,9.36,3.68,11.64a10.93,10.93,0,0,0,13.58-2c7.79-8.65,15.33-17.53,23.19-26.11,3.6-3.94,7.73-7.41,11.62-11.09l1.44.78c0,1.93-.09,3.86,0,5.78.57,9.84,1.68,19.63,7,28.24,5.88,9.52,10.74,9.58,17,.54.18-.28.35-.56.54-.84,13.83-19.94,26.82-40.47,43.71-58.16,7.1-7.44,13.38-15.67,19.91-23.65a49.13,49.13,0,0,0,3.7-6.09l-1-1.76C1403.75,66.37,1399.18,67,1395.23,69Zm-208,40.43c-8.71,15.31-19.4,29.07-33.84,39.46a52.11,52.11,0,0,1-12.3,6.45c-7.07,2.59-12.68-1.09-11.72-8.48a83.14,83.14,0,0,1,6.38-23.31c9.39-20.76,21.93-39.53,38.88-55A61.26,61.26,0,0,1,1186,60.42c9.3-5.2,13.54-2.62,13.52,10.24C1199.15,83.09,1194.45,96.68,1187.22,109.39Z" /><path d="M973.46,5.88c.8-1.27,1.74-3.41,1.2-4.31s-2.95-1.81-4.27-1.5c-2.63.6-6,1.33-7.44,3.23-5.4,7.08-11.49,14.09-14.9,22.14-13.92,32.91-26.9,66.2-40.36,99.3-1,2.44-3,4.45-4.57,6.66-1.81-2.23-3.65-4.45-5.43-6.7a3.44,3.44,0,0,1-.56-1.38c-3.67-15.65-7.47-31.28-11-47-3.09-13.9-5.58-27.94-8.94-41.77-.64-2.67-4-6.35-6.29-6.51s-5.53,3-7.62,5.3a30.17,30.17,0,0,0-4.72,8.16q-4,9.15-7.44,18.5c-7,18.86-13.63,37.84-20.81,56.62-2,5.27-5.42,10-8.53,15.6-5.18-4.6-4.33-9.13-3.87-13.3,2.68-24.08,5.54-48.15,8.37-72.22,1.45-12.36,3.11-24.71,4.27-37.1.18-2-1.78-4.12-2.75-6.19-1.73,1.23-4.23,2.08-5.05,3.76a59.11,59.11,0,0,0-4.56,12.6C809.93,55.62,807.31,92,808,128.68a155.45,155.45,0,0,0,2.59,23.74c.74,4.24,1.7,9.8,6.91,10.56s7.75-4.26,9.55-8.19c4.56-9.95,9.23-19.95,12.56-30.34,7.57-23.61,15-47.2,27.82-68.67,1-1.66,2.18-3.2,3.88-5.65.56,2,.74,2.64.89,3.26,5.26,22.45,10,45.06,16.05,67.3,2.57,9.44,7.43,18.43,12.3,27,3,5.3,8.24,4.54,11.48-.76a37.79,37.79,0,0,0,3.15-6.76c4.65-12.81,9.39-25.59,13.76-38.49,7.9-23.3,15.29-46.83,27.25-68.47C961.35,23.81,967.73,15,973.46,5.88Z" /><path d="M173.84,136.63c-1.6-13.15-2.91-26.45-2.79-39.67.21-24.08,1.73-48.15,2.29-72.24.15-6.24-1.1-12.54-2-18.78-.17-1.21-1.52-3-2.55-3.14S166.09,3.88,165.35,5c-2.45,3.56-4.61,7.31-6.87,11-17.2,28.05-34.74,55.9-51.43,84.25-6.29,10.69-14,17.56-26.63,18.74-2.78.26-5.37,2.71-8,4.16a79,79,0,0,0,6,5.48c6.21,4.65,6.35,4.64,2,10.93a185.88,185.88,0,0,1-42.89,44.17c-6.35,4.6-13.86,7.72-21.07,11-4.38,2-8.76,1.07-12.46-2.42-.77-.73-2.27-.67-3.44-1-.1,1.35-.81,3.23-.19,3.93,2.46,2.81,4.94,6,8.14,7.66,9.75,4.92,18.84,1.65,27.26-3.82,13.46-8.75,23.27-21.21,33.45-33.3s20.44-24.51,31.27-36.2a31.47,31.47,0,0,1,13.4-8.09c11.59-3.57,23.47-6.18,35.28-9,6.5-1.54,9.7.13,12.1,6.45,1.76,4.64,2.73,9.58,4.27,14.31,2.63,8,4.76,16.29,8.35,23.87,3.46,7.29,10.15,9.09,18.17,5.74-2.49-2.22-4.58-3.87-6.43-5.76C179.84,151.3,174.82,144.72,173.84,136.63Zm-12.13-63.4q-1.29,11.86-3.2,23.67c-.28,1.68-1.53,4-2.93,4.58-12.05,5.16-25,6.17-38.44,8.27C133.06,82.59,148.53,56.22,164,29.86l2,.83C164.58,44.87,163.24,59.06,161.71,73.23Z" /><path d="M1572.51,110.19c-.45.08-.81.58-1.23.84-10.76,6.61-21.19,13.85-32.4,19.59a95.75,95.75,0,0,1-24.41,8.07c-8.69,1.76-13.5-2.78-13.26-11.6a68.55,68.55,0,0,1,2.59-16.58c2.75-9.72,7.11-19.06,9.12-28.9,3.91-19.13-14.05-34.39-32.52-28.08a47.45,47.45,0,0,0-12.77,6.58c-18.59,13.69-30.93,32.26-40.09,53.07-4.3,9.76-7.62,19.89-7.3,30.79.3,10.55,7.17,18.56,17.23,19.14a37,37,0,0,0,14.11-2.05c10.44-3.69,18.11-11.57,26-18.95,3.86-3.62,7.41-7.57,11.7-12a53,53,0,0,1,3.19,4.32c5.88,10.43,15.28,14.15,26.56,12.85,23.6-2.71,43-14.17,59.69-30.44,1.88-1.82,2.07-5.37,3-8.12C1578.67,109.21,1575.58,109.66,1572.51,110.19Zm-86.44-.14c-8.58,15-19.08,28.49-33.28,38.65a53.49,53.49,0,0,1-13.21,6.8c-6.34,2.22-11.22-1.27-11.06-8a45.34,45.34,0,0,1,2.6-14.58A169.44,169.44,0,0,1,1474,68.29a58.72,58.72,0,0,1,11.39-8c9-5,13.28-2.41,13.29,11.33C1498.51,83.23,1493.49,97.08,1486.07,110.05Z" /><path d="M1092.17,75.34c-8.75-1.69-17,.18-23.87,6-5.68,4.86-10.77,10.39-16.39,15.32-3,2.64-6.58,4.63-9.91,6.92l-2-1.26c1.34-5,2.06-10.2,4.14-14.83,4.6-10.29,10.48-20,14.6-30.5,1.85-4.71,1.64-10.78.67-15.9-1-5.41-5.13-6-8.54-1.6a50,50,0,0,0-7.38,12.33q-19.28,50.24-38,100.67c-1.41,3.76,1.15,7.8,4.88,7.95,24.77,1,48.51-2.79,69.8-16.33,14.36-9.13,25-21.31,28.67-38.52C1112.09,90,1105.54,77.91,1092.17,75.34ZM1078,134c-15.22,12.64-32.94,18.26-54.16,16,.6-3.15.57-6.08,1.71-8.45,11.64-24.43,29-43.18,54.5-53.52,4-1.64,8.69-1.86,13.11-2.4,3.91-.47,5.59,1.4,5.69,5.54C1099.23,109.09,1091.18,123,1078,134Z" /><path d="M481.06,153.75c-3.22.1-5.38-1-7.77-3.29-7.77-7.5-8.77-16.05-4.93-25.53,3.73-9.23,7.94-18.27,11.6-27.53a39.42,39.42,0,0,0,2.93-12c.12-2.17-2.12-4.47-3.29-6.71-1.74.94-3.9,1.5-5.15,2.88-6.71,7.38-12.91,15.24-19.83,22.41-11.31,11.7-22.79,23.25-34.73,34.29-3.73,3.45-9,5.42-13.9,7.38-3.22,1.31-5.21-.67-4.47-4.18.61-2.89,1.24-6,2.76-8.44,6.6-10.56,13.76-20.77,20.22-31.41a70.23,70.23,0,0,0,6.92-15.84c.56-1.85-1.66-4.55-2.61-6.87-1.91.86-4.54,1.19-5.61,2.65-7.24,9.93-14.7,19.76-21,30.28-5,8.34-8.85,17.45-12.39,26.53-2.36,6.06-.09,11.85,4.6,16.32,4.3,4.11,9.75,3.82,14.5,1.71a88.5,88.5,0,0,0,16.65-9.82c7.73-5.74,14.91-12.22,22.42-18.27,1.67-1.35,3.73-2.22,6.21-3.65,1.25,5.9,2.2,10.75,3.32,15.56,3,12.69,11.19,20,23.7,22.76,7.32,1.64,13.65-1.57,16.95-9.27C492.21,153.7,486.63,153.56,481.06,153.75Z" /><path d="M399.19,85.67c-.55-3.48-3-4.23-6.25-4.19-10,.14-20,0-30,0-12.05,0-13.21-1.5-9.71-13.5a127,127,0,0,1,4.67-12.6c2-4.92,4.6-9.64,6.28-14.66A30,30,0,0,0,366,29.19c-.21-2.66-2.71-5.14-4.18-7.7-1.85,1.84-3.75,3.64-5.52,5.55a6.45,6.45,0,0,0-1.09,2.23c-6.1,16.52-12.35,33-18.19,49.6-1.95,5.53-5.43,8.54-11,9.55-5.89,1.08-11.83,1.93-17.68,3.21a15.64,15.64,0,0,0-6.7,3c-1.57,1.33-3.53,4.47-3,5.53,1.07,2,3.79,4.11,6,4.27,4.39.32,8.89-.57,13.33-1.07,3.22-.36,6.43-.9,9.64-1.37l1.44,1.38c-1.73,6.52-3.36,13.07-5.22,19.56-3,10.54-6.37,21-9.09,31.61-.6,2.32.88,5.18,1.4,7.79,2.53-1.18,5.27-2,7.49-3.65,1.14-.82,1.44-2.89,2-4.45q8.39-25,16.69-50.13c1.6-4.85,4.78-8.12,9.68-9.16a200.58,200.58,0,0,1,20.08-3.32c7.27-.77,14.62-.73,21.9-1.4C396.44,90,399.81,89.65,399.19,85.67Z" /><path d="M663,80c-10.36,0-13.31,1-21.33,7.73A95.92,95.92,0,0,0,631.89,97c-10.51,11.73-19.88,24.2-23,40.13-2.06,10.56,1.52,18.57,9.65,22.37,7.18,3.35,14.81,4.47,22.35,2.13,25.23-7.81,39-26.39,46.07-50.67a34.65,34.65,0,0,0,.48-15.24C685.59,85.21,676.9,80,663,80Zm16.67,28.46a92.92,92.92,0,0,1-43.81,44.68c-4.46,2.21-9.86,3.9-14.11-.11s-4.22-9.91-2.88-15.43c2.23-9.16,7.57-16.65,14-23.19,7.58-7.68,15.51-15,23.76-22,2.51-2.12,6.58-2.41,9.93-3.54C679.77,89.82,685.14,96.93,679.71,108.5Z" /><path d="M563.21,70.77c-8.48,6.46-15.62,14.75-22.94,22.62-2.85,3.07-4.33,4.38-7.47.39-5.06-6.45-7-6-10.31,1.59a22,22,0,0,0-1.37,3.73c-4.33,18.89-8.61,37.79-13,57.21,1.89,2.32,3,4.94,4.73,5.41,1.4.39,3.87-1.47,5.21-2.93,1.53-1.66,2.35-4,3.45-6,10.24-19,19.89-38.4,33.93-55.06,11.75-13.93,24.46-26.41,44.07-28.36,1.34-.13,2.42-2.88,3.62-4.41-1.63-1.27-3.27-3.65-4.9-3.64C585.73,61.33,573.24,63.14,563.21,70.77Z" /><path d="M290.85,61.37a34.73,34.73,0,0,0-8.93.13c-20.7,1.88-35.75,13.13-48,29-5.31,6.9-5.38,6.92-11.57.56-2.55-2.61-4.54-2.42-6.28.7a30.58,30.58,0,0,0-2,4c-7.34,19.42-10,39.85-13.2,61.69.84,1.08,2,4,3.59,4.19s4.08-1.7,5.5-3.29c1.62-1.81,2.52-4.27,3.69-6.47,10.21-19.23,20.08-38.69,34.38-55.36,11.54-13.44,24.08-25.42,43.15-27.19,1.3-.12,3.17-2.82,3.28-4.41C294.56,63.78,292.31,61.63,290.85,61.37Z" /><path d="M979.24,93.13a34.51,34.51,0,0,0-4.39,6.63c-9.64,17.76-16.15,36.77-22.19,56-.77,2.44-2.42,5.15,1.28,6.77s5.59-.24,7.09-3.3c5.24-10.75,11.06-21.25,15.64-32.28,4.17-10,7-20.66,10.29-30.59-1.18-2.92-1.93-4.8-2.69-6.68C982.57,90.79,980.57,91.66,979.24,93.13Z" /><path d="M992.39,52.7c-3.29-.13-5.67.6-5.3,4.19C987,62.32,990.3,67.38,993.63,67c4.22-.49,4.9-4.08,5.25-7.35C999.32,55.55,996.52,52.87,992.39,52.7Z" /></svg>
          </Signature>
        </MarkdownWrapper>
      </Grid>
    </>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getArticlesAndMoreArticles(params.slug, preview)

  return {
    props: {
      preview,
      article: data?.article ?? null,
      moreArticles: data?.moreArticles ?? null,
    },
  }
}

export async function getStaticPaths() {
  const allArticles = await getAllArticlesForBlog()
  return {
    paths: allArticles?.map(({ slug }) => `/blog/${slug}`) ?? [],
    fallback: false,
  }
}