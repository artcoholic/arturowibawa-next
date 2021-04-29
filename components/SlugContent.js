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
`

const SlugContent = ({ entry }) => {
  const matrix = entry.fields.matrix;
  const ref = React.createRef();
  return (
    <Grid
      as={motion.section}
      mx="layout.1"
      mb={["layout.4", 'layout.3', null, 'layout.1/2']}
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
                      bg="bg.placeholder"
                    >
                      {asset.fields.file.contentType.includes('image') &&
                        <Image src={`http:${asset.fields.file.url}`} alt={asset.fields.title} layout="responsive" width={asset.fields.file.details.image.width} height={asset.fields.file.details.image.height} />
                      }
                      {asset.fields.file.contentType.includes('video') &&
                        <ReactPlayer url={asset.fields.file.url} playing muted loop width="100%" height="100%" playsinline />
                      }
                    </Box>
                  )
                })
                :
                <Grid columns="1/-1" my={["layout.1/4", null, "layout.1/2"]} as="section" key={item.sys.id} gridTemplateColumns={["1fr", null, "repeat(2, 1fr)"]} gridRowGap={["layout.1/2", null, "layout.1"]}>
                  {item.fields.assets.map((asset) => {
                    return (
                      <Box
                        span="span 1"
                        width="100%"
                        borderRadius={[8, null, 16]}
                        overflow="hidden"
                        bg="bg.placeholder"
                        key={asset.sys.id}
                      >
                        {asset.fields.file.contentType.includes('image') &&
                          <Image src={`http:${asset.fields.file.url}`} alt={asset.fields.title} layout="responsive" width={asset.fields.file.details.image.width} height={asset.fields.file.details.image.height} />
                        }
                        {asset.fields.file.contentType.includes('video') &&
                          <ReactPlayer ref={ref} url={asset.fields.file.url} playing muted loop width="100%" height="100%" playsinline />
                        }
                      </Box>
                    )
                  }
                  )}
                </Grid>
            );
            break;
          case 'text': // TEXT BLOCK
            return (
              <MarkdownWrapper
                as="section"
                my={["layout.1", null, "layout.2"]}
                columns={
                  item.fields.alignText === "Left" ? ["1/-1", null, "1/span 4", "2/span 5"] : item.fields.alignText === "Center" ? ["1/-1", null, "3/span 4", "4/span 6"] : ["1/-1", null, "5/span 4", "7/span 5"]
                }
                key={item.sys.id}
                color="content.inverseTertiary"
                font={["ParagraphMedium", null, "ParagraphLarge"]}
                textAlign={
                  item.fields.alignText === "Center" ? 'center' : ['center', null, 'left']
                }
              >
                <Markdown source={item.fields.paragraph} escapeHtml={true} linkTarget="_blank" />
              </MarkdownWrapper>
            );
            break;
          default:
            console.log(`We don't have the ${id} component.`);
        }
      })}
    </Grid>
  )
}

export default SlugContent;