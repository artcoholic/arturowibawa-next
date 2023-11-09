import { styled } from "../config/stitches.config";
import Box from "./Box";

const Wrapper = styled(Box, {
  padding: 8,
  transition: "all 150ms $ease$button",
  background: "$fg_secondary",
  borderRadius: "50%",
  marginRight: ".75rem",
  color: "$fg_primary",
  "&:hover": {
    color: "$fg_inverseTertiary",
    background: "$bg_primary",
  },
  svg: {
    display: "block",
  },
  "&:after": {
    display: "none",
  },
});

const SocialLink = ({ href, children, color, title }) => {
  // console.log('SocialLink');
  return (
    <Wrapper
      as="a"
      href={href}
      target="_blank"
      rel="noopener"
      title={title}
      data-umami-event={`${title}-button`}
    >
      {children}
    </Wrapper>
  );
};

export default SocialLink;
