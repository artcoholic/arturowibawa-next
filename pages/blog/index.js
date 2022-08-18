import { Suspense } from "react";
import Link from "next/link";
import { styled } from "../../stitches.config";
import Box from "../../components/Box";
import Text from "../../components/Text";
import Grid from "../../components/Grid";
import GradientBox from "../../components/GradientBox";
import Head from "next/head";
import { motion, MotionConfig, useScroll } from "framer-motion";
import { variants } from "../../components/AnimationVariants";
import { getAllArticlesForBlog } from "../../utils/api";
import { Canvas } from "@react-three/fiber";
import {
  Lights,
  Dodecahedron,
  transition,
  Torus,
} from "../../components/Objects";

const ArticleLink = styled("a", {
  textDecoration: "none",
  "&:after": {
    display: "none",
  },

  "&:hover, &:focus": {
    ".article-wrapper": {
      background: "$bg_secondary",
      "@bp3": {
        background: "none",
        h2: {
          color: "$fg_primary",
        },
        "&:after": {
          transform: "scaleX(1)",
          transformOrigin: "left",
        },
      },
    },
  },
});

const ArticleWrapper = styled(Box, {
  width: "100%",
  bg: "$bg_tertiary",
  borderRadius: 8,
  px: "$1",
  py: "$1",
  my: "$0_75",
  "&:after": {
    content: "",
    position: "absolute",
    width: "100%",
    height: 1,
    backgroundColor: `$fg_primary`,
    bottom: 0,
    left: 0,
    transform: "scaleX(0)",
    transition: "transform 300ms $ease$smooth",
    transformOrigin: "right",
  },
  "@bp2": {
    border: 0,
    borderBottom: "1px solid $bg_placeholder",
  },
  "@bp3": {
    bg: "$bg_primary",
    borderRadius: 0,
    px: 0,
    py: "$0_5",
    my: "$0_5",
  },
});

const BlogPage = ({ allArticles }) => {
  const { scrollYProgress } = useScroll();
  return (
    <>
      <Head>
        <title>Thoughts — Arturo Wibawa</title>
      </Head>
      <Box
        css={{
          position: "fixed",
          width: "50%",
          height: "100%",
          display: "none",
          "@bp3": { display: "flex" },
          justifyContent: "center",
          alignItems: "center",
          left: 0,
        }}
        as={motion.section}
        exit={{ opacity: 0 }}
      >
        <Suspense fallback={<span>loading...</span>}>
          <Canvas>
            <MotionConfig transition={transition}>
              <Lights />
              <Dodecahedron scrollYProgress={scrollYProgress} />
              <Torus />
            </MotionConfig>
          </Canvas>
        </Suspense>
      </Box>
      <Grid
        as={motion.section}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={variants.main}
        css={{
          mx: "$1",
          py: "$2",
        }}
      >
        <Box
          as={motion.div}
          variants={variants.ProfileSection}
          css={{
            gridColumn: "span 2",
            mt: "$4",
            "@bp1": { gridColumn: "span 4", mt: "$3" },
            "@bp2": { gridColumn: "2/span 6" },
            "@bp3": { gridColumn: "7/span 5", mt: "$2" },
          }}
        >
          <Text
            as={motion.h1}
            variants={variants.ProfileContent}
            css={{
              typeScale: "$display",
              mb: "$1",
              "@bp3": { typeScale: "$headingLarge", mb: 0 },
            }}
          >
            Thoughts
          </Text>
          {allArticles.map((article, index) => (
            <Link key={index} href={`/blog/${article.slug}`} passHref>
              <ArticleLink title={article.title}>
                <ArticleWrapper
                  as={motion.div}
                  className="article-wrapper"
                  variants={variants.ProfileContent}
                >
                  <Text
                    css={{
                      color: "$fg_inverseSecondary",
                      typeScale: "$paragraphMedium",
                      mb: "$0_5",
                    }}
                  >
                    {`${article.date.slice(5, 7)} / ${article.date.slice(
                      0,
                      4
                    )}`}
                  </Text>
                  <Text
                    as="h2"
                    css={{
                      typeScale: "$headingSmall",
                      color: "$fg_inverseTertiary",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {article.title}
                  </Text>
                </ArticleWrapper>
              </ArticleLink>
            </Link>
          ))}
        </Box>
        <GradientBox />
      </Grid>
    </>
  );
};

export default BlogPage;

export async function getStaticProps() {
  const allArticles = (await getAllArticlesForBlog()) ?? [];
  return {
    props: { allArticles },
  };
}
