import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";
import TagManager from "react-gtm-module";
import smoothscroll from "smoothscroll-polyfill";
import { globalStyles } from "../stitches.config";

const tagManagerArgs = {
  gtmId: "GTM-W5B77X3",
};

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);
  if (typeof window !== "undefined") {
    smoothscroll.polyfill();
  }
  globalStyles();
  return (
    <Layout>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </Layout>
  );
};

export default MyApp;
