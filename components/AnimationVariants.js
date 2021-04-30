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
export const grain = keyframes`
  0%, 100% { transform:translate(0, 0); }
  10% { transform:translate(-5%, -10%); }
  20% { transform:translate(-15%, 5%); }
  30% { transform:translate(7%, -25%); }
  40% { transform:translate(-5%, 25%); }
  50% { transform:translate(-15%, 10%); }
  60% { transform:translate(15%, 0%); }
  70% { transform:translate(0%, 15%); }
  80% { transform:translate(3%, 35%); }
  90% { transform:translate(-10%, 10%); }
`
export const blink = keyframes`
  from { opacity: 0}
  to {opacity: 1}
`
export const sphere = keyframes`
  0%    {cx: 100px; rx: 0px; ry: 0px}
  10%   {rx: 10px; ry: 20px}
  20%   {rx: 18px; ry: 36px}
  30%   {rx: 22px; ry: 44px}
  40%   {rx: 24.5px; ry: 49px}
  45%   {rx: 25px; ry: 50px}
  50%   {rx: 25px; ry: 50px}
  55%   {rx: 25px; ry: 50px}
  60%   {rx: 24.5px; ry: 49px}
  70%   {rx: 22px; ry: 44px}
  80%   {rx: 18px; ry: 36px}
  90%   {rx: 10px; ry: 20px}
  100%  {cx: 0px; rx: 0px; ry: 0px}
`

export const radius = keyframes`
  from   {r: 20px}
  to     {r: 40px}
`

export const variants = {
  main: {
    exit: {
      opacity: 0,
      transition: {
        ease: [.23, 1, .32, 1],
        duration: 0.15
      }
    }
  },
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
      opacity: 0,
      // scale: 0.8,
      x: 400,
    },
    enter: {
      opacity: 1,
      // scale: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 10,
      }
    },
  },
  entryList: {
    enter: {
      transition: {
        staggerChildren: 0.1,
      }
    },
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
      y: '1.2em',
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
      y: '-3em',
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
      y: 200
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 50,
      }
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
        type: 'spring',
        stiffness: 400,
        damping: 100,
        mass: 10,
        delay: 1,
      }
    },
    exit: {
      opacity: 0,
    }
  },
  ProfileSection: {
    enter: {
      transition: {
        staggerChildren: 0.2,
      }
    }
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
        type: 'spring',
        stiffness: 420,
        damping: 80,
        mass: 4,
      }
    },
  },
};