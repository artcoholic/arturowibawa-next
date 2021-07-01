import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import { GlobalStyles } from '../theme.config';
import Providers from '../components/Providers';
import { AnimatePresence } from "framer-motion";
import Layout from '../components/Layout';
import TagManager from "react-gtm-module";

const tagManagerArgs = {
  gtmId: 'GTM-W5B77X3',
}

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter()
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
