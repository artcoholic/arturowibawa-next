import React from "react";
import { styled } from "../config/stitches.config";
import Grid from "./Grid";
import Box from "./Box";
import GalleryBlock from "./GalleryBlock";
import Image from "next/image";
import { variants } from "./AnimationVariants";
import { motion } from "framer-motion";
import ReactPlayer from "react-player/lazy";
import Markdown from "react-markdown";

const MarkdownWrapper = styled("div", {
  my: "$1",
  color: "$fg_inverseTertiary",
  typeScale: "$paragraphSmall",
  "@bp1": { typeScale: "$paragraphMedium" },
  "@bp2": { my: "$2" },
  "@bp3": { typeScale: "$paragraphLarge" },
  gridColumn: "1/-1",
  textAlign: "left",
  variants: {
    alignText: {
      Left: {
        "@bp2": { gridColumn: "1/span 4" },
        "@bp3": { gridColumn: "2/span 5" },
      },
      Center: {
        "@bp2": { gridColumn: "3/span 4", textAlign: "center" },
        "@bp3": { gridColumn: "4/span 6" },
      },
      Right: {
        "@bp2": { gridColumn: "5/span 4" },
        "@bp3": { gridColumn: "7/span 5" },
      },
    },
  },
});

const MediaBlockGrid = styled(Grid, {
  gridColumn: "1/-1",
  my: "$0_25",
  gridRowGap: "$0_5",
  gridColumnGap: "$0_5",
  gridTemplateColumns: "1fr",
  variants: {
    layout: {
      Thirds: {
        "@bp2": { gridTemplateColumns: "repeat(3, 1fr)" },
      },
      Split: {
        "@bp1": { gridTemplateColumns: "repeat(2, 1fr)" },
      },
    },
  },
  "@bp2": {
    gridRowGap: "$1",
    gridColumnGap: "$1",
    my: "$0_5",
  },
});

const GalleryWrapper = styled(Box, {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  flexFlow: "row nowrap",
  paddingTop: "56.25%",
  gridColumn: "-1/1",
  my: "$0_25",
  "@bp2": { my: "$0_5" },
  img: {
    cursor: "grab",
    "&:active": {
      cursor: "grabbing",
    },
  },
});

const SlugContent = ({ entry }) => {
  const matrix = entry.matrixCollection.items;
  const ref = React.createRef();
  // console.log('SlugContent');
  return (
    <Grid
      css={{
        p: "$1",
      }}
    >
      {matrix &&
        matrix.map((item) => {
          const id = item.__typename;
          switch (id) {
            case "Media": // MEDIA BLOCK
              return (
                <MediaBlockGrid key={item.sys.id} layout={item.layout}>
                  {item.assetsCollection.items.map((asset) => {
                    return (
                      <Box
                        as={motion.div}
                        variants={variants.trigger}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.1 }}
                        css={{
                          span: "span 1",
                          width: "100%",
                          borderRadius: ".5rem",
                          overflow: "hidden",
                          "@bp2": { borderRadius: "1rem" },
                          position: "relative",
                        }}
                        key={asset.sys.id}
                      >
                        {asset.contentType.includes("image") && (
                          <Image
                            src={asset.url}
                            alt={asset.title}
                            placeholder="blur"
                            blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                            width={asset.width}
                            height={asset.height}
                            sizes="(max-width: 600px) 48vw, (max-width: 1023px) 96vw"
                            style={{
                              width: "100%",
                              height: "auto",
                              objectFit: "contain",
                            }}
                          />
                        )}
                        {asset.contentType.includes("video") && (
                          <ReactPlayer
                            ref={ref}
                            url={asset.url}
                            playing
                            muted
                            loop
                            width="100%"
                            height="100%"
                            playsinline
                          />
                        )}
                      </Box>
                    );
                  })}
                </MediaBlockGrid>
              );
              break;
            case "Text": // TEXT BLOCK
              return (
                <MarkdownWrapper
                  as={motion.div}
                  alignText={item.alignText}
                  key={item.sys.id}
                  variants={variants.trigger}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <Markdown children={item.paragraph} linkTarget="_blank" />
                </MarkdownWrapper>
              );
              break;
            case "Gallery": // GALLERY BLOCK
              return (
                <GalleryWrapper
                  as={motion.div}
                  key={item.sys.id}
                  variants={variants.trigger}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <GalleryBlock item={item} />
                </GalleryWrapper>
              );
              break;
            default:
              console.log(`We don't have the ${id} component.`);
          }
        })}
    </Grid>
  );
};

export default SlugContent;
