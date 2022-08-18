import { createStitches, defaultThemeMap } from "@stitches/react";

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      bg_primary: "#1B1C32",
      bg_secondary: "#303157",
      bg_tertiary: "#22233E",
      bg_inversePrimary: "#FFD542",
      bg_inverseSecondary: "#FFEBA4",
      bg_inverseTertiary: "#FFE178",
      bg_placeholder: "#22233E",
      bg_boxShadow: "rgba(0,0,0,0.5)",
      bg_entryCard: "navajowhite",
      fg_primary: "#FFD542",
      fg_secondary: "#AE922E",
      fg_tertiary: "#67571C",
      fg_inversePrimary: "#1B1C32",
      fg_inverseSecondary: "#505177",
      fg_inverseTertiary: "#9B9BB1",
      gradient1: "rgba(27,28,50,0)",
      gradient2: "rgba(27,28,50,1)",
      zappedStroke: "#FFD542",
      zappedFill: "#AE922E",
    },
    space: {
      "0_125": "calc(var(--gutter) * 0.125)",
      "0_25": "calc(var(--gutter) * 0.25)",
      "0_5": "calc(var(--gutter) * 0.5)",
      "0_75": "calc(var(--gutter) * 0.75)",
      1: "var(--gutter)",
      "1_5": "calc(var(--gutter) * 1.5)",
      2: "calc(var(--gutter) * 2)",
      3: "calc(var(--gutter) * 3)",
      4: "calc(var(--gutter) * 4)",
      5: "calc(var(--gutter) * 5)",
      6: "calc(var(--gutter) * 6)",
    },
    typeScale: {
      paragraphSmall: "var(--base)/var(--paragraphLineheight) var(--paragraph)",
      paragraphMedium:
        "calc(var(--scale) * 1em)/var(--paragraphLineheight) var(--paragraph)",
      paragraphLarge:
        "calc(var(--scale) * var(--scale) * 1em)/var(--paragraphLineheight) var(--paragraph)",
      headingSmall:
        "calc(var(--scale) * var(--scale) * var(--scale) * 1em)/var(--headingLineHeight) var(--heading)",
      headingMedium:
        "calc(var(--scale) * var(--scale) * var(--scale) * var(--scale) * 1em)/var(--headingLineHeight) var(--heading)",
      headingLarge:
        "calc(var(--scale) * var(--scale) * var(--scale) * var(--scale) * var(--scale) * 1em)/var(--headingLineHeight) var(--heading)",
      display:
        "calc(var(--scale) * var(--scale) * var(--scale) * var(--scale) * var(--scale) * var(--scale) * 1em)/var(--headingLineHeight) var(--heading)",
    },
    ease: {
      it: "cubic-bezier(0.6, 0.2, 0.1, 1)",
      bounce: "cubic-bezier(0.54, 1.54, 0.43, 0.94)",
      button: "cubic-bezier(.05,.91,.43,.92)",
      smooth: "cubic-bezier(.23,1,.32,1)",
    },
  },
  themeMap: {
    ...defaultThemeMap,
    font: "typeScale",
  },
  media: {
    bp1: "(min-width: 640px)",
    bp2: "(min-width: 960px)",
    bp3: "(min-width: 1280px)",
    bp4: "(min-width: 1920px)",
    bp5: "(min-width: 2560px)",
  },
  utils: {
    m: (value) => ({
      margin: value,
    }),
    mt: (value) => ({
      marginTop: value,
    }),
    mr: (value) => ({
      marginRight: value,
    }),
    mb: (value) => ({
      marginBottom: value,
    }),
    ml: (value) => ({
      marginLeft: value,
    }),
    mx: (value) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value) => ({
      marginTop: value,
      marginBottom: value,
    }),
    p: (value) => ({
      padding: value,
    }),
    pt: (value) => ({
      paddingTop: value,
    }),
    pr: (value) => ({
      paddingRight: value,
    }),
    pb: (value) => ({
      paddingBottom: value,
    }),
    pl: (value) => ({
      paddingLeft: value,
    }),
    px: (value) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    bg: (value) => ({
      background: value,
    }),
    typeScale: (value) => ({
      font: value,
    }),
    size: (value) => ({
      width: value,
      height: value,
    }),
    minSize: (value) => ({
      minWidth: value,
      minHeight: value,
    }),
  },
});

export const globalStyles = globalCss({
  ":root": {
    $gutter: "1.5rem",
    $columns: 2,
    $margins: 1,
    $scale: 1.2,
    $headingLineHeight: 1.2,
    $paragraphLineheight: 1.5,
    $base: 16,
    $color: "rgba(229, 79, 79, 0.3)",
    $heading: "Whyte Inktrap Thin",
    $paragraph: "Whyte Light",
    $systemFonts: ` -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
    "@bp1": {
      $gutter: "2rem",
      $columns: 4,
      $scale: 1.25,
    },
    "@bp2": {
      $columns: 8,
      $scale: 1.333,
    },
    "@bp3": {
      $gutter: "3rem",
      $columns: 12,
      $scale: 1.414,
    },
    "@bp4": {
      $gutter: "4rem",
      $scale: 1.5,
    },
    "@bp5": {
      $gutter: "4.5rem",
      $scale: 1.618,
    },
  },
  "*": {
    boxSizing: "border-box",
  },
  html: {
    scrollBehavior: "smooth",
    bg: "$bg_primary",
  },
  body: {
    overscrollBehaviorY: "none",
    fontFamily: "var(--systemFonts)",
    textRendering: "optimizeLegibility",
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
  },
  code: {
    fontFamily: `source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace`,
  },
  "body,h1,h2,h3,h4,h5,h6,p": {
    margin: 0,
  },
  "img, video": {
    display: "block",
  },
  a: {
    position: "relative",
    textDecoration: "underline",
    textDecorationThickness: 1,
    whiteSpace: "nowrap",
    color: "$fg_primary",
    "&:hover": {
      color: "$fg_inversePrimary",
      textDecoration: "none",
      "&:after": {
        transform: "scaleX(1)",
        transformOrigin: "0%",
      },
    },
    "&:after": {
      content: "",
      background: "$fg_primary",
      transition: "transform 150ms $ease$button",
      height: "100%",
      left: 0,
      bottom: 0,
      width: "100%",
      transform: "scaleX(0)",
      transformOrigin: "100%",
      position: "absolute",
      zIndex: -1,
    },
  },
});
