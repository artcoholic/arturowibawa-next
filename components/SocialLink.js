import styled from 'styled-components'
import Box from './Box';

const Wrapper = styled(Box)`
  padding: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightTheme.contentSecondary};
  transition: all 250ms ${({ theme }) => theme.ease.smooth};
  &:hover {
    color: ${({ theme }) => theme.colors.lightTheme.contentTertiary};
    &:after {
      transform: scaleX(1);
      transform-origin: 0%;
    }
  }
  &:after {
    content: '';
    width: 100%;
    height: 1px;
    transition: transform 250ms ${({ theme }) => theme.ease.smooth};
    background-color: ${({ theme }) => theme.colors.lightTheme.contentInversePrimary};
    position: absolute;
    bottom: -1px;
    left: 0;
    transform: scaleX(0);
    transform-origin: 100%;
  }
`

const SocialLink = ({ href, children, color, hoverColor }) => {
  return (
    <Wrapper
      as="a"
      href={href}
      target="_blank"
      rel="noopener"
      color={color || 'lightTheme.contentSecondary'}
      hoverColor={hoverColor}
    >
      {children}
    </Wrapper>
  )
}



export default SocialLink;