import styled from 'styled-components'
import Box from './Box';

const Wrapper = styled(Box)`
  padding: 8px;
  transition: all 150ms ${props => props.theme.ease.Btn};
  background: ${props => props.theme.colors.content.secondary};
  border-radius: 50%;
  margin-right: .75rem;
  &:hover {
    color: ${props => props.theme.colors.content.inverseTertiary};
    background: ${props => props.theme.colors.bg.primary};
  }
  svg {
    display: block;
  }
  &:after {
    display: none;
  }
`

const SocialLink = ({ href, children, color, title }) => {
  // console.log('SocialLink');
  return (
    <Wrapper
      as="a"
      href={href}
      target="_blank"
      rel="noopener"
      color={color || 'content.primary'}
      title={title}
    >
      {children}
    </Wrapper>
  )
}



export default SocialLink;