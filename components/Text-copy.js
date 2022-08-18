import styled from 'styled-components';
import { typography } from 'styled-system';
import CustomProps from '../utils/CustomProps';
import Box from './Box';

const Text = styled(Box)`
  ${typography}
  ${CustomProps.font}
`;

Text.defaultProps = {
  color: 'content.primary',
  fontFamily: 'Whyte Light',
  fontWeight: 'normal'
}

export default Text;