import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Text from './Text';
import Box from './Box';
import { ArrowForwardThickFill } from 'akar-icons';

const Wrapper = styled(Text)`
  position: fixed;
  z-index: 98;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1.25em;
  border: 1px solid #AE922E;
  box-shadow: 0 4px 8px 0px rgba(0,0,0,0.25);
  transition: all 300ms ${({ theme }) => theme.ease.Smooth};
  border-radius: 8px;
  background-color: rgba(255,255,255,0.55);
  backdrop-filter: blur(12px);
  &:hover {
    background-color: rgba(255,255,255,1);
    box-shadow: 0 2px 4px 0px rgba(0,0,0,0.15);
  }
`

const VisitButton = ({ hookedYPosition, url, entry }) => {
  return (
    <Wrapper
      as={motion.a}
      href={url}
      bottom="layout.1/2"
      right="layout.1/2"
      target="_blank"
      rel="noopener"
      style={{ y: hookedYPosition > 24 ? 0 : 92 }}
      exit={{ y: 92 }}
      transition={{ duration: 0.3 }}
    >
      <ArrowForwardThickFill size={20} color="#1B1C32" />
      <Box display="flex" flexDirection="column" ml="spacing.3" pt={4}>
        <Text letterSpacing={1.2} fontSize={2} fontWeight="bold" textTransform="uppercase" style={{ textTransform: 'uppercase' }}>Visit</Text>
        <Text>{entry.fields.title}</Text>
      </Box>
    </Wrapper>
  )
}

export default VisitButton;