import { createGlobalStyle } from 'styled-components';

export const theme = {
  breakpoints:
    [
      "640px",
      "960px",
      "1280px",
      "1920px",
      "2560px"
    ],
  colors:
  {
    lightTheme: {
      backgroundPrimary: "#FFD542",
      backgroundSecondary: "#FFEBA4",
      backgroundTertiary: "#FFE178",
      backgroundInversePrimary: "#1B1C32",
      backgroundInverseSecondary: "#303157",
      backgroundInverseTertiary: "#22233E",
      contentPrimary: "#1B1C32",
      contentSecondary: "#505177",
      contentTertiary: "#9B9BB1",
      contentInversePrimary: "#FFD542",
      contentInverseSecondary: "#AE922E",
      contentInverseTertiary: "#67571C",
      contentInverseLight: "#EFDF91",
      backgroundPrimaryOverlay: "rgba(255,213,66,0.95)",
    },
    darkTheme: {
      backgroundPrimary: "#1B1C32",
      backgroundSecondary: "#303157",
      backgroundTertiary: "#22233E",
      backgroundInversePrimary: "#FFD542",
      backgroundInverseSecondary: "#FFEBA4",
      backgroundInverseTertiary: "#FFE178",
      contentPrimary: "#FFD542",
      contentSecondary: "#AE922E",
      contentTertiary: "#67571C",
      contentInversePrimary: "#1B1C32",
      contentInverseSecondary: "#505177",
      contentInverseTertiary: "#9B9BB1",
      contentInverseLight: "#22233E",
      backgroundPrimaryOverlay: "rgba(27,28,50,0.95)",
    }
  },
  fontSizes: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100],
  typeScale:
  {
    'ParagraphSmall': 'var(--base)/var(--lineHeight-for-p) var(--eina-regular)',
    'ParagraphMedium': 'calc(var(--scale) * 1em)/var(--lineHeight-for-p) var(--eina-regular)',
    'ParagraphLarge': 'calc(var(--scale) * var(--scale) * 1em)/var(--lineHeight-for-p) var(--eina-light)',
    'HeadingSmall': 'calc(var(--scale) * var(--scale) * var(--scale) * 1em)/var(--lineHeight-for-h) var(--eina-light)',
    'HeadingMedium': 'calc(var(--scale) * var(--scale) * var(--scale) * var(--scale) * 1em)/var(--lineHeight-for-h) var(--eina-light)',
    'HeadingLarge': 'calc(var(--scale) * var(--scale) * var(--scale) * var(--scale) * var(--scale) * 1em)/var(--lineHeight-for-h) var(--eina-light)',
    'Display': 'calc(var(--scale) * var(--scale) * var(--scale) * var(--scale) * var(--scale) * var(--scale) * 1em)/var(--lineHeight-for-h) var(--eina-light)',
  },
  space:
  {
    spacing: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100],
    layout:
    {
      '1/8': 'calc(var(--gutter) * 0.125)',
      '1/4': 'calc(var(--gutter) * 0.25)',
      '1/2': 'calc(var(--gutter) * 0.5)',
      '1': 'var(--gutter)',
      '2': 'calc(var(--gutter) * 2)',
      '3': 'calc(var(--gutter) * 3)',
      '4': 'calc(var(--gutter) * 4)',
      '5': 'calc(var(--gutter) * 5)',
      '6': 'calc(var(--gutter) * 6)',
    },
  },
  start: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  span:
    [
      'span 0',
      'span 1',
      'span 2',
      'span 3',
      'span 4',
      'span 5',
      'span 6',
      'span 7',
      'span 8',
      'span 9',
      'span 10',
      'span 11',
      'span 12',
    ],
  ease:
  {
    'It': 'cubic-bezier(0.6, 0.2, 0.1, 1)',
    'Bounce': 'cubic-bezier(0.54, 1.54, 0.43, 0.94)',
    'Btn': 'cubic-bezier(.05,.91,.43,.92)',
    'Smooth': 'cubic-bezier(.23,1,.32,1)',
  },
}

export const GlobalStyles = createGlobalStyle`
  :root {
    --columns: 2;
    --gutter: 24px;
    --margins: 1;
    --scale: 1.200;
    --lineHeight-for-h: 1.05;
    --lineHeight-for-p: 1.5;
    --base: 16px;
    --color: rgba(229, 79, 79, 0.3);
    --eina-regular: 'Eina Regular';
    --eina-light: 'Eina Light';

    @media (min-width: ${({ theme }) => theme.breakpoints[0]}) { // 640
      --columns: 4;
      --gutter: 32px;
      --scale: 1.250;
    }
    @media (min-width: ${({ theme }) => theme.breakpoints[1]}) { // 960
      --columns: 8;
      --scale: 1.333;
    }
    @media (min-width: ${({ theme }) => theme.breakpoints[2]}) { // 1280
      --columns: 12;
      --gutter: 48px;
      --scale: 1.414;
    }
    @media (min-width: ${({ theme }) => theme.breakpoints[3]}) { // 1920
      --gutter: 64px;
      --scale: 1.500;
    }
    @media (min-width: ${({ theme }) => theme.breakpoints[4]}) { // 2560
      --gutter: 72px;
      --scale: 1.618;
    }
  }
  * {
    box-sizing: border-box;
  }
  html {
    scroll-behavior: smooth;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${({ theme }) => theme.colors.lightTheme.backgroundPrimary};
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
  body,h1,h2,h3,h4,h5,h6,p {
    margin: 0;
  }
  img, video {
    display: block;
  }
  @font-face {
    font-family: 'Eina Regular';
    font-style: normal;
    font-weight: normal;
    font-display: swap;
    src: url('/fonts/eina-01-regular.woff') format('woff'), 
    url('/fonts/eina-01-regular.woff2') format('woff2'), 
    url('/fonts/eina-01-regular.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Eina Light';
    font-style: normal;
    font-weight: normal;
    font-display: swap;
    src: url('/fonts/eina-01-light.woff') format('woff'), 
    url('/fonts/eina-01-light.woff2') format('woff2'), 
    url('/fonts/eina-01-light.ttf') format('truetype');
  }
`