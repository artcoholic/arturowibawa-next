import Box from './Box';
import Text from './Text';

export default function Label() {
  return (
    <Box
      position="fixed"
      px="1em" py=".5em"
      bottom={0} left={0}
      bg="bg.tertiary"
    >
      <Text color="content.inverseSecondary">Preview Mode</Text>
    </Box>
  )
}