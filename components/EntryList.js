import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import EntryItem from './EntryItem';
import Box from './Box';
import Text from './Text';
import { variants } from './AnimationVariants';
import { motion, useElementScroll } from 'framer-motion';
import { ArrowRight } from 'akar-icons';

const HorizontalContainer = styled(Box)`
  display: flex;
  flex-flow: row nowrap;
  height: 100vh;
  align-items: center;
  position: relative;
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

const EntryList = ({ data }) => {
  const entries = data[0].fields.projects;

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
    <>
      <HorizontalContainer
        px="layout.1"
        ref={objectRef}
        as={motion.div}
        onPan={onPan}
        variants={variants.horizontalList}
        key="entryList"
      >
        {entries.map((entry, index) => <EntryItem key={index} entry={entry} index={index} />)}
      </HorizontalContainer>
      <Box
        width="100%"
        position="fixed"
        bottom="layout.1"
        px="layout.1"
        as={motion.section}
        exit={{ opacity: 0 }}
        style={{ clipPath: 'inset(0%)' }}
      >
        <Box
          as={motion.div}
          variants={variants.footer}
          display='flex'
          justifyContent={['center', 'space-between']}
          alignItems="baseline"
          pb={12}
        >
          <Text as="p" fontSize={3}>© 2021. All Rights Reserved.</Text>
          <Text as="p" display={["none", "flex"]} font="ParagraphSmall">
            Scroll or Drag Sideways <ArrowRight size={16} style={{ marginTop: 2, marginLeft: '.5em' }} />
          </Text>
        </Box>
        <Box
          width="100%"
          height={2}
          bg="lightTheme.contentInverseSecondary"
          opacity={0.3}
          variants={variants.progress}
          as={motion.div}
        />
        <ProgressBar
          width="100%"
          height={2}
          bg="lightTheme.contentPrimary"
          as={motion.div}
          style={{ scaleX: scrollXProgress }}
        />
      </Box>
    </>
  )
}

export default EntryList;