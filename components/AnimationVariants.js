import { keyframes } from "../config/stitches.config";

export const wipe = keyframes({
  "0%": {
    transform: "scaleX(0)",
    transformOrigin: "left",
  },
  "50%": {
    transform: "scaleX(1)",
    transformOrigin: "left",
  },
  "75%": {
    transform: "scaleX(1)",
    transformOrigin: "right",
  },
  "100%": {
    transform: "scaleX(0)",
    transformOrigin: "right",
  },
});

export const grain = keyframes({
  "0%, 100%": { transform: "translate(0, 0)" },
  "10%": { transform: "translate(-5%, -10%)" },
  "20%": { transform: "translate(-15%, 5%)" },
  "30%": { transform: "translate(7%, -25%)" },
  "40%": { transform: "translate(-5%, 25%)" },
  "50%": { transform: "translate(-15%, 10%)" },
  "60%": { transform: "translate(15%, 0%)" },
  "70%": { transform: "translate(0%, 15%)" },
  "80%": { transform: "translate(3%, 35%)" },
  "90%": { transform: "translate(-10%, 10%)" },
});

export const blink = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const radius = keyframes({
  from: { r: 20 },
  to: { r: 40 },
});

export const eyeLid = keyframes({
  "0%": { transform: "scaleY(1)" },
  "10%": { transform: "scaleY(.2)" },
  "20%": { transform: "scaleY(1)" },
  "100%": { transform: "scaleY(1)" },
});

export const eyeBall = keyframes({
  "0%": { transform: "translate(0, 0)", opacity: 1 },
  "10%": { transform: "translate(0, 2px)", opacity: 0 },
  "20%": { transform: "translate(0, 0)", opacity: 1 },
  "100%": { transform: "translate(0, 0)", opacity: 1 },
});

export const rotation = keyframes({
  from: { transform: "rotate(0)" },
  to: { transform: "rotate(360deg)" },
});

export const variants = {
  main: {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
      transition: {
        ease: [0.23, 1, 0.32, 1],
        duration: 0.5,
      },
    },
  },
  menuItem: {
    open: {
      y: 0,
    },
    closed: {
      y: "300%",
    },
  },
  menuContainer: {
    open: {
      clipPath:
        "circle(calc(100% + 100vh) at calc(100% - (var(--gutter) + 16px)) calc(var(--gutter) + 16px))",
      transition: {
        type: "spring",
        stiffness: 40,
        restDelta: 4,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    closed: {
      clipPath:
        "circle(calc(12px * 0) at calc(100% - (var(--gutter) + 16px)) calc(var(--gutter) + 16px))",
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  },
  entryItem: {
    initial: {
      opacity: 0,
      x: "20vw",
    },
    enter: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  },
  entryList: {
    enter: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  },
  progress: {
    initial: {
      width: 0,
    },
    enter: {
      width: "100%",
      transition: {
        type: "spring",
        damping: 100,
        stiffness: 600,
      },
    },
  },
  footer: {
    initial: {
      y: "2.4em",
    },
    enter: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 50,
      },
    },
    exit: {
      y: "2.4em",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 50,
      },
    },
  },
  slugTitle: {
    initial: {
      y: "1.2em",
      opacity: 0,
    },
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        y: {
          type: "spring",
          stiffness: 300,
          damping: 100,
          mass: 10,
        },
      },
    },
  },
  slugStats: {
    initial: {
      y: "-4em",
    },
    enter: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 50,
        delay: 0.5,
      },
    },
  },
  slugContent: {
    initial: {
      opacity: 0,
      y: 200,
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 50,
      },
    },
  },
  MyName: {
    initial: {
      y: "1em",
      opacity: 0,
    },
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 100,
        mass: 10,
        delay: 1,
      },
    },
    exit: {
      opacity: 0,
    },
  },
  ProfileSection: {
    enter: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  },
  ProfileContent: {
    initial: {
      y: "1em",
      opacity: 0,
    },
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 420,
        damping: 80,
        mass: 4,
      },
    },
  },
  gallery: {
    initial: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    enter: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  },
  trigger: {
    offscreen: {
      opacity: 0,
      y: 100,
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 150,
        mass: 10,
      },
    },
  },
};
