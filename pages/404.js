import Link from 'next/link';
import Box from '../components/Box';
import Text from '../components/Text';

export default function Custom404() {
  return (
    <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <Text font="ParagraphLarge" px={16} py={8} mb={12} bg="bg.secondary">404 - Page Not Found</Text>
      <Link href="/" passHref>
        <Text as="a">Go back home</Text>
      </Link>
    </Box>
  )
}