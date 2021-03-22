import styled from 'styled-components';
import { createClient } from 'contentful';
import Layout from '../components/Layout';
import Text from '../components/Text';
import EntryList from '../components/EntryList';
import Box from '../components/Box';
import { motion } from 'framer-motion';

const NameWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  height: 32px;
  left: 50%;
  transform: translateX(-50%);
  perspective: 180px;
`

const Name = styled(Text)`
  text-transform: uppercase;
  line-height: 1em;
  text-align: center;
  letter-spacing: 1px;
`

const TopName = {
  initial: {
    y: "1em",
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 100,
      mass: 10,
      delay: 1,
    }
  },
  exit: {
    opacity: 0,
  }
}

const HomePage = ({ data }) => {
  return (
    <>
      <Layout>
        <NameWrapper
          top="layout.1"
          as={motion.div}
        >
          <Name fontSize={3} pt={2} as={motion.span} variants={TopName}>Arturo • Wibawa</Name>
        </NameWrapper>
        <EntryList data={data} />
      </Layout>
    </>
  )
};

export async function getStaticProps() {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    removeUnresolved: true,
  })

  const data = await client
    .getEntries({
      content_type: 'projectList',
      include: 10,
    })
    .then((response) => response.items)

  return {
    props: {
      data,
    },
  }
}

export default HomePage;
