import React, { useState, useEffect } from "react";
import { createClient } from 'contentful';
import styled from 'styled-components';
import Link from "next/link";
import Image from 'next/image';
import Layout from '../../components/Layout';
import Grid from '../../components/Grid';
import Box from '../../components/Box';
import Text from '../../components/Text';
import { wipe, variants } from '../../components/AnimationVariants';
import { motion, useViewportScroll } from 'framer-motion';
import { Cross } from 'akar-icons';
import ReactPlayer from 'react-player/lazy';

const Line = styled(Box)`
  height: 1px;
  background: ${({ theme }) => theme.colors.lightTheme.contentPrimary};
  width: 100%;
`

const ProjectTitle = styled(Text)`
  text-align: center;
  text-transform: uppercase;
`

const CloseButton = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  left: 50%;
  z-index: 999;
  transition: all 300ms ${({ theme }) => theme.ease.Smooth};
  border-radius: 50%;
  background: ${({ scrollY }) => scrollY > 24 ? 'white' : 'none'};
  border: ${({ scrollY }) => scrollY > 24 ? '1px solid #AE922E' : 'none'};
  box-shadow: ${({ scrollY }) => scrollY > 24 ? '0 4px 8px 0px rgba(0,0,0,0.25)' : 'none'};
  &:hover {
    box-shadow: ${({ scrollY }) => scrollY > 24 ? '0 2px 4px 0px rgba(0,0,0,0.15)' : 'none'};
  }
  &:active {
    box-shadow: none;
  }
  svg {
    transition: all 300ms ${({ theme }) => theme.ease.Smooth};
  }
`

const VideoWrapper = React.forwardRef((props, ref) => (
  <Box ref={ref} span="span 1" borderRadius={[8, null, 16]} overflow="hidden">
    {props.children}
  </Box>
));

const ScrollToTop = styled(Text)`
  cursor: pointer;
  display: inline-block;
  line-height: 1em;
  background: none;
  outline: none;
  border: none;
  &:hover {
    &:after {
      content: '';
      background: ${({ theme }) => theme.colors.lightTheme.contentInverseTertiary};
      animation: ${wipe} 500ms ${({ theme }) => theme.ease.Smooth};
      height: 100%;
      width: 100%;
      transform: scaleX(0);
      position: absolute;
      left: 0;
    }
  }
`

export default function Slug({ entry }) {
  const year = entry.fields.year;
  const tags = entry.fields.tags;
  const matrix = entry.fields.matrix;
  const ref = React.createRef();
  const { scrollY } = useViewportScroll();
  const [hookedYPosition, setHookedYPosition] = useState(0);
  useEffect(() => {
    scrollY.onChange(y => setHookedYPosition(y));
    return () => {
      setHookedYPosition(0);
    }
  }, [scrollY]);

  return (
    <>
      <Layout title={entry.fields.title + ' — Arturo Wibawa'}>
        <Link href="/" passHref scroll={false}>
          <CloseButton
            as={motion.a}
            top="layout.1"
            size={hookedYPosition > 24 ? 48 : 32}
            color="lightTheme.contentPrimary"
            scrollY={hookedYPosition}
            initial={{ scale: 0, x: '-50%' }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Cross />
          </CloseButton>
        </Link>
        <Box
          as={motion.article}
          width="100%"
          mb={["layout.1", null, "layout.1/2"]}
          px="layout.1"
          mt={["layout.4", "layout.3"]}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Box style={{ clipPath: 'inset(0%)' }}>
            <ProjectTitle
              as={motion.h1}
              font={["HeadingMedium", "Display"]}
              variants={variants.slugTitle}
              pb="layout.1/8"
            >
              {entry.fields.title}
            </ProjectTitle>
          </Box>
          <Line
            as={motion.div}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              type: 'spring',
              damping: 20,
            }}
          />
          <Box
            columns="1/-1"
            pt={["layout.1/2", "layout.1/4"]}
            display="flex"
            justifyContent="space-between"
            style={{ clipPath: 'inset(0%)' }}
          >
            {year && <Text as={motion.h2} variants={variants.slugStats} fontSize={[3, 4]}>{year}</Text>}
            {tags && <Text as={motion.h2} variants={variants.slugStats} fontSize={[3, 4]}>{tags.join(", ")}</Text>}
          </Box>
        </Box>
        <Grid
          as={motion.article}
          mx="layout.1"
          variants={variants.slugContent}
          transition={{
            type: 'spring',
            stiffness: 600,
            damping: 100,
            mass: 10,
          }}
        >
          {matrix && matrix.map((item) => {
            const id = item.sys.contentType.sys.id;
            switch (id) {
              case 'media': // MEDIA BLOCK
                return (
                  item.fields.layout === 'Full width' ?
                    item.fields.assets.map((asset) => {
                      return (
                        <Box
                          columns="1/-1"
                          my={["layout.1/4", null, "layout.1/2"]}
                          key={asset.sys.id}
                          as="section"
                          borderRadius={[8, null, 16]}
                          overflow="hidden"
                        >
                          {asset.fields.file.contentType.includes('image') &&
                            <Image src={`http:${asset.fields.file.url}`} alt={asset.fields.title} layout="responsive" width={asset.fields.file.details.image.width} height={asset.fields.file.details.image.height} />
                          }
                          {asset.fields.file.contentType.includes('video') &&
                            <ReactPlayer url={asset.fields.file.url} playing muted loop width="100%" height="100%" />
                          }
                        </Box>
                      )
                    })
                    :
                    <Grid columns="1/-1" my={["layout.1/4", null, "layout.1/2"]} as="section" key={item.sys.id} gridTemplateColumns={["1fr", null, "repeat(2, 1fr)"]} gridRowGap={["layout.1/2", null, "layout.1"]}>
                      {item.fields.assets.map((asset) => {
                        return (
                          <React.Fragment key={asset.sys.id}>
                            {asset.fields.file.contentType.includes('image') &&
                              <Box span="span 1" width="100%" borderRadius={[8, null, 16]} overflow="hidden">
                                <Image src={`http:${asset.fields.file.url}`} alt={asset.fields.title} layout="responsive" width={asset.fields.file.details.image.width} height={asset.fields.file.details.image.height} />
                              </Box>
                            }
                            {asset.fields.file.contentType.includes('video') &&
                              <ReactPlayer ref={ref} url={asset.fields.file.url} playing muted loop wrapper={VideoWrapper} width="100%" height="100%" />
                            }
                          </React.Fragment>
                        )
                      }
                      )}
                    </Grid>
                );
                break;
              case 'text': // TEXT BLOCK
                return (
                  item.fields.alignText === "Left" ?
                    <Box as="section" my={["layout.1", null, "layout.2"]} columns={["1/-1", null, "5/span 4", "2/span 5"]} key={item.sys.id}>
                      <Text color="lightTheme.contentInverseTertiary" font={["ParagraphMedium", null, "ParagraphLarge"]} as="h3" textAlign={['center', null, 'left']}>
                        {item.fields.paragraph}
                      </Text>
                    </Box>
                    :
                    item.fields.alignText === "Center" ?
                      <Box as="section" my={["layout.1", null, "layout.2"]} columns={["1/-1", null, "5/span 4", "4/span 6"]} key={item.sys.id}>
                        <Text color="lightTheme.contentInverseTertiary" font={["ParagraphMedium", null, "ParagraphLarge"]} as="h3" textAlign="center">
                          {item.fields.paragraph}
                        </Text>
                      </Box>
                      :
                      <Box as="section" my={["layout.1", null, "layout.2"]} columns={["1/-1", null, "5/span 4", "7/span 5"]} key={item.sys.id}>
                        <Text color="lightTheme.contentInverseTertiary" font={["ParagraphMedium", null, "ParagraphLarge"]} as="h3" textAlign={['center', null, 'left']}>
                          {item.fields.paragraph}
                        </Text>
                      </Box>
                );
                break;
              default:
                console.log(`We don't have the ${id} component.`);
            }
          })}
          <Text
            as="section"
            columns="1/-1"
            my="layout.4"
            display="flex"
            justifyContent="center"
          >
            <ScrollToTop
              as="button"
              onClick={() => window.scrollTo(0, 0)}
              fontSize="12vw"
              color="lightTheme.contentInverseTertiary"
              fontFamily="Eina Light"
            >
              BACK TO TOP
            </ScrollToTop>
          </Text>
        </Grid>
      </Layout >
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
      content_type: 'project',
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
    .getEntries({ content_type: 'project' })
    .then((response) => response.items)

  const paths = entries.map(({ fields: { slug } }) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  }
}
