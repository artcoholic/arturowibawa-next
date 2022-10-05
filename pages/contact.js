import { useEffect, Suspense } from "react";
import { styled, keyframes } from "../stitches.config";
import Head from "next/head";
import Box from "../components/Box";
import Grid from "../components/Grid";
import Text from "../components/Text";
import GradientBox from "../components/GradientBox";
import { motion, useScroll, useMotionValue, MotionConfig } from "framer-motion";
import { variants } from "../components/AnimationVariants";
import { Canvas } from "@react-three/fiber";
import { Dodecahedron, Torus, Lights, transition } from "../components/Objects";
import SocialItem from "./about/SocialItem";
import {
  Envelope,
  TwitterFill,
  LinkedinFill,
  GithubFill,
  CodepenFill,
  DribbbleFill,
} from "akar-icons";

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
        <title>Contact — Arturo Wibawa</title>
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
              <Dodecahedron scrollYProgress={scrollYProgress} />
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
            "@bp3": {
              gridColumn: "2/span 5",
              height: "100vh",
              mt: 0,
              mb: -200,
            },
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
            Contact
          </Text>
          <Text
            as="p"
            css={{
              color: "$fg_inverseTertiary",
              typeScale: "$paragraphMedium",
              "@bp4": { typeScale: "$paragraphLarge" },
            }}
          >
            If you would like to discuss potential projects or just want to say
            hi please get in touch at{" "}
            <a href="mailto:agwibawa@gmail.com">agwibawa@gmail.com</a>.
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
            "@bp1": { gridColumn: "1/span 4" },
            "@bp2": { gridColumn: "2/span 6" },
            "@bp3": { gridColumn: "2/span 5" },
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
      <GradientBox />
    </>
  );
};

export default ProfilePage;
