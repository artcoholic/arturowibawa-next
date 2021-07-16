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
  transition: all 500ms ${props => props.theme.ease.Smooth};
  border-radius: 28px;
  background-color: rgba(255,255,255,0.5);
  overflow: hidden;
  backdrop-filter: blur(12px);
  &:hover {
    background-color: rgba(255,255,255,1);
  }
  &:active {
    box-shadow: none;
  }
  
  &.previous, &.next {
    color: #1B1C32;
    &::after, &::before {
      transition: all 500ms ${props => props.theme.ease.Smooth};
      padding-top: 4px;
      max-width: 0;
    }
  }
  &.previous {
    &:after {
      content: 'PREV';
      transform: translateX(1.4rem);
    }
    &:hover {
      &:after {
        width: auto;
        max-width: 100px;
        margin-left: .25rem;
        transform: translateX(0);
      }
    }
  }
  &.next {
    overflow: hidden;
    &:before {
      content: 'NEXT';
      transform: translateX(-4.1rem);
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
    >
      <Box display="flex">
        <Link href={`/work/${prevUrl}`} passHref>
          <ButtonWrapper className="previous" as="a" mr="spacing.2" px={["1rem", null, "1.5rem"]} title="Previous Work">
            <ArrowLeft />
          </ButtonWrapper>
        </Link>
        <Link href={`/work/${nextUrl}`} passHref>
          <ButtonWrapper className="next" as="a" mr="spacing.6" px={["1rem", null, "1.5rem"]} title="Next Work">
            <ArrowRight />
          </ButtonWrapper>
        </Link>
      </Box>
      <ButtonWrapper
        as={motion.a}
        href={entry.info.url}
        target="_blank"
        rel="noopener"
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
            // layout
            minWidth={24}
            ml="1rem"
          >
            <ArrowForwardThickFill color="#1B1C32" />
          </Box>
        }
      </ButtonWrapper>
    </Box>
  )
}

export default DynamicUI;