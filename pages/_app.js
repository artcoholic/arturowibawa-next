import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import Providers from '../components/Providers';
import { AnimatePresence } from "framer-motion";
import Layout from '../components/Layout';
import TagManager from "react-gtm-module";
import smoothscroll from 'smoothscroll-polyfill';
import ThemeToggler from '../utils/ThemeToggler';

const tagManagerArgs = {
  gtmId: 'GTM-W5B77X3',
}

const MyApp = ({ Component, pageProps }) => {
  const [theme, mountedComponent, setTheme, toggler] = ThemeToggler();
  const router = useRouter()
  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, [])
  if (typeof window !== 'undefined') {
    smoothscroll.polyfill();
  }
  return (
    <Providers theme={theme} mountedComponent={mountedComponent}>
      <Layout setTheme={setTheme} theme={theme} toggler={toggler}>
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Layout>
    </Providers>
  );
}

export default MyApp
