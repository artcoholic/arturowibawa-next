import styled from 'styled-components';
import Image from 'next/image';
import Box from './Box';
import Text from './Text';
import Link from "next/link";
import { variants } from './AnimationVariants';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { EyeOpen } from 'akar-icons';

const AnchorWrapper = styled(Box)`
  display: block;
  border-radius: 4px;
  overflow: hidden;
  background-color: ${props => props.theme.colors.bg.placeholder};
  transition: all 300ms ${props => props.theme.ease.Smooth};
  &:hover {
    background-color: ${props => props.theme.colors.bg.entryCard};
    box-shadow:0 16px 32px 0 ${props => props.theme.colors.bg.boxShadow};
    ~.icon-wrapper span {
      transform: scale(1);
    }
  }
`

const IconWrapper = styled(Box)`
  position: absolute;
  top: 0;
  transform: translateZ(120px);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  span {
    background: white;
    padding: 12px;
    border-radius: 50%;
    transform: scale(0);
    transition: transform 300ms ${props => props.theme.ease.Smooth};
  }
`

const EntryItem = ({ entry, index }) => {
  const item = entry.fields;
  const metadata = item.info.fields;

  return (
    <Box
      display="flex"
      as={motion.article}
      variants={variants.entryItem}
      placeSelf="center"
      pr="layout.1"
    >
      <Box
        width={["50vw"]}
        minWidth={240}
        maxWidth={[320, null, null, null, 400, 600]}
        style={{ zIndex: 5 }}
      >
        <Tilt tiltReverse={true} scale={1.05} glareEnable={true} tiltMaxAngleX={4} tiltMaxAngleY={4} transitionEasing="cubic-bezier(.23,1,.32,1)" transitionSpeed={300} style={{ zIndex: 2, position: 'relative', transformStyle: 'preserve-3d' }}>
          <Link href={`/work/${item.slug}`} passHref>
            <AnchorWrapper
              as="a"
              aria-label={metadata.title}
              title={metadata.title}
            >
              <Image
                src={`http:${metadata.image.fields.file.url}`}
                alt={metadata.image.fields.description}
                width={4}
                height={5}
                layout="responsive"
                objectFit="cover"
              />
            </AnchorWrapper>
          </Link>
          <IconWrapper className="icon-wrapper">
            <span>
              <EyeOpen />
            </span>
          </IconWrapper>
        </Tilt>
        <Text
          as="h1"
          font="ParagraphLarge"
          mt=".5em"
          style={{
            zIndex: 1,
          }}
        >
          {metadata.title}
        </Text>
      </Box>
      <Text style={{ writingMode: "vertical-rl", zIndex: 1 }} ml="spacing.2" fontSize={[3, null, null, null, 4]}>
        0{index + 1} — {metadata.category}
      </Text>
    </Box>
  )
}

export default EntryItem;