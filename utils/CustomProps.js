import { system } from 'styled-system';

const config = {
  start: {
    property: 'gridColumnStart',
    scale: 'start',
  },
  span: {
    property: 'gridColumnEnd',
    scale: 'span',
  },
  columns: {
    property: 'gridColumn',
  },
  alignSelf: true,
  justifySelf: true,
  placeSelf: true,
  font: {
    property: 'font',
    scale: 'typeScale'
  },
  cursor: {
    property: 'cursor',
  },
}

export const CustomProps = system(config);
export default CustomProps;