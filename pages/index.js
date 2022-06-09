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
  overflow: scroll;
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
  const ref = useRef(null);

  const { scrollXProgress } = useElementScroll(ref)
  const pathLength = useSpring(scrollXProgress, { stiffness: 400, damping: 40 });

  function onPan(event, info) {
    const scrollObject = ref.current;
    scrollObject.scrollLeft = scrollObject.scrollLeft - info.delta.x;
  }

  function transformScroll(event) {
    if (!event.deltaY) {
      return;
    }
    event.currentTarget.scrollLeft += event.deltaY
    event.preventDefault();
  }

  useEffect(() => {
    const node = ref.current;
    node.addEventListener('wheel', transformScroll, { passive: false });
    return () => node.removeEventListener('wheel', transformScroll, { passive: false });
  }, []);

  return (
    <motion.div variants={variants.main} initial="initial" animate="enter" exit="exit">
      <HorizontalContainer
        pl="layout.1"
        ref={ref}
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
        style={{ clipPath: 'inset(0%)', pointerEvents: 'none' }}
        px="layout.1"
        overflow="hidden"
      >
        <Box
          as={motion.div}
          variants={variants.footer}
          display='flex'
          justifyContent={['center', 'space-between']}
          alignItems="baseline"
          pb={16}
        >
          <Text as="p" fontSize={4}>© {new Date().getFullYear()}. All Rights Reserved.</Text>
          <Text as="p" display={["none", "flex"]} alignItems="center" fontSize={4}>
            Scroll or Drag Sideways <ArrowRight size={20} style={{ marginLeft: '.5em' }} />
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
            height={1}
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