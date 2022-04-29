import React from 'react';
import styled from 'styled-components'
import Box from './Box';
import Text from './Text';
import { Sun, MoonFill } from 'akar-icons'

const Wrapper = styled(Box)`
  position: absolute;  
  left: 50%;
  transform: translateX(-50%);
  height: 32px;
  width: 48px;
  display: flex;
  border-radius: 9999em;
  align-items: center;
  cursor: pointer;

  &:before {
    content: '';
    width: 100%;
    height: 20px;
    background-color: ${props => props.theme.colors.bg.inverseSecondary};
    position: absolute;
    left: 0;
    border-radius: 12px;
  }
  input {
    display: none;
  }
  input:checked + .thumb {
    transform: translateX(24px);
  }
  input:checked + .thumb svg {
    color: ${props => props.theme.colors.content.primary};
  }
  &:hover{
    .toggleLabel {
      opacity: 1;
      transform: translateY(36px) translateX(-50%);
    }
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
  text-transform: uppercase;
  padding: .25em .75em;
  border-radius: 4px;
  left: 50%;
  transform: translateY(24px) translateX(-50%);
  white-space: nowrap;
  opacity: 0;
  transition: all 150ms ease-out;
  display: flex;
  justify-content: center;
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

const Toggle = ({ checked, onChange }) => (
  <Wrapper
    top="layout.1"
    as="label"
  >
    <input
      type="checkbox"
      id="switch"
      checked={checked}
      onChange={onChange}
    />
    <Thumb
      as="span"
      htmlFor="switch"
      className="thumb"
      bg="content.inversePrimary"
    >
      {checked ? <MoonFill size={16} /> : <Sun size={16} />}
    </Thumb>
    <Label className="toggleLabel" fontSize={3} color="content.inverseTertiary" bg="bg.primary">{checked ? "Good Night" : "Good Morning"}</Label>
  </Wrapper>
);

export default Toggle;
