import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Text from './Text';
import Box from './Box';
import { ArrowForwardThickFill } from 'akar-icons';

const Wrapper = styled(Text)`
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 0.5em 1.25em;
  border: 1px solid #AE922E;
  box-shadow: 0 4px 8px 0px rgba(0,0,0,0.25);
  transition: all 500ms ${({ theme }) => theme.ease.Smooth};
  border-radius: 4px;
  background-color: rgba(255,255,255,0.55);
  backdrop-filter: blur(12px);
  &:hover {
    background-color: rgba(255,255,255,1);
    box-shadow: 0 2px 4px 0px rgba(0,0,0,0.15);
  }
`

const VisitButton = ({ hookedYPosition, url, entry }) => {
  return (
    <Box
      position="fixed"
      zIndex={98}
      width="100%"
      bottom={["layout.1", null, null, 'layout.1/2']}
      px={["layout.1", null, null, 'layout.1/2']}
      display={['block', null, null, 'flex']}
      justifyContent="flex-end"
    >
      <Wrapper
        as={motion.a}
        href={url}
        width={['100%', null, null, 'auto']}
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
    </Box>
  )
}

export default VisitButton;