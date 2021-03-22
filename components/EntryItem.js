import Image from 'next/image';
import Box from './Box';
import Text from './Text';
import Link from "next/link";
import { variants } from './AnimationVariants';
import { motion } from 'framer-motion';

const EntryItem = ({ entry, index }) => {
  const item = entry.fields;
  const metadata = item.info.fields;

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
              src={`http:${metadata.image.fields.file.url}`}
              alt={metadata.image.fields.description}
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
          {metadata.title}
        </Text>
      </Box>
      <Text style={{ writingMode: "vertical-rl" }} ml="spacing.2" fontSize={[3, null, null, null, 4]}>
        0{index + 1} — {metadata.category}
      </Text>
    </Box >
  )
}

export default EntryItem;