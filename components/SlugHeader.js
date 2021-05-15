import styled from 'styled-components'
import Box from './Box';
import Text from './Text';
import { motion } from 'framer-motion'
import { variants } from './AnimationVariants';

const Line = styled(Box)`
  height: 1px;
  background: ${props => props.theme.colors.content.primary};
  width: 100%;
`

const ProjectTitle = styled(Text)`
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const SlugHeader = ({ entry }) => {
  return (
    <Box
      as="section"
      width="100%"
      mb={["layout.1", null, "layout.1/2"]}
      px="layout.1"
      mt={["layout.4", null, null, "layout.3"]}
    >
      <Box style={{ clipPath: 'inset(0%)' }}>
        <ProjectTitle
          as={motion.h1}
          font={["HeadingSmall", "HeadingMedium", "HeadingLarge"]}
          variants={variants.slugTitle}
          pb="layout.1/8"
        >
          {entry.title}
        </ProjectTitle>
      </Box>
      <Line
        as={motion.div}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          type: 'spring',
          damping: 20,
        }}
      />
      <Box
        columns="1/-1"
        pt={["layout.1/2", "layout.1/4"]}
        display="flex"
        justifyContent="space-between"
        style={{ clipPath: 'inset(0%)' }}
      >
        {entry.info.year && <Text as={motion.h2} mr={12} variants={variants.slugStats} fontSize={[3, 4]}>{entry.info.year}</Text>}
        {entry.info.tags && <Text as={motion.h2} variants={variants.slugStats} fontSize={[3, 4]}>{entry.info.tags.join(", ")}</Text>}
      </Box>
    </Box>
  )
}

export default SlugHeader;