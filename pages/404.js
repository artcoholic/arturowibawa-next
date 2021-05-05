import Box from '../components/Box';
import Text from '../components/Text';

export default function Custom404() {
  return (
    <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Text px={12} py={8} bg="bg.secondary">404 - Page Not Found</Text>
    </Box>
  )
}