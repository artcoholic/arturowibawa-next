import React from 'react';
import styled from 'styled-components';
import Box from '../../components/Box';
import Text from '../../components/Text';

const SocialItemWrapper = styled(Box)`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  text-decoration: none;
  align-items: baseline;
  border-bottom: 1px solid ${props => props.theme.colors.bg.placeholder};
  padding-bottom: .5em;
  &:hover {
    &:before {
      transform: scaleX(1);
      transform-origin: left;
    }
    .social {
      color: ${props => props.theme.colors.content.inverseTertiary};
    }
  }
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: ${props => props.theme.colors.content.primary};
    bottom: 0;
    left: 0;
    transform: scaleX(0);
    transition: transform 300ms ${props => props.theme.ease.Smooth};
    transform-origin: right;
  }
  &:after {
    display: none;
  }
`

const SocialItem = ({ label, social, href }) => {
  return (
    <SocialItemWrapper as="a" href={href} mb="layout.1/2" target="_blank">
      <Text color="content.inverseTertiary">{label}</Text>
      <Text className="social" font="ParagraphSmall" color="content.inverseSecondary">{social}</Text>
    </SocialItemWrapper>
  )
}

export default SocialItem;