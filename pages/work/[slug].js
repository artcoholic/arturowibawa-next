import Head from "next/head";
import ProjectSlugUI from "../../components/ProjectSlugUI";
import CloseButton from "../../components/CloseButton";
import SlugHeader from "../../components/SlugHeader";
import SlugContent from "../../components/SlugContent";
import PreviewLabel from "../../components/PreviewLabel";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { variants } from "../../components/AnimationVariants";
import {
  getAllProjectsWithSlug,
  getProjectAndMoreProjects,
} from "../../utils/api";

export default function WorkSlug({ project, preview, moreProjects }) {
  const { scrollYProgress } = useScroll();

  const projectArray = moreProjects;
  const currentIndex = moreProjects.findIndex((x) => x.slug === project.slug);
  function getAtIndex(i) {
    if (i === 0) {
      return projectArray[currentIndex];
    } else if (i < 0) {
      return projectArray[
        (currentIndex + projectArray.length + i) % projectArray.length
      ];
    } else if (i > 0) {
      return projectArray[(currentIndex + i) % projectArray.length];
    }
  }

  return (
    <>
      <Head>
        <title>{`${project.title} — Arturo Wibawa`}</title>
      </Head>
      {preview && <PreviewLabel />}
      <CloseButton
        scrollYProgress={scrollYProgress}
        path={preview ? "/api/exit-preview" : "/"}
      />
      <motion.article
        variants={variants.main}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={project.slug}
            variants={variants.main}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <SlugHeader entry={project} />
            <SlugContent entry={project} />
          </motion.div>
        </AnimatePresence>
      </motion.article>
      <ProjectSlugUI
        prevUrl={getAtIndex(-1).slug}
        nextUrl={getAtIndex(1).slug}
        entry={project}
      />
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getProjectAndMoreProjects(params.slug, preview);

  return {
    props: {
      preview,
      project: data?.project ?? null,
      moreProjects: data?.moreProjects ?? null,
    },
  };
}

export async function getStaticPaths() {
  const allProjects = await getAllProjectsWithSlug();
  return {
    paths: allProjects?.map(({ slug }) => `/work/${slug}`) ?? [],
    fallback: "blocking",
  };
}
