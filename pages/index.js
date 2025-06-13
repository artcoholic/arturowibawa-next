import { useRef, useEffect } from "react";
import Text from "../components/Text";
import EntryItem from "../components/EntryItem";
import { variants } from "../components/AnimationVariants";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowLeft } from "akar-icons";
import { getAllProjectsForHome } from "../libs/api";
import { styled } from "../config/stitches.config";
import InfiniteScrollLoop from "../components/InfiniteScrollLoop";

const HomePage = ({ allProjects }) => {
  const entries = allProjects;
  const scrollRef = useRef(null);

  const { scrollXProgress } = useScroll({ container: scrollRef });
  const scrollXMap = useTransform(
    scrollXProgress,
    [0, 0.4, 0.83, 0.4],
    [-100, 100, 100, -100],
    {
      clamp: false,
    }
  );

  function onPan(event, info) {
    const scrollObject = scrollRef.current;
    scrollObject.scrollLeft -= info.delta.x;
  }

  function transformScroll(event) {
    if (!event.deltaY) {
      return;
    }
    event.currentTarget.scrollLeft += event.deltaY;
    event.preventDefault();
  }

  useEffect(() => {
    const node = scrollRef.current;
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
      <InfiniteScrollLoop scrollRef={scrollRef} onPan={onPan}>
        {entries.map((entry, index) => (
          <EntryItem key={index} entry={entry} index={index} />
        ))}
      </InfiniteScrollLoop>
      <Footer>
        <FooterContent>
          {/* <StyledSVG
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M17.5 18.5C15.4186 21.3877 13 26 8.5 26C4 26 2 22 2 18C2 14 4 10 8.5 10C13 10 15.3813 14.3597 18 18C20.619 21.6403 23.3797 26 27.546 26C32 26 34 22 34 18C34 14 32 10 27.5 10C24.6583 10 22.6234 11.9128 21 14"
              className="path"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                stroke: "var(--colors-fg_inverseSecondary)",
              }}
            />
            <motion.path
              d="M17.5 18.5C15.4186 21.3877 13 26 8.5 26C4 26 2 22 2 18C2 14 4 10 8.5 10C13 10 15.3813 14.3597 18 18C20.619 21.6403 23.3797 26 27.546 26C32 26 34 22 34 18C34 14 32 10 27.5 10C24.6583 10 22.6234 11.9128 21 14"
              className="path"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 100,
                strokeDashoffset: scrollXMap,
                stroke: "var(--colors-fg_primary)",
              }}
            />
          </StyledSVG> */}
          <FooterCopy>
            <ArrowLeft size={20} style={{ marginRight: "1rem" }} />
            Scroll or Drag Sideways
            <ArrowRight size={20} style={{ marginLeft: "1rem" }} />
          </FooterCopy>
        </FooterContent>
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

const Footer = styled("footer", {
  width: "100%",
  position: "fixed",
  bottom: "$1",
  left: 0,
  px: "$1",
  overflow: "hidden",
  clipPath: "inset(0%)",
  pointerEvents: "none",
});

const FooterContent = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const FooterCopy = styled(Text, {
  fontSize: "1em",
  alignItems: "center",
  display: "flex",
});

const StyledSVG = styled("svg", {
  display: "none",
  "@bp3": { display: "block" },
});
