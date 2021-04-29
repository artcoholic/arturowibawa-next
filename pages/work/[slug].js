import { useState, useEffect } from "react";
import { createClient } from 'contentful';
import Head from 'next/head';
import VisitButton from '../../components/VisitButton';
import CloseButton from '../../components/CloseButton';
import SlugHeader from '../../components/SlugHeader';
import { motion, useViewportScroll } from 'framer-motion';
import { variants } from '../../components/AnimationVariants';
import dynamic from 'next/dynamic';

const DynamicContent = dynamic(() => import('../../components/SlugContent'));

export default function Slug({ entry }) {
  const metadata = entry.fields.info.fields;

  const [hookedYPosition, setHookedYPosition] = useState(0);
  const { scrollY, scrollYProgress } = useViewportScroll();

  useEffect(() => {
    scrollY.onChange(y => setHookedYPosition(y));
    return () => {
      setHookedYPosition(0);
    }
  }, [scrollY]);

  return (
    <>
      <Head>
        <title>{entry.fields.title} — Arturo Wibawa</title>
      </Head>
      <CloseButton hookedYPosition={hookedYPosition} scrollYProgress={scrollYProgress} path={'/'} />
      <motion.article initial="initial" animate="enter" exit="exit" variants={variants.main}>
        <SlugHeader entry={entry} />
        <DynamicContent entry={entry} />
      </motion.article>
      {metadata.url && <VisitButton url={metadata.url} hookedYPosition={hookedYPosition} entry={entry} />}
    </>
  )
}

export async function getStaticProps(context) {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })

  const result = await client
    .getEntries({
      content_type: 'project',
      'fields.slug': context.params.slug,
    })
    .then((response) => response.items);

  const entry = result.pop();

  if (!entry) {
    return { props: {} }
  }

  return {
    props: {
      entry,
    },
  }
}

export async function getStaticPaths() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })
  const entries = await client
    .getEntries({ content_type: 'project' })
    .then((response) => response.items)

  const paths = entries.map(({ fields: { slug } }) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  }
}
