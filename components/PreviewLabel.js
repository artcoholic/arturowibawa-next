import Box from './Box';
import Text from './Text';

const Label = () => {
  return (
    <Box
      position="fixed"
      bottom={0} left={0}
      width="100%"
      display="flex"
      justifyContent="center"
      zIndex={99}
    >
      <Box
        px="1em" py=".5em"
        bg="bg.inverseTertiary"
      >
        <Text color="content.secondary">Preview Mode</Text>
      </Box>
    </Box>
  )
}

export default Label;