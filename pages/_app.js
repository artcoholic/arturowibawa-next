import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyles } from '../theme.config';
import { AnimatePresence } from "framer-motion";
import Layout from '../components/Layout';
import * as gtag from '../utils/gtag';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Layout>
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp
