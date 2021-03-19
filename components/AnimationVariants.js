import { keyframes } from 'styled-components';

export const wipe = keyframes`
  0% { 
    transform: scaleX(0); 
    transform-origin: left;
  }
  50% { 
    transform: scaleX(1);
    transform-origin: left;
  }
  75% {
    transform: scaleX(1);
    transform-origin: right;
  }
  100% {
    transform: scaleX(0);
    transform-origin: right;
  }
`

export const blink = keyframes`
  from { opacity: 0}
  to {opacity: 1}
`

export const variants = {
  menuItem: {
    open: {
      y: 0,
      transition: {
        stiffness: 1000,
        damping: 300,
      }
    },
    closed: {
      y: 200,
      transition: {
        stiffness: 40,
        damping: 40,
      }
    }
  },
  menuContainer: {
    open: {
      clipPath: 'circle(calc(100% + 100vh) at calc(100% - (var(--gutter) + 16px)) calc(var(--gutter) + 16px))',
      transition: {
        type: "spring",
        stiffness: 40,
        restDelta: 4,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    },
    closed: {
      clipPath: 'circle(calc(12px * 1) at calc(100% - (var(--gutter) + 16px)) calc(var(--gutter) + 16px))',
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.05,
        staggerDirection: -1,
      }
    }
  },
  entryItem: {
    initial: {
      x: 400,
      opacity: 0,
    },
    enter: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 600,
        damping: 120,
        mass: 4,
      }
    },
    exit: {
      x: -400,
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 800,
        damping: 120,
        mass: 4,
      }
    }
  },
  entryList: {
    enter: {
      transition: {
        staggerChildren: 0.2,
      }
    },
    exit: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  },
  progress: {
    initial: {
      width: 0,
    },
    enter: {
      width: '100%',
      transition: {
        type: 'spring',
        damping: 100,
        stiffness: 600,
      }
    },
    exit: {
      opacity: 0,
    }
  },
  footer: {
    initial: {
      y: '2.4em'
    },
    enter: {
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 50,
      }
    },
    exit: {
      y: '2.4em',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 50,
      }
    }
  },
  slugTitle: {
    initial: {
      y: '1em',
      opacity: 0,
    },
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        y: {
          type: 'spring',
          stiffness: 300,
          damping: 100,
          mass: 10,
        }
      }
    },
  },
  slugStats: {
    initial: {
      y: '-2em',
    },
    enter: {
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 50,
        delay: 0.5,
      }
    },
  },
  slugContent: {
    initial: {
      opacity: 0,
      y: 100
    },
    enter: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      y: 100,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 100,
        mass: 10,
      }
    }
  }
};