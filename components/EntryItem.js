import styled from 'styled-components';
import Image from 'next/image';
import Box from './Box';
import Text from './Text';
import Link from "next/link";
import { variants } from './AnimationVariants';
import { motion } from 'framer-motion';

const AnchorWrapper = styled(Box)`
  display: block;
  border-radius: 4px;
  overflow: hidden;
  background-color: #F0C93E;
  transition: all 500ms ${({ theme }) => theme.ease.Smooth};
  cursor: pointer;
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
      >
        <Link href={`/work/${item.slug}`} passHref>
          <AnchorWrapper
            as={motion.a}
            aria-label={metadata.title}
            title={metadata.title}
            whileTap={{ scale: 1, boxShadow: '0 16px 32px 0 rgba(0,0,0,0)' }}
            whileHover={{ scale: 1.02, backgroundColor: 'rgb(255,255,255)', boxShadow: '0 16px 32px 0 rgba(0,0,0,0.15)' }}
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
        <Text
          as="h1"
          font="ParagraphLarge"
          mt=".5em"
        >
          {metadata.title}
        </Text>
      </Box>
      <Text style={{ writingMode: "vertical-rl" }} ml="spacing.2" fontSize={[3, null, null, null, 4]}>
        0{index + 1} — {metadata.category}
      </Text>
    </Box>
  )
}

export default EntryItem;