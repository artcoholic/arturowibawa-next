import { styled } from "../config/stitches.config";
import MenuItem from "./MenuItem";
import Box from "./Box";
import Text from "./Text";
import SocialLink from "./SocialLink";
import { variants } from "./AnimationVariants";
import { motion } from "framer-motion";
import {
  LinkedinFill,
  CodepenFill,
  TwitterFill,
  OctocatFill,
} from "akar-icons";

const MenuContainer = ({ open, setOpen }) => {
  // console.log('MenuContainer');
  return (
    <Container
      as={motion.nav}
      initial={false}
      animate={open ? "open" : "closed"}
      variants={variants.menuContainer}
      key="menu"
    >
      <Logo as="svg" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M27.47 23.406L20.083 3.064A1.656 1.656 0 0 0 18.517 2H6.493c-.389 0-.603.348-.464.712l.88 2.466c.74 2.27 1.026 3.148 1.02 4.025-.004.554-.125 1.107-.322 2.01-.018.085-.04.17-.064.256-.018.067-.036.135-.052.205a2.8 2.8 0 0 0 .097 1.582l5.936 16.156c.097.28.374.588.749.588H31.75c.18 0 .291-.168.236-.336l-.658-1.77a.746.746 0 0 0-.707-.504h-.014c-1.348 0-2.042-1.113-3.138-3.984zM6.26 21.152a.398.398 0 0 0-.749 0l-.41 1.078v-.001c-1.67 4.366-2.319 5.16-3.71 5.16H1.38a.746.746 0 0 0-.707.505l-.658 1.77C-.04 29.832.07 30 .25 30h8.627c.277 0 .472-.294.375-.56L6.26 21.152z"></path>
      </Logo>
      <MenuItem
        key="1"
        path="/"
        setOpen={setOpen}
        index={1}
        title="Work"
        keyword_1="Product"
        keyword_2="Web Design"
        keyword_3="User Interface"
        keyword_4="work"
      />
      <MenuItem
        key="2"
        path="/about"
        setOpen={setOpen}
        index={2}
        title="About Me"
        keyword_1="Blog"
        keyword_2="Writing"
        keyword_3="Ideas"
        keyword_4="thoughts"
      />
      <MenuItem
        key="3"
        path="/contact"
        setOpen={setOpen}
        index={3}
        title="Contact"
        keyword_1="About"
        keyword_2="Contact"
        keyword_3="History"
        keyword_4="profile"
      />
      <Box
        css={{
          display: "flex",
          flexFlow: "row",
          px: "$1",
          py: "$1",
          borderTop: "1px solid",
          borderColor: "$fg_inversePrimary",
          bg: "$bg_inversePrimary",
          justifyContent: "space-between",
          alignItems: "center",
          "@bp3": { py: "$0_5" },
        }}
      >
        <Box
          css={{
            display: "flex",
            flexFlow: "row",
          }}
        >
          <SocialLink
            href="https://www.linkedin.com/in/arturowibawa/"
            title="LinkedIn"
          >
            <LinkedinFill size={16} />
          </SocialLink>
          <SocialLink href="https://twitter.com/agwibawa" title="Twitter">
            <TwitterFill size={16} />
          </SocialLink>
          <SocialLink href="https://github.com/artcoholic/" title="Github">
            <OctocatFill size={16} />
          </SocialLink>
          <SocialLink href="https://codepen.io/artcoholic" title="Codepen">
            <CodepenFill size={16} />
          </SocialLink>
        </Box>
        <Text css={{ color: "$fg_tertiary" }}>
          © {new Date().getFullYear()}
        </Text>
        {/* <Button onClick={toggler} aria-label="Theme Toggle">
          <span className="tooltip">
            Change theme
          </span>
          <Water size={12} /> {theme}
        </Button> */}
      </Box>
    </Container>
  );
};

export default MenuContainer;

const Container = styled("div", {
  pointerEvents: "auto",
  width: "100vw",
  height: "100vh",
  maxHeight: "-webkit-fill-available",
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  top: 0,
  left: 0,
  zIndex: 99,
  bg: "$bg_inversePrimary",
});

const Button = styled("button", {
  padding: ".5rem .75rem",
  border: "none",
  borderRadius: 4,
  bg: "$bg_primary",
  color: "$fg_inverseTertiary",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  position: "relative",
  transition: "all 300ms $ease$button",
  svg: {
    display: "block",
    color: "$fg_inverseTertiary",
    fill: "$fg_inverseTertiary",
  },
  "&:hover": {
    bg: "$bg_secondary",
    ".tooltip": {
      opacity: 1,
      transform: "translateY(-12px)",
    },
  },
  ".tooltip": {
    position: "absolute",
    bg: "$bg_primary",
    color: "$fg_inverseTertiary",
    textAlign: "center",
    borderRadius: 4,
    fontSize: 12,
    opacity: 0,
    top: -28,
    padding: ".5rem .75rem",
    whiteSpace: "nowrap",
    pointerEvents: "none",
    boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
    transition: "all 300ms $ease$button",
    "&::after": {
      content: "",
      position: "absolute",
      top: "100%",
      left: "50%",
      ml: -4,
      borderWidth: 4,
      borderStyle: "solid",
      borderColor: "$bg_primary transparent transparent transparent",
    },
  },
});

const Logo = styled("div", {
  fill: "$fb_inversePrimary",
  width: "2rem",
  top: "$1",
  left: "$1",
  position: "absolute",
});
