import styled from 'styled-components'
import Box from './Box';

const Wrapper = styled(Box)`
  padding: 8px;
  transition: all 150ms ${props => props.theme.ease.It};
  background: ${props => props.theme.colors.content.secondary};
  border-radius: 50%;
  &:hover {
    color: ${props => props.theme.colors.content.inverseTertiary};
    background: ${props => props.theme.colors.bg.primary};
  }
`

const SocialLink = ({ href, children, color }) => {
  return (
    <Wrapper
      as="a"
      href={href}
      target="_blank"
      rel="noopener"
      color={color || 'content.primary'}
    >
      {children}
    </Wrapper>
  )
}



export default SocialLink;