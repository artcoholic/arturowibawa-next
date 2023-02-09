import { useEffect, Suspense } from "react";
import { styled, keyframes } from "../../config/stitches.config";
import Head from "next/head";
import Box from "../../components/Box";
import Grid from "../../components/Grid";
import Text from "../../components/Text";
import GradientBox from "../../components/GradientBox";
import { motion, useScroll, useMotionValue, MotionConfig } from "framer-motion";
import { variants } from "../../components/AnimationVariants";
import ExperienceItem from "./ExperienceItem";
import SocialItem from "./SocialItem";
import {
  ArrowDown,
  Send,
  TwitterFill,
  LinkedinFill,
  GithubFill,
  CodepenFill,
  DribbbleFill,
} from "akar-icons";
import { Canvas } from "@react-three/fiber";
import {
  Icosahedron,
  Torus,
  Lights,
  transition,
} from "../../components/Objects";

const List = styled(Text, {
  padding: 0,
  listStyle: "none",
  typeScale: "$paragraphMedium",
  color: "$fg_inverseTertiary",
});

const arrow = keyframes({
  from: { transform: "translateY(0)" },
  to: { transform: "translateY(1rem)" },
});

const ProfilePage = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useMotionValue(1);
  const y = useMotionValue(0);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest > 0.2) {
        y.set(12);
        opacity.set(0);
      } else {
        y.set(0);
        opacity.set(1);
      }
    });
  }, []);

  return (
    <>
      <Head>
        <title>Profile — Arturo Wibawa</title>
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
          right: 0,
        }}
        as={motion.section}
        exit={{ opacity: 0 }}
      >
        <Suspense fallback={<span>loading...</span>}>
          <Canvas>
            <MotionConfig transition={transition}>
              <Lights />
              <Icosahedron scrollYProgress={scrollYProgress} />
              <Torus />
            </MotionConfig>
          </Canvas>
        </Suspense>
      </Box>
      <Grid
        css={{
          mx: "$1",
          pt: "$2",
          "@bp3": { pt: 0 },
          pb: "$2",
        }}
        as={motion.section}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={variants.main}
      >
        <Box
          css={{
            position: "fixed",
            top: 0,
            left: "calc($2 + 32px)",
            height: "100%",
            width: 1,
            bg: "$bg_placeholder",
            display: "none",
            "@bp3": { display: "block" },
          }}
        />
        <Box
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gridColumn: "-1/1",
            justifyContent: "center",
            height: "auto",
            mt: "$4",
            mb: "$2",
            "@bp1": { gridColumn: "1/span 4" },
            "@bp2": { gridColumn: "2/span 6" },
            "@bp3": { gridColumn: "2/span 5", height: "100vh", mt: 0, mb: 0 },
          }}
          as={motion.div}
          variants={variants.trigger}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Text
            as="h1"
            css={{
              mb: "$0_5",
              typeScale: "$display",
              "@bp3": { typeScale: "$headingLarge" },
            }}
          >
            About Me
          </Text>
          <Text
            as="p"
            css={{
              color: "$fg_inverseTertiary",
              typeScale: "$paragraphMedium",
              "@bp4": { typeScale: "$paragraphLarge" },
            }}
          >
            Arturo Wibawa is a product designer based in Los Angeles, California
            with a strong focus on product strategy, user experience, and
            interaction design.
            <br />
            <br />
            He&apos;s keen to experiment with new technology and believes that
            the best solutions are the simplest ones.
          </Text>
        </Box>
        <Box
          as={motion.div}
          variants={variants.trigger}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.1 }}
          css={{
            gridColumn: "-1/1",
            mt: 0,
            mb: "$1",
            "@bp1": { gridColumn: "1/span 4" },
            "@bp2": { gridColumn: "2/span 6" },
            "@bp3": { gridColumn: "2/span 5", mt: "-4rem", mb: "$0_5" },
          }}
        >
          <Text
            as="h2"
            css={{
              mb: "1rem",
              typeScale: "$headingSmall",
              color: "$fg_inverseSecondary",
            }}
          >
            Areas of Focus
          </Text>
          <List as="ul">
            <li>UI and UX Design</li>
            <li>Art Direction</li>
            <li>Product Design</li>
            <li>Design Systems and Tooling</li>
            <li>Front-end Development</li>
          </List>
        </Box>
        <Box
          as={motion.div}
          variants={variants.trigger}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.1 }}
          css={{
            gridColumn: "-1/1",
            my: "$1",
            "@bp1": { gridColumn: "1/span 4" },
            "@bp2": { gridColumn: "2/span 6" },
            "@bp3": { gridColumn: "2/span 5", my: "$0_5" },
          }}
        >
          <Text
            as="h2"
            css={{
              mb: "1rem",
              font: "$headingSmall",
              color: "$fg_inverseSecondary",
            }}
          >
            Experience
          </Text>
          <List as="ul">
            <Box as="li" css={{ mb: "$0_25" }}>
              <Text as="a" href="https://madeinhaus.com/" target="_blank">
                HAUS
              </Text>
              <ExperienceItem position="ACD" date="2022 – Present" mt />
              <ExperienceItem
                position="Senior Product Designer"
                date="2020 – 2022"
              />
              <ExperienceItem position="Product Designer" date="2018 – 2020" />
              <ExperienceItem
                position="Web Designer"
                date="2016 – 2018"
                line={false}
              />
            </Box>
            <Box as="li" css={{ mb: "$0_25" }}>
              <Text as="a" href="https://wonderful.io/" target="_blank">
                Wonderful Collective
              </Text>
              <ExperienceItem
                position="Web Designer"
                date="2014 – 2016"
                line={false}
                mt
              />
            </Box>
            <Box as="li" css={{ mb: "$0_25" }}>
              <Text
                as="a"
                href="https://www.columnfivemedia.com/"
                target="_blank"
              >
                Column Five Media
              </Text>
              <ExperienceItem
                position="Visual Designer"
                date="2012 – 2014"
                line={false}
                mt
              />
            </Box>
            <Box as="li">
              <Text color="content.inverseTertiary">Cal Poly Pomona</Text>
              <ExperienceItem
                position="Graphic Designer"
                date="2010 – 2011"
                line={false}
                mt
              />
            </Box>
          </List>
        </Box>
        <Box
          as={motion.div}
          variants={variants.trigger}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.1 }}
          css={{
            gridColumn: "-1/1",
            mt: "$1",
            "@bp1": { gridColumn: "1/span 4" },
            "@bp2": { gridColumn: "2/span 6" },
            "@bp3": { gridColumn: "2/span 5", mt: "$0_5" },
          }}
        >
          <Text
            as="h2"
            css={{
              mb: "1rem",
              font: "$headingSmall",
              color: "$fg_inverseSecondary",
            }}
          >
            Connect
          </Text>
          <List as="ul">
            <SocialItem
              icon={<Send size={20} />}
              label="Email"
              social="agwibawa@gmail.com"
              href="mailto:agwibawa@gmail.com"
            />
            <SocialItem
              icon={<TwitterFill size={20} />}
              label="Twitter"
              social="@agwibawa"
              href="https://twitter.com/agwibawa"
            />
            <SocialItem
              icon={<LinkedinFill size={20} />}
              label="LinkedIn"
              social="@arturowibawa"
              href="https://www.linkedin.com/in/arturowibawa/"
            />
            <SocialItem
              icon={<GithubFill size={20} />}
              label="Github"
              social="@artcoholic"
              href="https://github.com/artcoholic/"
            />
            <SocialItem
              icon={<CodepenFill size={20} />}
              label="CodePen"
              social="@artcoholic"
              href="https://codepen.io/artcoholic"
            />
            <SocialItem
              icon={<DribbbleFill size={20} />}
              label="Dribbble"
              social="@artcoholic"
              href="https://dribbble.com/artcoholic"
            />
          </List>
        </Box>
      </Grid>
      <Box
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        css={{
          position: "fixed",
          bottom: "$1",
          left: "$1",
          transition: "all 300ms $ease$smooth",
          display: "none",
          "@bp3": { display: "block" },
          color: "$fg_primary",
          animation: `${arrow} 1500ms $ease$smooth infinite alternate-reverse`,
        }}
        style={{
          opacity: opacity,
        }}
      >
        <ArrowDown size={32} style={{ display: "block" }} />
      </Box>
      <GradientBox />
    </>
  );
};

export default ProfilePage;
