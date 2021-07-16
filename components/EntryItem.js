import styled from 'styled-components';
import Image from 'next/image';
import Box from './Box';
import Text from './Text';
import Link from "next/link";
import { variants, eyeLid, eyeBall } from './AnimationVariants';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const AnchorWrapper = styled(Box)`
  display: block;
  border-radius: 8px;
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
    padding: 16px;
    border-radius: 50%;
    transform: scale(0);
    transition: transform 300ms ${props => props.theme.ease.Smooth};
    border: 1px solid ${props => props.theme.colors.content.inverseSecondary};
    svg {
      stroke: #1B1C32;
      display: block;
    }
    #eye-lid {
      transform-origin: center;
      animation: ${eyeLid} 1500ms infinite alternate-reverse;
    }
    #eye-ball {
      animation: ${eyeBall} 1500ms infinite alternate-reverse;
    }
  }
`

const EntryItem = ({ entry, index }) => {
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
        <Tilt tiltReverse={true} scale={1.05} glareEnable={true} glareBorderRadius="8px" tiltMaxAngleX={4} tiltMaxAngleY={4} transitionEasing="cubic-bezier(.23,1,.32,1)" transitionSpeed={300} style={{ zIndex: 2, position: 'relative', transformStyle: 'preserve-3d' }}>
          <Link href={`/work/${entry.slug}`} passHref>
            <AnchorWrapper
              as="a"
              aria-label={entry.info.title}
            >
              <Image
                src={entry.info.image.url}
                alt={entry.info.title}
                width={40}
                height={50}
                layout="responsive"
                placeholder="blur"
                blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                sizes="(max-width: 600px) 48vw, (max-width: 1023px) 96vw"
              />
            </AnchorWrapper>
          </Link>
          <IconWrapper className="icon-wrapper">
            <span>
              <svg width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="eye-lid" d="M21.257 10.962C21.731 11.582 21.731 12.419 21.257 13.038C19.764 14.987 16.182 19 12 19C7.81801 19 4.23601 14.987 2.74301 13.038C2.51239 12.7411 2.38721 12.3759 2.38721 12C2.38721 11.6241 2.51239 11.2589 2.74301 10.962C4.23601 9.013 7.81801 5 12 5C16.182 5 19.764 9.013 21.257 10.962V10.962Z" vectorEffect="non-scaling-stroke" />
                <path id="eye-ball" d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" />
              </svg>
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
          {entry.info.title}
        </Text>
      </Box>
      <Text style={{ writingMode: "vertical-rl", zIndex: 1, textTransform: 'uppercase' }} ml="spacing.2" letterSpacing={1} fontSize={[3, null, null, null, 4]}>
        0{index + 1} • {entry.info.category}
      </Text>
    </Box>
  )
}

export default EntryItem;