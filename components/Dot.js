import styled from 'styled-components'
import Box from './Box';
import useMousePosition from './useMousePosition';

const Wrapper = styled(Box)`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  transform: translate(-50%, -50%);
  z-index: 999;
  pointer-events: none;
	background: ${props => props.theme.colors.content.primary};
  transition: all 500ms ${props => props.theme.ease.Smooth};
  mix-blend-mode: difference;
`

const Dot = () => {
  const { x, y } = useMousePosition();
  return (
    <Wrapper style={{ left: `${x}px`, top: `${y}px` }} />
  )
}

export default Dot;