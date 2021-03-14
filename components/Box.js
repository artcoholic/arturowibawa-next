import styled from 'styled-components';
import { compose, color, layout, space, position, flexbox, border } from 'styled-system';
import { CustomProps } from '../utils/CustomProps';

const Box = styled.div(
  compose(
    color,
    layout,
    space,
    position,
    flexbox,
    border,
    CustomProps,
  )
);

Box.defaultProps = {
  position: 'relative',
}

export default Box;