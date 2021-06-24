import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Box from '../components/Box';
import Text from '../components/Text';
import EntryItem from '../components/EntryItem';
import { variants } from '../components/AnimationVariants';
import { motion, useTransform, useSpring, useElementScroll } from 'framer-motion';
import { ArrowRight } from 'akar-icons';
import { getAllProjectsForHome } from '../utils/api';


const HorizontalContainer = styled(Box)`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 100vh;
  max-height: -webkit-fill-available;
  cursor: grab;
  overflow: auto;
  scrollbar-width: none;
  user-select: none;
  &:active {
    cursor: grabbing;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`

const ProgressBar = styled(Box)`
  transform-origin: left;
  margin-top: -2px;
`

const HomePage = ({ allProjects }) => {
  const entries = allProjects;
  const objectRef = useRef();
  const { scrollXProgress } = useElementScroll(objectRef)
  const xRange = useTransform(scrollXProgress, [0, 1], [0, 1]);
  const pathLength = useSpring(xRange, { stiffness: 400, damping: 40 });

  function onPan(event, info) {
    const scrollObject = objectRef.current;
    scrollObject.scrollLeft = scrollObject.scrollLeft - info.delta.x;
  }

  useEffect(() => {
    objectRef.current.addEventListener('wheel', (ev) => {
      if (!ev.shiftKey) {
        ev.preventDefault();
        objectRef.current.scrollLeft += ev.deltaY + ev.deltaX;
      }
    }, { passive: false });
  }, []);
  return (
    <motion.div variants={variants.main} initial="initial" animate="enter" exit="exit">
      <HorizontalContainer
        pl="layout.1"
        ref={objectRef}
        as={motion.section}
        onPan={onPan}
        variants={variants.entryList}
      >
        {entries.map((entry, index) => <EntryItem key={index} entry={entry} index={index} />)}
      </HorizontalContainer>
      <Box
        width="100%"
        position="fixed"
        bottom="layout.1"
        as="section"
        style={{ clipPath: 'inset(0%)' }}
        px="layout.1"
        overflow="hidden"
      >
        <Box
          as={motion.div}
          variants={variants.footer}
          display='flex'
          justifyContent={['center', 'space-between']}
          alignItems="baseline"
          pb={12}
        >
          <Text as="p" fontSize={3}>© {new Date().getFullYear()}. All Rights Reserved.</Text>
          <Text as="p" display={["none", "flex"]} font="ParagraphSmall">
            Scroll or Drag Sideways <ArrowRight size={16} style={{ marginTop: 2, marginLeft: '.5em' }} />
          </Text>
        </Box>
        <Box overflow="hidden">
          <Box
            width="100%"
            height={2}
            bg="content.inverseSecondary"
            opacity={0.3}
            variants={variants.progress}
            as={motion.div}
          />
          <ProgressBar
            width="100%"
            height={2}
            bg="content.primary"
            as={motion.div}
            style={{ scaleX: pathLength }}
            overflow="hidden"
          />
        </Box>
      </Box>
    </motion.div>
  )
};

export async function getStaticProps() {
  const allProjects = await getAllProjectsForHome() ?? []
  return {
    props: { allProjects },
  }
}

export default HomePage;
