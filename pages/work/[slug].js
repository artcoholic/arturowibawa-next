import { useState, useEffect } from "react";
import Head from 'next/head';
import VisitButton from '../../components/VisitButton';
import CloseButton from '../../components/CloseButton';
import SlugHeader from '../../components/SlugHeader';
import PreviewLabel from '../../components/PreviewLabel';
import { motion, useViewportScroll } from 'framer-motion';
import { variants } from '../../components/AnimationVariants';
import dynamic from 'next/dynamic';
import { getAllProjectsWithSlug, getProjectAndMoreProjects } from '../../utils/api';

const DynamicContent = dynamic(() => import('../../components/SlugContent'));

export default function WorkSlug({ project, preview, moreProjects }) {
  const { scrollY, scrollYProgress } = useViewportScroll();
  const [hookedYPosition, setHookedYPosition] = useState(0);

  const projectArray = moreProjects;
  const currentIndex = moreProjects.findIndex(x => x.slug === project.slug);
  function getAtIndex(i) {
    if (i === 0) {
      return projectArray[currentIndex];
    } else if (i < 0) {
      return projectArray[(currentIndex + projectArray.length + i) % projectArray.length];
    } else if (i > 0) {
      return projectArray[(currentIndex + i) % projectArray.length];
    }
  }

  useEffect(() => {
    const unsubsribe = scrollY.onChange(y => setHookedYPosition(y));
    return () => {
      unsubsribe();
    }
  }, []);

  return (
    <>
      <Head>
        <title>{project.title} — Arturo Wibawa</title>
      </Head>
      {preview && <PreviewLabel />}
      <CloseButton scrollY={scrollY.current} scrollYProgress={scrollYProgress} path={preview ? '/api/exit-preview' : '/'} />
      <motion.article initial="initial" animate="enter" exit="exit" variants={variants.main}>
        <SlugHeader entry={project} />
        <DynamicContent entry={project} />
      </motion.article>
      {project.info.url && <VisitButton url={project.info.url} scrollY={scrollY.current} entry={project} />}
    </>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getProjectAndMoreProjects(params.slug, preview);

  return {
    props: {
      preview,
      project: data?.project ?? null,
      moreProjects: data?.moreProjects ?? null,
    },
  }
}

export async function getStaticPaths() {
  const allProjects = await getAllProjectsWithSlug();
  return {
    paths: allProjects?.map(({ slug }) => `/work/${slug}`) ?? [],
    fallback: 'blocking',
  }
}
