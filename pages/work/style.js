import styled from 'styled-components';
import Box from '../../components/Box';
import Text from '../../components/Text';

export const Line = styled(Box)`
  height: 1px;
  background: ${({ theme }) => theme.colors.lightTheme.contentPrimary};
  width: 100%;
`

export const ProjectTitle = styled(Text)`
  text-align: center;
  text-transform: uppercase;
`

export const CloseButton = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
`