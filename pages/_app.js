import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import { GlobalStyles } from '../theme.config';
import Providers from '../components/Providers';
import { AnimatePresence } from "framer-motion";
import Layout from '../components/Layout';
// import * as gtag from '../utils/gtag';
import TagManager from "react-gtm-module"

const tagManagerArgs = {
  id: process.env.GTM,
}

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter()
  // useEffect(() => {
  //   const handleRouteChange = (url) => {
  //     gtag.pageview(url)
  //   }
  //   router.events.on('routeChangeComplete', handleRouteChange)
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange)
  //   }
  // }, [router.events])
  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, [])
  return (
    <Providers>
      <GlobalStyles />
      <Layout>
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Layout>
    </Providers>
  );
}

export default MyApp
