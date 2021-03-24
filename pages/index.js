import { createClient } from 'contentful';
import EntryList from '../components/EntryList';
import { motion } from 'framer-motion';

const HomePage = ({ data }) => {
  return (
    <motion.main initial="initial" animate="enter" exit="exit">
      <EntryList data={data} />
    </motion.main>
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
