import React from 'react';
import styled from 'styled-components';
import Box from '../../components/Box';
import Text from '../../components/Text';

const Dot = styled(Box)`
  width: 5px;
  height: 5px;
  border-radius:1px;
  flex-shrink: 0;
  transform: rotate(45deg);
  background: ${props => props.theme.colors.content.inverseSecondary};
  margin-bottom: 8px;
`

const Line = styled(Box)`
  width: 1px;
  height: 100%;
  background: ${props => props.theme.colors.content.inverseSecondary};
`

const ExperienceItem = ({ position, date, mt, line, timeline }) => {
  return (
    <Box display="flex" mt={mt ? 8 : 0}>
      < Box flexDirection="column" alignItems="center" mt={10} mr={12} display={timeline === false ? "none" : "flex"}>
        <Dot />
        <Line display={line === false ? "none" : "block"} />
      </Box >
      <Box mb="layout.1/8">
        <Text font="ParagraphSmall" color="content.inverseTertiary">{position}</Text>
        <Text font="ParagraphSmall" color="content.inverseTertiary">{date}</Text>
      </Box>
    </Box >
  )
}

export default ExperienceItem;