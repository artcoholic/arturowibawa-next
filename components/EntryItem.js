import Image from 'next/image';
import Box from './Box';
import Text from './Text';
import Link from "next/link";
import { variants } from './AnimationVariants';
import { motion } from 'framer-motion';

const EntryItem = ({ entry, index }) => {
  const item = entry.fields;
  const thumbnail = item.thumbnail.fields;

  return (
    <Box
      display="flex"
      pr="layout.1"
      as={motion.article}
      variants={variants.entryItem}
    >
      <Box
        width={["50vw"]}
        minWidth={240}
        maxWidth={[320, null, null, null, 400, 600]}
      >
        <Link href={`/work/${item.slug}`}>
          <a style={{ display: 'block', borderRadius: 4, overflow: 'hidden' }}>
            <Image
              src={`http:${thumbnail.image.fields.file.url}`}
              alt={thumbnail.image.fields.description}
              width={4}
              height={5}
              layout="responsive"
              objectFit="cover"
            />
          </a>
        </Link>
        <Text
          as="h1"
          font="ParagraphLarge"
          mt=".5em"
        >
          {thumbnail.title}
        </Text>
      </Box>
      <Text style={{ writingMode: "vertical-rl" }} ml="spacing.2" fontSize={[3, null, null, null, 4]}>
        0{index + 1} — {thumbnail.category}
      </Text>
    </Box >
  )
}

export default EntryItem;