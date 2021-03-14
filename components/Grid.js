import styled from 'styled-components';
import { grid } from 'styled-system';
import Box from './Box';

const Grid = styled(Box)`
  ${grid}
`;

Grid.defaultProps = {
  display: 'grid',
  gridColumnGap: `var(--gutter)`,
  gridTemplateColumns: 'repeat(var(--columns), 1fr)',
}

export default Grid;