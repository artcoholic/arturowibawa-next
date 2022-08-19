import { styled } from "../stitches.config";
import Box from "./Box";
import Text from "./Text";
import { motion } from "framer-motion";
import { variants } from "./AnimationVariants";

const Line = styled(Box, {
  height: 1,
  background: "$fg_primary",
  width: "100%",
});

const ProjectTitle = styled(Text, {
  textAlign: "center",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  typeScale: "$headingSmall",
  pb: "$0_5",
  "@bp1": { typeScale: "$headingMedium" },
  "@bp2": { typeScale: "$headingLarge" },
  "@bp3": { pb: "$0_125" },
});

const SlugHeader = ({ entry }) => {
  // console.log('SlugHeader');
  return (
    <Box
      css={{
        width: "100%",
        p: "$1",
      }}
    >
      <Box style={{ clipPath: "inset(0%)" }}>
        <ProjectTitle as={motion.h1} variants={variants.slugTitle}>
          {entry.title}
        </ProjectTitle>
      </Box>
      <Line
        as={motion.div}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          type: "spring",
          damping: 20,
        }}
      />
      <Box
        css={{
          columns: "1/-1",
          pt: "$0_5",
          display: "flex",
          justifyContent: "space-between",
          clipPath: "inset(0%)",
        }}
      >
        {entry.info.tags && (
          <Text
            as={motion.h2}
            css={{
              mr: 12,
              fontSize: 12,
              "@bp1": { fontSize: 16 },
            }}
            variants={variants.slugStats}
          >
            {entry.info.tags.join(", ")}
          </Text>
        )}
        {entry.info.year && (
          <Text
            as={motion.h2}
            variants={variants.slugStats}
            css={{
              fontSize: 12,
              "@bp1": { fontSize: 16 },
            }}
          >
            {entry.info.year}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default SlugHeader;
