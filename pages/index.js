import { useRef, useEffect } from "react";
import Text from "../components/Text";
import EntryItem from "../components/EntryItem";
import { variants } from "../components/AnimationVariants";
import { motion, useSpring, useScroll } from "framer-motion";
import { ArrowRight } from "akar-icons";
import { getAllProjectsForHome } from "../utils/api";
import { styled } from "../stitches.config";

const HorizontalContainer = styled("section", {
  display: "flex",
  flexFlow: "row nowrap",
  alignItems: "center",
  height: "calc(100vh - var(--space-0_25))",
  maxHeight: "-webkit-fill-available",
  cursor: "grab",
  overflow: "scroll",
  scrollbarWidth: "none",
  userSelect: "none",
  px: "$1",
  gap: "$1",
  "&:active": {
    cursor: "grabbing",
  },
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const ProgressBar = styled("div", {
  transformOrigin: "left",
  width: "100%",
  height: 1,
  overflow: "hidden",
  bg: "$fg_primary",
});

const ProgressBarBg = styled("div", {
  width: "100%",
  height: 1,
  bg: "$bg_secondary",
});

const Footer = styled("section", {
  width: "100%",
  position: "fixed",
  bottom: "$1",
  left: 0,
  px: "$1",
  overflow: "hidden",
  lipPath: "inset(0%)",
  pointerEvents: "none",
});

const FooterContent = styled("div", {
  display: "flex",
  alignItems: "baseline",
  pb: 16,
  justifyContent: "center",
  "@bp1": {
    justifyContent: "space-between",
  },
});

const FooterCopy = styled(Text, {
  fontSize: "1em",
  alignItems: "center",
  variants: {
    display: {
      none: { display: "none" },
      flex: { display: "flex" },
    },
  },
});

const HomePage = ({ allProjects }) => {
  const entries = allProjects;
  const ref = useRef(null);

  const { scrollXProgress } = useScroll({ container: ref });
  const pathLength = useSpring(scrollXProgress, {
    stiffness: 400,
    damping: 40,
  });

  function onPan(event, info) {
    const scrollObject = ref.current;
    scrollObject.scrollLeft = scrollObject.scrollLeft - info.delta.x;
  }

  function transformScroll(event) {
    if (!event.deltaY) {
      return;
    }
    event.currentTarget.scrollLeft += event.deltaY;
    event.preventDefault();
  }

  useEffect(() => {
    const node = ref.current;
    node.addEventListener("wheel", transformScroll, { passive: false });
    return () =>
      node.removeEventListener("wheel", transformScroll, { passive: false });
  }, []);

  return (
    <motion.div
      variants={variants.main}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <HorizontalContainer
        ref={ref}
        as={motion.section}
        onPan={onPan}
        variants={variants.entryList}
      >
        {entries.map((entry, index) => (
          <EntryItem key={index} entry={entry} index={index} />
        ))}
      </HorizontalContainer>
      <Footer>
        <FooterContent as={motion.div} variants={variants.footer}>
          <FooterCopy>
            © {new Date().getFullYear()}. All Rights Reserved.
          </FooterCopy>
          <FooterCopy display={{ "@initial": "none", "@bp1": "flex" }}>
            Scroll or Drag Sideways{" "}
            <ArrowRight size={20} style={{ marginLeft: ".5em" }} />
          </FooterCopy>
        </FooterContent>
        <ProgressBarBg as={motion.div} variants={variants.progress}>
          <ProgressBar as={motion.div} style={{ scaleX: pathLength }} />
        </ProgressBarBg>
      </Footer>
    </motion.div>
  );
};

export async function getStaticProps() {
  const allProjects = (await getAllProjectsForHome()) ?? [];
  return {
    props: { allProjects },
  };
}

export default HomePage;
