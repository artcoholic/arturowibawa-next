import React from 'react';
import styled from 'styled-components';
import Grid from './Grid'
import Box from './Box';
import Text from './Text';
import Image from 'next/image';
import { variants } from './AnimationVariants'
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player/lazy';
import Markdown from 'react-markdown';

const ScrollToTop = styled(Text)`
  cursor: pointer;
  display: inline-block;
  line-height: 1em;
  background: none;
  outline: none;
  border: none;
  padding: 0;
  &:hover {
    &:after {
      transform: scaleX(1);
      transform-origin: 0%;
    }
  }
  &:after {
    content: '';
    position: absolute;
    background: ${({ theme }) => theme.colors.lightTheme.contentInverseTertiary};
    transition: transform 500ms ${({ theme }) => theme.ease.Smooth};
    height: 100%;
    width: 100%;
    left: 0;
    transform: scaleX(0);
    transform-origin: 100%;
  }
`

const MarkdownWrapper = styled(Text)`
  a {
    position: relative;
    transition: transform 1000ms ${({ theme }) => theme.ease.Smooth};
    text-decoration: none;
    white-space: nowrap;
    font-family: var(--eina-regular);
    color: ${({ theme }) => theme.colors.lightTheme.contentPrimary};
    &:hover {
      &:after {
        transform: scaleX(1);
        transform-origin: 0%;
      }
    }
    &:after {
      content: '';
      background: ${({ theme }) => theme.colors.lightTheme.contentPrimary};
      transition: transform 250ms ${({ theme }) => theme.ease.smooth};
      height: 100%;
      left: 0;
      bottom: 0;
      width: 100%;
      transform: scaleX(0);
      transform-origin: 100%;
      position: absolute;
    }
  }
`

const VideoWrapper = React.forwardRef((props, ref) => (
  <Box ref={ref} span="span 1" borderRadius={[8, null, 16]} overflow="hidden">
    {props.children}
  </Box>
));

const SlugContent = ({ entry }) => {
  const matrix = entry.fields.matrix;
  const ref = React.createRef();
  return (
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
                <MarkdownWrapper
                  as="section"
                  my={["layout.1", null, "layout.2"]}
                  columns={["1/-1", null, "1/span 4", "2/span 5"]}
                  key={item.sys.id}
                  color="lightTheme.contentInverseTertiary"
                  font={["ParagraphMedium", null, "ParagraphLarge"]}
                  textAlign={['center', null, 'left']}
                >
                  <Markdown source={item.fields.paragraph} escapeHtml={true} linkTarget="_blank" />
                </MarkdownWrapper>
                :
                item.fields.alignText === "Center" ?
                  <MarkdownWrapper
                    as="section"
                    my={["layout.1", null, "layout.2"]}
                    columns={["1/-1", null, "3/span 4", "4/span 6"]}
                    key={item.sys.id}
                    color="lightTheme.contentInverseTertiary"
                    font={["ParagraphMedium", null, "ParagraphLarge"]}
                    textAlign="center"
                  >
                    <Markdown source={item.fields.paragraph} escapeHtml={true} linkTarget="_blank" />
                  </MarkdownWrapper>
                  :
                  <MarkdownWrapper
                    as="section" my={["layout.1", null, "layout.2"]}
                    columns={["1/-1", null, "5/span 4", "7/span 5"]}
                    key={item.sys.id}
                    color="lightTheme.contentInverseTertiary"
                    font={["ParagraphMedium", null, "ParagraphLarge"]}
                    textAlign={['center', null, 'left']}
                  >
                    <Markdown source={item.fields.paragraph} escapeHtml={true} linkTarget="_blank" />
                  </MarkdownWrapper>
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
          as={motion.button}
          onClick={() => window.scrollTo(0, 0)}
          fontSize="12vw"
          color="lightTheme.contentInverseTertiary"
          fontFamily="Eina Light"
        >
          BACK TO TOP
            </ScrollToTop>
      </Text>
    </Grid>
  )
}

export default SlugContent;