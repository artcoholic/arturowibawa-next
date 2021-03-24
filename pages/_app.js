import React from 'react'
import App from 'next/app'
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyles } from '../themeConfig';
import { AnimatePresence } from "framer-motion";
import Layout from '../components/Layout';

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;
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
}

export default MyApp
