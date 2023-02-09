import {
  getPreviewArticleBySlug,
  getPreviewProjectBySlug,
} from "../../libs/api";

export default async function preview(req, res) {
  const { secret, slug } = req.query;

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !slug) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  const project = await getPreviewProjectBySlug(slug);
  const article = await getPreviewArticleBySlug(slug);

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!project && !article) {
    return res.status(401).json({ message: "Invalid slug" });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  const url = project ? `/work/${project.slug}` : `/blog/${article.slug}`;
  res.write(
    `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${url}" />
    <script>window.location.href = '${url}'</script>
    </head>`
  );
  res.end();
}
