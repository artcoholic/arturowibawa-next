import { Suspense, useState, useRef } from "react";
import { styled } from "../config/stitches.config";
import Head from "next/head";
import Box from "../components/Box";
import Grid from "../components/Grid";
import Text from "../components/Text";
import GradientBox from "../components/GradientBox";
import {
  motion,
  useScroll,
  MotionConfig,
  AnimatePresence,
} from "framer-motion";
import { variants } from "../components/AnimationVariants";
import { Canvas } from "@react-three/fiber";
import { Dodecahedron, Torus, Lights, transition } from "../components/Objects";
import SocialItem from "./about/SocialItem";
import {
  TwitterFill,
  LinkedinFill,
  GithubFill,
  CodepenFill,
  DribbbleFill,
  Send,
} from "akar-icons";
import { sendContactForm } from "../libs/api";
import useAutosizeTextArea from "../libs/useAutoSizeTextArea";

const initValues = { name: "", email: "", message: "" };
const initState = { values: initValues };

const ContactPage = () => {
  const { scrollYProgress } = useScroll();
  const [state, setState] = useState(initState);
  const [touched, setTouched] = useState({});
  const [success, setSuccess] = useState(false);

  const { values, isLoading, error } = state;

  const textareaRef = useRef(null);
  useAutosizeTextArea(textareaRef.current, values.message);

  const onBlur = ({ target }) =>
    setTouched((prev) => ({
      ...prev,
      [target.name]: true,
    }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));

    try {
      await sendContactForm(values);
      setState(initState);
      setTouched({});
      setSuccess(true);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
    }
  };

  const handleChange = ({ target }) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

  const validateEmail = (email) => {
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  };

  return (
    <>
      <Head>
        <title>Contact — Arturo Wibawa</title>
      </Head>
      <Box
        css={{
          position: "fixed",
          width: "50%",
          height: "100%",
          display: "none",
          "@bp3": { display: "flex" },
          justifyContent: "center",
          alignItems: "center",
          right: 0,
        }}
        as={motion.section}
        exit={{ opacity: 0 }}
      >
        <Suspense fallback={<span>loading...</span>}>
          <Canvas>
            <MotionConfig transition={transition}>
              <Lights />
              <Dodecahedron scrollYProgress={scrollYProgress} />
              <Torus />
            </MotionConfig>
          </Canvas>
        </Suspense>
      </Box>
      <Grid
        css={{
          mx: "$1",
          pt: "$2",
          "@bp3": { pt: 0 },
          pb: "$2",
        }}
        as={motion.section}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={variants.main}
      >
        <Box
          css={{
            position: "fixed",
            top: 0,
            left: "calc($2 + 32px)",
            height: "100%",
            width: 1,
            bg: "$bg_placeholder",
            display: "none",
            "@bp3": { display: "block" },
          }}
        />
        <Box
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gridColumn: "-1/1",
            justifyContent: "center",
            height: "auto",
            mt: "$4",
            mb: "$2",
            "@bp1": { gridColumn: "1/span 4" },
            "@bp2": { gridColumn: "2/span 6" },
            "@bp3": {
              gridColumn: "2/span 5",
              height: "100vh",
              mt: 0,
              mb: -200,
            },
          }}
          as={motion.div}
          variants={variants.trigger}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Text
            as="h1"
            css={{
              mb: "$0_5",
              typeScale: "$display",
              "@bp3": { typeScale: "$headingLarge" },
            }}
          >
            Say hello
          </Text>
          <Text
            as="p"
            css={{
              color: "$fg_inverseTertiary",
              typeScale: "$paragraphMedium",
              "@bp4": { typeScale: "$paragraphLarge" },
            }}
          >
            Don&apos;t hesitate to give me a shout on potential projects,
            collaboration, or just to say hi.
          </Text>
        </Box>

        <Box
          as={motion.form}
          autoComplete="off"
          variants={variants.trigger}
          initial="offscreen"
          whileInView="onscreen"
          css={{
            gridColumn: "-1/1",
            "@bp1": { gridColumn: "1/span 4" },
            "@bp2": { gridColumn: "2/span 6" },
            "@bp3": { gridColumn: "2/span 5" },
            mb: "$2",
          }}
        >
          <FormControl isInvalid={touched.name && !values.name}>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={values.name}
              onChange={handleChange}
              onBlur={onBlur}
            />
            <Text className="error-message">Please fill your name</Text>
          </FormControl>
          <FormControl
            isInvalid={
              (touched.email && !values.email) ||
              (!validateEmail(values.email) && touched.email)
            }
          >
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={values.email}
              onChange={handleChange}
              onBlur={onBlur}
            />
            <Text className="error-message">
              {!validateEmail(values.email) && values.email
                ? "That email looks a bit weird"
                : !values.email
                ? "Please fill your email"
                : "Please fill your email"}
            </Text>
          </FormControl>
          <FormControl isInvalid={touched.message && !values.message}>
            <textarea
              type="text"
              name="message"
              placeholder="Leave a message"
              rows={1}
              value={values.message}
              onChange={handleChange}
              onBlur={onBlur}
              ref={textareaRef}
              style={{
                resize: "none",
                overflow: "hidden",
                overflowWrap: "break-word",
              }}
            />
            <Text className="error-message">Please leave me a message</Text>
          </FormControl>
          <FormSubmitButton
            as="button"
            disabled={!values.name || !values.email || !values.message}
            onClick={onSubmit}
          >
            {isLoading ? "Loading..." : "Submit"}
          </FormSubmitButton>
        </Box>

        <Box
          as={motion.div}
          variants={variants.trigger}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.1 }}
          css={{
            gridColumn: "-1/1",
            "@bp1": { gridColumn: "1/span 4" },
            "@bp2": { gridColumn: "2/span 6" },
            "@bp3": { gridColumn: "2/span 5" },
          }}
        >
          <Text
            as="h2"
            css={{
              mb: "1rem",
              font: "$headingSmall",
              color: "$fg_inverseSecondary",
            }}
          >
            Connect
          </Text>
          <List as="ul">
            <SocialItem
              icon={<Send size={20} />}
              label="Email"
              social="agwibawa@gmail.com"
              href="mailto:agwibawa@gmail.com"
            />
            <SocialItem
              icon={<TwitterFill size={20} />}
              label="Twitter"
              social="@agwibawa"
              href="https://twitter.com/agwibawa"
            />
            <SocialItem
              icon={<LinkedinFill size={20} />}
              label="LinkedIn"
              social="@arturowibawa"
              href="https://www.linkedin.com/in/arturowibawa/"
            />
            <SocialItem
              icon={<GithubFill size={20} />}
              label="Github"
              social="@artcoholic"
              href="https://github.com/artcoholic/"
            />
            <SocialItem
              icon={<CodepenFill size={20} />}
              label="CodePen"
              social="@artcoholic"
              href="https://codepen.io/artcoholic"
            />
            <SocialItem
              icon={<DribbbleFill size={20} />}
              label="Dribbble"
              social="@artcoholic"
              href="https://dribbble.com/artcoholic"
            />
          </List>
        </Box>
      </Grid>
      <GradientBox />
      <AnimatePresence>
        {success ? (
          <Toast setSuccess={setSuccess} success={success} color="positive" />
        ) : error ? (
          <Toast error={error} color="negative" />
        ) : null}
      </AnimatePresence>
    </>
  );
};

const Toast = ({ setSuccess, color, error, success }) => {
  if (success) {
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  }
  return (
    <ToastContainer
      as={motion.div}
      color={color}
      initial={{ y: "200%" }}
      animate={{ y: 0 }}
      exit={{ y: "200%" }}
    >
      <Text
        css={{
          display: "flex",
          alignItems: "center",
          typeScale: "$paragraphMedium",
          gap: 16,
        }}
      >
        <Send />
        {success ? "Message sent" : error ? error : null}
      </Text>
    </ToastContainer>
  );
};

export default ContactPage;

const List = styled(Text, {
  padding: 0,
  listStyle: "none",
  typeScale: "$paragraphMedium",
  color: "$fg_inverseTertiary",
});

const FormControl = styled(Box, {
  display: "flex",
  flexDirection: "column",
  mb: "$0_5",

  "input, textarea": {
    padding: "1rem 0",
    fontSize: "1.25rem",
    color: "$fg_inverseTertiary",
    border: "none",
    bg: "none",
    borderBottom: "1px solid $colors$bg_secondary",
    typeScale: "$paragraphLarge",
    transition: "border-color 500ms $ease$smooth",
    outline: "none",

    "&:focus": {
      borderBottom: "1px solid $colors$fg_primary",
    },

    "&::placeholder": {
      color: "$fg_inverseSecondary",
    },
  },

  variants: {
    isInvalid: {
      true: {
        "input, textarea, input:focus, textarea:focus": {
          borderBottom: "1px solid IndianRed",
        },
        ".error-message": {
          visibility: "visible",
        },
      },
      false: {
        "input, textarea": {
          outline: "none",
        },
        ".error-message": {
          visibility: "hidden",
        },
      },
    },
    emailInvalid: {
      true: {
        ".invalid-message": {
          visibility: "visible",
        },
      },
      false: {
        ".invalid-message": {
          visibility: "hidden",
        },
      },
    },
  },

  ".label-wrapper": {
    mb: ".5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
  },

  ".error-message, .invalid-message": {
    color: "IndianRed",
    fontSize: "1rem",
    visibility: "hidden",
    mt: "1em",
  },
});

const FormSubmitButton = styled(Box, {
  borderRadius: 32,
  bg: "none",
  border: "1px solid $colors$fg_secondary",
  color: "$fg_primary",
  p: "1rem 2rem",
  typeScale: "$paragraphMedium",
  cursor: "pointer",
  mt: "$0_25",
  transition: "all 500ms $ease$smooth",

  "&:disabled, &:disabled:hover": {
    backgroundColor: "rgba(255,255,255,0.05)",
    border: "1px solid $colors$fg_inverseSecondary",
    color: "$fg_inverseSecondary",
    cursor: "not-allowed",
  },
  "&:hover": {
    backgroundColor: "$fg_primary",
    color: "$fg_inversePrimary",
    borderColor: "$fg_primary",
  },
});

const ToastContainer = styled(Box, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  bottom: "$1",
  right: "$1",
  p: "1em 1.5em",
  borderRadius: 8,

  variants: {
    color: {
      positive: {
        bg: "ForestGreen",
        "p, svg": {
          color: "GreenYellow",
        },
      },
      negative: {
        bg: "Crimson",
        "p, svg": {
          color: "Pink",
        },
      },
    },
  },
});
