import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyles } from '../themeConfig';
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps, router }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </ThemeProvider>
  )
}

export default MyApp
