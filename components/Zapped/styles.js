import styled, { keyframes, css } from 'styled-components';
import Box from '../Box';
import Text from '../Text';

export const Wrapper = styled(Box)`
  display: flex;
  align-items: center;
`

export const Tooltip = styled(Text)`
  position: absolute;
  bottom: 0;
  font-size: 12px;
  padding: 2px .5em;
  border-radius: 4px;
  left: 50%;
  transform: translateX(-50%) translateY(1.5em);
  text-transform: uppercase;
  transition: all 0.15s ease-out;
  pointer-events: none;
  opacity: 0;
  &::after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -4px;
    border-width: 4px;
    border-style: solid;
    border-color: transparent transparent ${props => props.theme.colors.content.primary} transparent;
  }
`

export const Button = styled(Box)`
  background: none;
  padding: 6px;
  cursor: pointer;
  transition: opacity 0.15s ease-out;
  &:hover {
    .tooltip {
      transform: translateX(-50%) translateY(1em);
      opacity: 1;
    }
  }
  svg {
    --zapped: ${props => props.theme.colors.zapped.stroke};
    --unzapped: ${props => props.theme.colors.content.inverseSecondary};
    --zapFill: ${props => props.theme.colors.zapped.fill};
    display: block;
    width: 60px;
    overflow: visible;
    .thunder {
      transform-origin: center;
      stroke: ${props => props.userLiked ? 'var(--zapped)' : 'var(--unzapped)'};
      fill: ${props => props.userLiked ? 'var(--zapFill)' : 'none'};
      animation: ${props => props.userLiked ? css`${animateThunder} 0.3s linear forwards` : css`${animateThunderOut} 0.3s linear forwards`};
    }
    #main-circ {
      transition: all 2s;
      transform-origin: 29px 29px;
      opacity: ${props => props.userLiked ? 1 : 0};
      animation: ${props => props.userLiked && css`
                    ${animateCircle} 0.3s linear forwards
                  `};
    }
    ${props => props.userLiked && css`
      #grp1 {
        opacity: 1;
        transition: 0.1s all 0.3s;
        #oval1 {
          transform: scale(0) translate(0, -30px);
          transform-origin: 0 0 0;
          transition: 0.5s transform 0.3s;
        }
        #oval2 {
          transform: scale(0) translate(10px, -50px);
          transform-origin: 0 0 0;
          transition: 1.5s transform 0.3s;
        }
      }
      #grp2 {
        opacity: 1;
        transition: 0.1s all 0.3s;
        #oval1 {
          transform: scale(0) translate(30px, -15px);
          transform-origin: 0 0 0;
          transition: 0.5s transform 0.3s;
        }
        #oval2 {
          transform: scale(0) translate(60px, -15px);
          transform-origin: 0 0 0;
          transition: 1.5s transform 0.3s;
        }
      }
      #grp3 {
        opacity: 1;
        transition: 0.1s all 0.3s;
        #oval1 {
          transform: scale(0) translate(30px, 0px);
          transform-origin: 0 0 0;
          transition: 0.5s transform 0.3s;
        }
        #oval2 {
          transform: scale(0) translate(60px, 10px);
          transform-origin: 0 0 0;
          transition: 1.5s transform 0.3s;
        }
      }
      #grp4 {
        opacity: 1;
        transition: 0.1s all 0.3s;
        #oval1 {
          transform: scale(0) translate(30px, 15px);
          transform-origin: 0 0 0;
          transition: 0.5s transform 0.3s;
        }
        #oval2 {
          transform: scale(0) translate(40px, 50px);
          transform-origin: 0 0 0;
          transition: 1.5s transform 0.3s;
        }
      }
      #grp5 {
        opacity: 1;
        transition: 0.1s all 0.3s;
        #oval1 {
          transform: scale(0) translate(-10px, 20px);
          transform-origin: 0 0 0;
          transition: 0.5s transform 0.3s;
        }
        #oval2 {
          transform: scale(0) translate(-60px, 30px);
          transform-origin: 0 0 0;
          transition: 1.5s transform 0.3s;
        }
      }
      #grp6 {
        opacity: 1;
        transition: 0.1s all 0.3s;
        #oval1 {
          transform: scale(0) translate(-30px, 0px);
          transform-origin: 0 0 0;
          transition: 0.5s transform 0.3s;
        }
        #oval2 {
          transform: scale(0) translate(-60px, -5px);
          transform-origin: 0 0 0;
          transition: 1.5s transform 0.3s;
        }
      }
      #grp7 {
        opacity: 1;
        transition: 0.1s all 0.3s;
        #oval1 {
          transform: scale(0) translate(-30px, -15px);
          transform-origin: 0 0 0;
          transition: 0.5s transform 0.3s;
        }
        #oval2 {
          transform: scale(0) translate(-55px, -30px);
          transform-origin: 0 0 0;
          transition: 1.5s transform 0.3s;
        }
      }
      #grp8 {
        opacity: 1;
        transition: 0.1s all 0.3s;
        #oval1 {
          transform: scale(0) translate(0, 30px);
          transform-origin: 0 0 0;
          transition: 0.5s transform 0.3s;
        }
        #oval2 {
          transform: scale(0) translate(-10px, 50px);
          transform-origin: 0 0 0;
          transition: 1.5s transform 0.3s;
        }
      }
    `};
  }
`

export const Count = styled(Text)`
  color: ${props => props.theme.colors.content.inverseSecondary};
`

const animateCircle = keyframes`
  40% {
    transform: scale(10);
    opacity: 1;
    fill: #dd4688;
  }
  55% {
    transform: scale(11);
    opacity: 1;
    fill: #d46abf;
  }
  65% {
    transform: scale(12);
    opacity: 1;
    fill: #cc8ef5;
  }
  75% {
    transform: scale(13);
    opacity: 1;
    fill: transparent;
    stroke: #cc8ef5;
    stroke-width: 0.5;
  }
  85% {
    transform: scale(17);
    opacity: 1;
    fill: transparent;
    stroke: #cc8ef5;
    stroke-width: 0.2;
    }
  95% {
    transform: scale(18);
    opacity: 1;
    fill: transparent;
    stroke: #cc8ef5;
    stroke-width: 0.1;
    }
  100% {
    transform: scale(19);
    opacity: 1;
    fill: transparent;
    stroke: #cc8ef5;
    stroke-width: 0;
  }
`

const animateThunder = keyframes` 
  0% {
    transform: scale(0.2) translate(20px, 20px);
  }
  40% {
    transform: scale(1.2) translate(20px, 20px);
  }
  100% {
    transform: scale(1) translate(20px, 20px);
  }
`

const animateThunderOut = keyframes`
  0% {
    transform: scale(1.4) translate(20px, 20px);
  }
  100% {
    transform: scale(1) translate(20px, 20px);
  }
`