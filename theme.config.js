import { createGlobalStyle } from 'styled-components';

const morning = {
  colors: {
    bg: {
      primary: '#FFD542',
      secondary: '#FFEBA4',
      tertiary: '#FFE178',
      inversePrimary: '#1B1C32',
      inverseSecondary: '#303157',
      inverseTertiary: '#22233E',
      placeholder: '#F0C93E',
      boxShadow: 'rgba(0,0,0,0.15)',
      entryCard: 'antiquewhite'
    },
    content: {
      primary: '#1B1C32',
      secondary: '#505177',
      tertiary: '#9B9BB1',
      inversePrimary: '#FFD542',
      inverseSecondary: '#AE922E',
      inverseTertiary: '#67571C',
    }
  }
}

const night = {
  colors: {
    bg: {
      primary: '#1B1C32',
      secondary: '#303157',
      tertiary: '#22233E',
      inversePrimary: '#FFD542',
      inverseSecondary: '#FFEBA4',
      inverseTertiary: '#FFE178',
      placeholder: '#22233E',
      boxShadow: 'rgba(0,0,0,0.5)',
      entryCard: 'navajowhite'
    },
    content: {
      primary: '#FFD542',
      secondary: '#AE922E',
      tertiary: '#67571C',
      inversePrimary: '#1B1C32',
      inverseSecondary: '#505177',
      inverseTertiary: '#9B9BB1',
    }
  }
}

const defaultTheme = {
  breakpoints:
    [
      "640px",
      "960px",
      "1280px",
      "1920px",
      "2560px"
    ],
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
      '3/4': 'calc(var(--gutter) * 0.75)',
      '1': 'var(--gutter)',
      '1n': 'calc(var(--gutter) * 1.5)',
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

    @media (min-width: ${props => props.theme.breakpoints[0]}) { // 640
      --columns: 4;
      --gutter: 32px;
      --scale: 1.250;
    }
    @media (min-width: ${props => props.theme.breakpoints[1]}) { // 960
      --columns: 8;
      --scale: 1.333;
    }
    @media (min-width: ${props => props.theme.breakpoints[2]}) { // 1280
      --columns: 12;
      --gutter: 48px;
      --scale: 1.414;
    }
    @media (min-width: ${props => props.theme.breakpoints[3]}) { // 1920
      --gutter: 64px;
      --scale: 1.500;
    }
    @media (min-width: ${props => props.theme.breakpoints[4]}) { // 2560
      --gutter: 72px;
      --scale: 1.618;
    }
  }
  * {
    box-sizing: border-box;
  }
  html {
    scroll-behavior: smooth;
    background-color: ${props => props.theme.colors.bg.primary};
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
  .glare-wrapper { pointer-events: none; }
`

export const morningTheme = { ...defaultTheme, ...morning };
export const nightTheme = { ...defaultTheme, ...night };