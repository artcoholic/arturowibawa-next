import { createGlobalStyle } from "styled-components";

const morningTheme = {
  colors: {
    bg: {
      primary: "#FFD542",
      secondary: "#FFEBA4",
      tertiary: "#FFE178",
      inversePrimary: "#1B1C32",
      inverseSecondary: "#303157",
      inverseTertiary: "#22233E",
      placeholder: "#F0C93E",
      boxShadow: "rgba(0,0,0,0.15)",
      entryCard: "antiquewhite",
    },
    content: {
      primary: "#1B1C32",
      secondary: "#505177",
      tertiary: "#9B9BB1",
      inversePrimary: "#FFD542",
      inverseSecondary: "#AE922E",
      inverseTertiary: "#67571C",
    },
    gradient: ["rgba(255,213,66,0)", "rgba(255,213,66,1)"],
    zapped: {
      stroke: "#E2264D",
      fill: "#d46abf",
    },
  },
};

const nightTheme = {
  colors: {
    bg: {
      primary: "#1B1C32",
      secondary: "#303157",
      tertiary: "#22233E",
      inversePrimary: "#FFD542",
      inverseSecondary: "#FFEBA4",
      inverseTertiary: "#FFE178",
      placeholder: "#22233E",
      boxShadow: "rgba(0,0,0,0.5)",
      entryCard: "navajowhite",
    },
    content: {
      primary: "#FFD542",
      secondary: "#AE922E",
      tertiary: "#67571C",
      inversePrimary: "#1B1C32",
      inverseSecondary: "#505177",
      inverseTertiary: "#9B9BB1",
    },
    gradient: ["rgba(27,28,50,0)", "rgba(27,28,50,1)"],
    zapped: {
      stroke: "#FFD542",
      fill: "#AE922E",
    },
  },
};

const defaultTheme = {
  breakpoints: ["640px", "960px", "1280px", "1920px", "2560px"],
  fontSizes: [
    0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76,
    80, 84, 88, 92, 96, 100,
  ],
  typeScale: {
    ParagraphSmall: "var(--base)/var(--lineHeight-for-p) var(--paragraph)",
    ParagraphMedium:
      "calc(var(--scale) * 1em)/var(--lineHeight-for-p) var(--paragraph)",
    ParagraphLarge:
      "calc(var(--scale) * var(--scale) * 1em)/var(--lineHeight-for-p) var(--paragraph)",
    HeadingSmall:
      "calc(var(--scale) * var(--scale) * var(--scale) * 1em)/var(--lineHeight-for-h) var(--heading)",
    HeadingMedium:
      "calc(var(--scale) * var(--scale) * var(--scale) * var(--scale) * 1em)/var(--lineHeight-for-h) var(--heading)",
    HeadingLarge:
      "calc(var(--scale) * var(--scale) * var(--scale) * var(--scale) * var(--scale) * 1em)/var(--lineHeight-for-h) var(--heading)",
    Display:
      "calc(var(--scale) * var(--scale) * var(--scale) * var(--scale) * var(--scale) * var(--scale) * 1em)/var(--lineHeight-for-h) var(--heading)",
  },
  space: {
    spacing: [
      0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72,
      76, 80, 84, 88, 92, 96, 100,
    ],
    layout: {
      "1/8": "calc(var(--gutter) * 0.125)",
      "1/4": "calc(var(--gutter) * 0.25)",
      "1/2": "calc(var(--gutter) * 0.5)",
      "3/4": "calc(var(--gutter) * 0.75)",
      1: "var(--gutter)",
      "1n": "calc(var(--gutter) * 1.5)",
      2: "calc(var(--gutter) * 2)",
      3: "calc(var(--gutter) * 3)",
      4: "calc(var(--gutter) * 4)",
      5: "calc(var(--gutter) * 5)",
      6: "calc(var(--gutter) * 6)",
    },
  },
  start: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  span: [
    "span 0",
    "span 1",
    "span 2",
    "span 3",
    "span 4",
    "span 5",
    "span 6",
    "span 7",
    "span 8",
    "span 9",
    "span 10",
    "span 11",
    "span 12",
  ],
  ease: {
    It: "cubic-bezier(0.6, 0.2, 0.1, 1)",
    Bounce: "cubic-bezier(0.54, 1.54, 0.43, 0.94)",
    Btn: "cubic-bezier(.05,.91,.43,.92)",
    Smooth: "cubic-bezier(.23,1,.32,1)",
  },
};

export const GlobalStyles = createGlobalStyle`
  // :root {
  //   --columns: 2;
  //   --gutter: 24px;
  //   --margins: 1;
  //   --scale: 1.200;
  //   --lineHeight-for-h: 1.2;
  //   --lineHeight-for-p: 1.5;
  //   --base: 16px;
  //   --color: rgba(229, 79, 79, 0.3);
  //   --heading: 'Whyte Inktrap Light';
  //   --paragraph: 'Whyte Light';
  //   --system-fonts:  -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    
  //   @media (min-width: ${(props) => props.theme.breakpoints[0]}) { // 640
  //     --columns: 4;
  //     --gutter: 32px;
  //     --scale: 1.250;
  //   }
  //   @media (min-width: ${(props) => props.theme.breakpoints[1]}) { // 960
  //     --columns: 8;
  //     --scale: 1.333;
  //   }
  //   @media (min-width: ${(props) => props.theme.breakpoints[2]}) { // 1280
  //     --columns: 12;
  //     --gutter: 48px;
  //     --scale: 1.414;
  //   }
  //   @media (min-width: ${(props) => props.theme.breakpoints[3]}) { // 1920
  //     --gutter: 64px;
  //     --scale: 1.500;
  //   }
  //   @media (min-width: ${(props) => props.theme.breakpoints[4]}) { // 2560
  //     --gutter: 72px;
  //     --scale: 1.618;
  //   }
  // }
  * {
    /* cursor: none; */
    box-sizing: border-box;
  }
  // html {
  //   scroll-behavior: smooth;
  //   background-color: ${(props) => props.theme.colors.bg.primary};
  // }
  body {
    font-family: var(--system-fonts);
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
    font-family: 'Whyte Inktrap Light';
    font-style: normal;
    font-weight: normal;
    font-display: swap;
    src: url('/fonts/WhyteInktrap-Light.woff') format('woff'),
    url('/fonts/WhyteInktrap-Light.woff2') format('woff2'),
    url('/fonts/WhyteInktrap-Light.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Whyte Light';
    font-style: normal;
    font-weight: normal;
    font-display: swap;
    src: url('/fonts/whyte-light.woff') format('woff'),
    url('/fonts/whyte-light.woff2') format('woff2'),
    url('/fonts/whyte-light.ttf') format('truetype');
  }
  .glare-wrapper { pointer-events: none; }
  a {
    position: relative;
    text-decoration: underline dotted;
    text-decoration-thickness: 1px;
    white-space: nowrap;
    color: ${(props) => props.theme.colors.content.primary};
    &:hover {
      &:after {
        transform: scaleX(1);
        transform-origin: 0%;
      }
    }
    &:after {
      content: '';
      background: ${(props) => props.theme.colors.content.primary};
      transition: transform 150ms ${(props) => props.theme.ease.Btn};
      height: 100%;
      left: 0;
      bottom: 0;
      width: 100%;
      transform: scaleX(0);
      transform-origin: 100%;
      position: absolute;
    }
  }
`;

export const Morning = { ...defaultTheme, ...morningTheme };
export const Night = { ...defaultTheme, ...nightTheme };
