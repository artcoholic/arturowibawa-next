import Head from 'next/head';
import Header from './Header';
import { GA_TRACKING_ID } from '../utils/gtag';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Arturo Wibawa — Portfolio</title>

        <meta name='application-name' content="Arturo Wibawa's Portfolio" />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content="Arturo Wibawa's Portfolio" />
        <meta name='description' content="Arturo Wibawa's personal space in the whole world wide web." />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='msapplication-config' content='none' />
        <meta name='msapplication-TileColor' content='#FFD542' />
        <meta name='msapplication-tap-highlight' content='no' />
        <meta name='theme-color' content='#1B1C32' />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel='apple-touch-icon' sizes='180x180' href='/images/apple-touch-icon.png' />
        <link rel='manifest' href='/manifest.json' />
        <link rel='mask-icon' href='/images/safari-pinned-tab.svg' color='#FFD542' />
        <link rel='shortcut icon' href='/favicon.ico' />
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

        {/* TWITTER META */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:url' content='https://arturowibawa.com' />
        <meta name='twitter:title' content="Arturo Wibawa's Portfolio" />
        <meta name='twitter:description' content="Arturo Wibawa's personal space in the whole world wide web." />
        <meta name='twitter:image' content='https://arturowibawa.com/images/opengraph.png' />
        <meta name='twitter:creator' content='@agwibawa' />

        {/* FACEBOOK META */}
        <meta property='og:type' content='website' />
        <meta property='og:title' content="Arturo Wibawa's Portfolio" />
        <meta property='og:description' content="Arturo Wibawa's personal space in the whole world wide web." />
        <meta property='og:site_name' content='Arturo Wibawa' />
        <meta property='og:url' content='https://arturowibawa.com' />
        <meta property='og:image' content='https://arturowibawa.com/images/opengraph.png' />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Arturo Wibawa" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
      <Header />
      {children}
    </>
  )
}

export default Layout;