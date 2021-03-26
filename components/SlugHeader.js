import styled from 'styled-components'
import Box from './Box';
import Text from './Text';
import { motion } from 'framer-motion'
import { variants } from './AnimationVariants';

const Line = styled(Box)`
  height: 1px;
  background: ${({ theme }) => theme.colors.lightTheme.contentPrimary};
  width: 100%;
`

const ProjectTitle = styled(Text)`
  text-align: center;
  text-transform: uppercase;
`

const SlugHeader = ({ entry }) => {
  const metadata = entry.fields.info.fields;
  return (
    <Box
      as="article"
      width="100%"
      mb={["layout.1", null, "layout.1/2"]}
      px="layout.1"
      mt={["layout.4", "layout.3"]}
    >
      <Box style={{ clipPath: 'inset(0%)' }}>
        <ProjectTitle
          as={motion.h1}
          font={["HeadingMedium", "Display"]}
          variants={variants.slugTitle}
          pb="layout.1/8"
        >
          {entry.fields.title}
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
        {metadata.year && <Text as={motion.h2} mr={12} variants={variants.slugStats} fontSize={[3, 4]}>{metadata.year}</Text>}
        {metadata.tags && <Text as={motion.h2} variants={variants.slugStats} fontSize={[3, 4]}>{metadata.tags.join(", ")}</Text>}
      </Box>
    </Box>
  )
}

export default SlugHeader;