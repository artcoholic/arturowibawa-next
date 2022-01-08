import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';
import Box from './Box';
import { variants } from './AnimationVariants';
import { motion } from 'framer-motion';
import { closestEdge } from '../utils/ClosestEdge';

const marquee = keyframes`
  100% {
		transform: translate3d(-50%, 0, 0);
	}
`

const Container = styled(Box)`
  position: relative;
  background: none;
  outline: none;
  width: 100vw;
  text-decoration: none;
  overflow: hidden;
  border-top: 1px solid ${props => props.theme.colors.content.inversePrimary};
  
  &:hover, &:focus {
    .marquee {
      transform: translateY(0%);
      .marquee__inner-wrap {
        transform: translateY(0%);
      }
    }
  }
  .marquee {
    position: absolute;
    top: 0; left: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: ${props => props.theme.colors.bg.primary};
    transform: ${props => props.edge === 'top' ? 'translateY(-100%)' : 'translateY(100%)'};
    transition: transform 500ms ${props => props.theme.ease.It};

    .marquee__inner-wrap {
      height: 100%;
      width: 100%;
      transform: ${props => props.edge === 'top' ? 'translateY(200%)' : 'translateY(-200%)'};
      transition: transform 500ms ${props => props.theme.ease.It};
    }

    .marquee__inner {
      height: 100%;
      width: fit-content;
      align-items: center;
      display: flex;
      position: relative;
      animation: ${marquee} 20s linear infinite;
      will-change: transform;

      span {
        color: ${props => props.theme.colors.content.inverseTertiary};
        font-family: 'Whyte Light';
        white-space: nowrap;
        text-transform: uppercase;
        padding: 0 .5em ${props => props.theme.space.layout['1/4']}; 
      }

      img {
        height: .9em;
      }
    }
  }
`

const MenuItem = ({ children, path, setOpen, title, keyword_1, keyword_2, keyword_3, keyword_4 }) => {
  const [edge, setEdge] = useState('')
  const ref = useRef(null);
  function findClosestEdge(ev, node) {
    const x = ev.pageX - node.offsetLeft;
    const y = ev.pageY - node.offsetTop;
    return closestEdge(x, y, node.clientWidth, node.clientHeight);
  }
  return (
    <Link href={path} passHref>
      <Container
        as={motion.a}
        color="content.inversePrimary"
        font={["Display", null, null, null, null, "HeadingLarge"]}
        variants={variants.menuItem}
        onClick={() => setOpen(false)}
        aria-label={title}
        px="layout.1"
        pt="layout.1/4"
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 100,
        }}
        edge={edge}
        ref={ref}
        onHoverStart={(ev) => setEdge(findClosestEdge(ev, ref.current))}
        onHoverEnd={(ev) => setEdge(findClosestEdge(ev, ref.current))}
      >
        {children}
        <div className="marquee">
          <div className="marquee__inner-wrap">
            <div className="marquee__inner" aria-hidden="true">
              <span>{keyword_1}</span>
              <img src={`/images/menu/${keyword_4}-01.png`} />
              <span>{keyword_2}</span>
              <img src={`/images/menu/${keyword_4}-02.png`} />
              <span>{keyword_3}</span>
              <img src={`/images/menu/${keyword_4}-03.png`} />
              <span>{keyword_4}</span>
              <img src={`/images/menu/${keyword_4}-04.png`} />
              <span>{keyword_1}</span>
              <img src={`/images/menu/${keyword_4}-01.png`} />
              <span>{keyword_2}</span>
              <img src={`/images/menu/${keyword_4}-02.png`} />
              <span>{keyword_3}</span>
              <img src={`/images/menu/${keyword_4}-03.png`} />
              <span>{keyword_4}</span>
              <img src={`/images/menu/${keyword_4}-04.png`} />
            </div>
          </div>
        </div>
      </Container>
    </Link>
  );
};

export default MenuItem;