import styled from 'styled-components'
import Box from './Box';

const Wrapper = styled(Box)`
  padding: 8px;
  border-bottom: 1px solid ${props => props.theme.colors.content.secondary};
  transition: all 250ms ${props => props.theme.ease.smooth};
  &:hover {
    color: ${props => props.theme.colors.content.tertiary};
    &:after {
      transform: scaleX(1);
      transform-origin: 0%;
    }
  }
  &:after {
    content: '';
    width: 100%;
    height: 1px;
    transition: transform 250ms ${props => props.theme.ease.smooth};
    background-color: ${props => props.theme.colors.content.inversePrimary};
    position: absolute;
    bottom: -1px;
    left: 0;
    transform: scaleX(0);
    transform-origin: 100%;
  }
`

const SocialLink = ({ href, children, color }) => {
  return (
    <Wrapper
      as="a"
      href={href}
      target="_blank"
      rel="noopener"
      color={color || 'content.secondary'}
    >
      {children}
    </Wrapper>
  )
}



export default SocialLink;