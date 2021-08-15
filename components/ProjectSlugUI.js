import React from 'react';
import Link from 'next/link'
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Text from './Text';
import Box from './Box';
import { ArrowForwardThickFill, ArrowLeft, ArrowRight } from 'akar-icons';

const ButtonWrapper = styled(Text)`
  text-decoration: none;
  display: flex;
  height: 56px;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${props => props.theme.colors.content.secondary};
  box-shadow: 0 4px 8px 0px rgba(0,0,0,0.15);
  transition: all 300ms ${props => props.theme.ease.Btn};
  border-radius: 28px;
  background-color: rgba(255,255,255,0.5);
  overflow: hidden;
  pointer-events: auto;
  backdrop-filter: blur(12px);
  &:hover {
    background-color: rgba(255,255,255,1);
  }
  &:active {
    box-shadow: none;
  }
  &:after {
    display: none;
  }
  
  &.previous, &.next {
    color: #1B1C32;
    &::before {
      transition: all 300ms ${props => props.theme.ease.Btn};
      max-width: 0;
    }
  }
  &.previous {
    flex-direction: row-reverse;
    &:before {
      content: 'PREV';
      transform: translateX(2rem);
    }
    &:hover {
      &:before {
        width: auto;
        max-width: 100px;
        margin-left: .25rem;
        transform: translateX(0rem);
      }
    }
  }
  &.next {
    overflow: hidden;
    &:before {
      content: 'NEXT';
      transform: translateX(-4.2rem);
    }
    &:hover {
      &:before {
        width: auto;
        max-width: 100px;
        margin-right: .25rem;
        transform: translateX(0);
      }
    }
  }
`

const DynamicUI = ({ entry, prevUrl, nextUrl }) => {
  return (
    <Box
      as={motion.div}
      position="fixed"
      zIndex={98}
      width="100%"
      bottom={0}
      p={["layout.1/2", null, null, 'layout.1/2']}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      initial={{ y: 92 }}
      animate={{ y: 0 }}
      exit={{ y: 92 }}
      transition={{ type: 'spring', stiffness: 300, damping: 50 }}
      style={{ pointerEvents: 'none' }}
    >
      <Box display="flex">
        <Link href={`/work/${prevUrl}`} passHref>
          <ButtonWrapper className="previous" as="a" mr="spacing.2" px={["1rem", null, "1.5rem"]}>
            <ArrowLeft />
          </ButtonWrapper>
        </Link>
        <Link href={`/work/${nextUrl}`} passHref>
          <ButtonWrapper className="next" as="a" mr="spacing.6" px={["1rem", null, "1.5rem"]}>
            <ArrowRight />
          </ButtonWrapper>
        </Link>
      </Box>
      <ButtonWrapper
        as={motion.a}
        href={entry.info.url}
        target="_blank"
        cursor={entry.info.url ? "pointer" : "not-allowed"}
        px="1.5rem"
        minWidth={0}
      >
        <Box
          as={motion.div}
          display="flex"
          flexDirection="column"
          pt={4}
          minWidth={0}
        >
          <Text
            letterSpacing={1.2}
            fontSize={2}
            fontWeight="bold"
            color="#1B1C32"
            style={{ textTransform: 'uppercase' }}
          >
            Visit
          </Text>
          <Text
            color="#1B1C32"
            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {entry.info.url ? entry.title : "Unavailable"}
          </Text>
        </Box>
        {entry.info.url &&
          <Box
            as={motion.div}
            minWidth={24}
            ml="1rem"
          >
            <ArrowForwardThickFill color="#1B1C32" style={{ display: 'block' }} />
          </Box>
        }
      </ButtonWrapper>
    </Box>
  )
}

export default DynamicUI;