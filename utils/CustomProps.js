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
  hoverbg: {
    property: 'background-color',
    scale: 'colors',
  },
  hovercolor: {
    property: 'color',
    scale: 'colors',
  },
}

export const CustomProps = system(config);
export default CustomProps;