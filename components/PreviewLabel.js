import Box from './Box';
import Text from './Text';

const Label = () => {
  return (
    <Box
      css={{
        position: "fixed",
        bottom: 0, left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        zIndex: 99,
      }}
    >
      <Box
        css={{
          px:"1rem", py:".5em",
          bg:"$bg_inverseTertiary"
        }}
      >
        <Text css={{ color: "$fg._secondary" }}>Preview Mode</Text>
      </Box>
    </Box>
  )
}

export default Label;