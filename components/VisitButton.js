import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Text from './Text';
import Box from './Box';
import { ArrowForwardThickFill } from 'akar-icons';

const Wrapper = styled(Text)`
  text-decoration: none;
  display: flex;
  height: 56px;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5em;
  border: 1px solid ${props => props.theme.colors.content.secondary};
  box-shadow: 0 4px 8px 0px rgba(0,0,0,0.15);
  transition: all 500ms ${props => props.theme.ease.Smooth};
  border-radius: 28px;
  background-color: rgba(255,255,255,0.55);
  backdrop-filter: blur(12px);
  &:hover {
    background-color: rgba(255,255,255,1);
  }
  &:active {
    box-shadow: none;
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
        <Box display="flex" flexDirection="column" mr="spacing.4" pt={4}>
          <Text letterSpacing={1.2} fontSize={2} fontWeight="bold" color="#1B1C32" style={{ textTransform: 'uppercase' }}>Visit</Text>
          <Text color="#1B1C32">{entry.fields.title}</Text>
        </Box>
        <ArrowForwardThickFill color="#1B1C32" />
      </Wrapper>
    </Box>
  )
}

export default VisitButton;