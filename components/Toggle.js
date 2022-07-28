import React from 'react';
import styled from 'styled-components'
import Box from './Box';
import Text from './Text';

const Select = styled(Box)`
  cursor: pointer;
  padding: .5em 1em;
  border: none;
  border-radius: 8px;
  &::-ms-expand {
    display: none;
  }
`

const Thumb = styled(Box)`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform .15s ${props => props.theme.ease.It};
`

const Label = styled(Text)`
  position: absolute;
  padding: .5em 1em;
  border-radius: 4px;
  left: 50%;
  transform: translateY(36px) translateX(-50%);
  white-space: nowrap;
  opacity: 0;
  transition: all 150ms ease-out;
  display: flex;
  justify-content: center;
  pointer-events: none;
  &::after {
    content: '';
    position: absolute;
    top: -4px;
    width: 12px;
    height: 12px;
    background-color: ${props => props.theme.colors.bg.primary};
    transform: rotate(45deg);
    transform-origin: center;
    border-radius: 2px;
    transition: background-color 150ms ease-out;
  }
`

const Toggle = ({theme, setTheme}) => {
  return (
    <Select 
      as="select" 
      value={theme} 
      onChange={(e) => {
          setTheme(e.target.value);
          window.localStorage.setItem('theme', e.target.value); 
        }
      }
    >
      <option value="Night" selected>Night</option>
      <option value="Morning">Morning</option>
    </Select>
  )
};

export default Toggle;
