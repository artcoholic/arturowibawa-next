import Head from "next/head";
import Header from "./Header";
import Script from "next/script";
import { grain } from "./AnimationVariants";
import { styled } from "../config/stitches.config";

const Main = styled("main", {
  "&:before": {
    content: "",
    animation: `${grain} 8s steps(10) infinite`,
    backgroundImage: `url('../images/noise-full.png')`,
    height: "300vh",
    width: "300vw",
    left: "-50%",
    opacity: 0.015,
    position: "fixed",
    top: "-110%",
    zIndex: "998",
    pointerEvents: "none",
    willChange: "transform",
  },
  // "&:after": {
  //   content: "",
  //   width: "100%",
  //   height: "100%",
  //   position: "fixed",
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   backgroundImage: `url(../images/old.webp)`,
  //   opacity: 0.05,
  //   backgroundRepeat: "no-repeat",
  //   backgroundSize: "cover",
  //   backgroundPosition: "center center",
  //   zIndex: "999",
  //   pointerEvents: "none",
  // },
});

const Layout = ({ children, setTheme, theme, toggler }) => {
  // console.log('Layout');
  return (
    <>
      <Head>
        <title>Arturo Wibawa — Portfolio</title>

        <meta name="application-name" content="Arturo Wibawa's Portfolio" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="apple-mobile-web-app-title"
          content="Arturo Wibawa's Portfolio"
        />
        <meta
          name="description"
          content="Arturo Wibawa, a product designer in Los Angeles, California, specializes in product strategy, user experience, and interaction design."
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="none" />
        <meta name="msapplication-TileColor" content="#FFD542" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#1B1C32" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/icon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/icon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="mask-icon"
          href="/images/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="prefetch"
          href="/fonts/WhyteInktrap-Light.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="true"
        />
        <link
          rel="prefetch"
          href="/fonts/WhyteInktrap-Thin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="true"
        />
        <link
          rel="prefetch"
          href="/fonts/whyte-light.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="true"
        />

        {/* TWITTER META */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://arturowibawa.com" />
        <meta name="twitter:title" content="Arturo Wibawa's Portfolio" />
        <meta
          name="twitter:description"
          content="Based in Los Angeles, California, Arturo Wibawa is a seasoned product designer renowned for his expertise in product strategy, user experience, and interaction design."
        />
        <meta
          name="twitter:image"
          content="https://arturowibawa.com/images/opengraph.png"
        />
        <meta name="twitter:creator" content="@agwibawa" />

        {/* FACEBOOK META */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Arturo Wibawa's Portfolio" />
        <meta
          property="og:description"
          content="Based in Los Angeles, California, Arturo Wibawa is a seasoned product designer renowned for his expertise in product strategy, user experience, and interaction design."
        />
        <meta property="og:site_name" content="Arturo Wibawa" />
        <meta property="og:url" content="https://arturowibawa.com" />
        <meta
          property="og:image"
          content="https://arturowibawa.com/images/opengraph.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Arturo Wibawa" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <script
          async
          src="https://analytics.eu.umami.is/script.js"
          data-website-id="cac89657-8172-4522-b6e6-edbbd4b56774"
        ></script>
      </Head>
      <Header setTheme={setTheme} theme={theme} toggler={toggler} />
      <Main>{children}</Main>
    </>
  );
};

export default Layout;
