import React from 'react';
import styled from 'styled-components';
import Box from './Box';

const Container = styled(Box)`
  --gradient0: ${props => props.theme.colors.gradient[0]};
  --gradient1: ${props => props.theme.colors.gradient[1]};
  background: var(--gradient1);
  background: -moz-linear-gradient(0deg, var(--gradient0) 0%, var(--gradient1) 100%);
  background: -webkit-linear-gradient(0deg, var(--gradient0) 0%, var(--gradient1) 100%);
  background: linear-gradient(0deg, var(--gradient0) 0%, var(--gradient1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#1b1c32",endColorstr="#1b1c32",GradientType=1);
  pointer-events: none;
`

const GradientBox = () => (
  <Container
    columns="-1/1"
    position="fixed"
    top={0}
    left={0}
    width="100%"
    pt="layout.4"
  />
)

export default GradientBox;