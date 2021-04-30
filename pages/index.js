import { useRef, useEffect } from 'react';
import { createClient } from 'contentful';
import styled from 'styled-components';
import EntryItem from '../components/EntryItem';
import Box from '../components/Box';
import Text from '../components/Text';
import { variants } from '../components/AnimationVariants';
import { motion, useElementScroll } from 'framer-motion';
import { ArrowRight } from 'akar-icons';

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

const HomePage = ({ data }) => {
  const entries = data[1].fields.items;

  const objectRef = useRef();
  const { scrollXProgress } = useElementScroll(objectRef)

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
        px="layout.1"
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
            style={{ scaleX: scrollXProgress }}
            overflow="hidden"
          />
        </Box>
      </Box>
    </motion.div>
  )
};

export async function getStaticProps() {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    removeUnresolved: true,
  })

  const data = await client
    .getEntries({
      content_type: 'list',
      include: 10,
    })
    .then((response) => response.items)

  return {
    props: {
      data,
    },
  }
}

export default HomePage;
