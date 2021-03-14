import { useState } from 'react';
import Head from 'next/head';
import Header from './Header';
import { motion } from 'framer-motion';

const Layout = ({ children, title = 'Arturo Wibawa — Portfolio' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Arturo Wibawa's personal space in the world wide web" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/eina-01-light.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/eina-01-regular.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>
      <Header />
      <motion.main
        initial="initial"
        animate="enter"
        exit="exit"
        key="main"
      >
        {children}
      </motion.main>
    </>
  )
}

export default Layout;