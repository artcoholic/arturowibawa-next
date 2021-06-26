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
  const matrix = entry.matrixCollection.items;
  const ref = React.createRef();
  return (
    <Grid
      as={motion.section}
      mx="layout.1"
      mb={["layout.3/4", null, null, 'layout.1/2']}
      variants={variants.slugContent}
      transition={{
        type: 'spring',
        stiffness: 600,
        damping: 100,
        mass: 10,
      }}
    >
      {matrix && matrix.map((item) => {
        const id = item.__typename;
        switch (id) {
          case 'Media': // MEDIA BLOCK
            return (
              <Grid
                as="section"
                key={item.sys.id}
                columns="1/-1"
                my={["layout.1/4", null, "layout.1/2"]}
                gridTemplateColumns={
                  item.layout === 'Thirds' ? ["1fr", null, "repeat(3, 1fr)"] : item.layout === 'Split' ? ["1fr", null, "repeat(2, 1fr)"] : "1fr"}
                gridRowGap={["layout.1/2", null, "layout.1"]}
              >
                {item.assetsCollection.items.map((asset) => {
                  return (
                    <Box
                      span="span 1"
                      width="100%"
                      borderRadius={[8, null, 16]}
                      overflow="hidden"
                      bg="bg.placeholder"
                      key={asset.sys.id}
                    >
                      {asset.contentType.includes('image') &&
                        <Image
                          src={asset.url}
                          alt={asset.title}
                          placeholder="blur"
                          quality={35}
                          blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          layout="responsive"
                          width={asset.width}
                          height={asset.height}
                          sizes="(max-width: 600px) 50vw, (max-width: 1023px) 48vw, 23vw"
                        />
                      }
                      {asset.contentType.includes('video') &&
                        <ReactPlayer ref={ref} url={asset.url} playing muted loop width="100%" height="100%" playsinline />
                      }
                    </Box>
                  )
                })}
              </Grid>
            );
            break;
          case 'Text': // TEXT BLOCK
            return (
              <MarkdownWrapper
                as="section"
                my={["layout.1", null, "layout.2"]}
                columns={
                  item.alignText === "Left" ? ["1/-1", null, "1/span 4", "2/span 5"] : item.alignText === "Center" ? ["1/-1", null, "3/span 4", "4/span 6"] : ["1/-1", null, "5/span 4", "7/span 5"]
                }
                key={item.sys.id}
                color="content.inverseTertiary"
                font={["ParagraphSmall", "ParagraphMedium", null, "ParagraphLarge"]}
                textAlign={
                  item.alignText === "Center" ? ['left', null, 'center'] : 'left'
                }
              >
                <Markdown children={item.paragraph} linkTarget="_blank" />
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