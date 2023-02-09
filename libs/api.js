const PROJECT_GRAPHQL_FIELDS = `
title
slug
info {
  tags
  year
  url
}
matrixCollection {
  items {
    __typename
    ... on Media {
      layout
      assetsCollection {
        items {
          title
          url
          contentType
          width
          height
          sys {
            id
          }
        }
      }
      sys {
        id
      }
    }
    ... on Text {
      alignText
      paragraph
      sys {
        id
      }
    }
    ... on Gallery {
      assetsCollection {
        items {
          title
          url
          contentType
          width
          height
          sys {
            id
          }
        }
      }
      sys {
        id
      }
    }
  }
}
`;

const PROJECT_LIST_GRAPHQL_FIELDS = `
... on Project {
  slug
  info {
    title
    image {
      url
      description
    }
    category
  }
}
`;

const ARTICLE_GRAPHQL_FIELDS = `
slug
date
title
content
`;

async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json());
}

// WORK

function extractProject(fetchResponse) {
  return fetchResponse?.data?.projectCollection?.items?.[0];
}
function extractProjectEntries(fetchResponse) {
  return fetchResponse?.data?.listCollection?.items?.[0].itemsCollection?.items;
}

export async function getPreviewProjectBySlug(slug) {
  const entry = await fetchGraphQL(
    `query {
      projectCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${PROJECT_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  );
  return extractProject(entry);
}

export async function getAllProjectsForHome() {
  const entries = await fetchGraphQL(
    `query {
      listCollection(limit: 2, where: {title: "Project List"}) {
        items {
          itemsCollection {
            items {
              ${PROJECT_LIST_GRAPHQL_FIELDS}
            }
          }
        }
      }
    }`
  );
  return extractProjectEntries(entries);
}

export async function getAllProjectsWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      listCollection {
        items {
          itemsCollection {
            items {
              ${PROJECT_LIST_GRAPHQL_FIELDS}
            }
          }
        }
      }
    }`
  );
  return extractProjectEntries(entries);
}

export async function getProjectAndMoreProjects(slug, preview) {
  const entry = await fetchGraphQL(
    `query {
      projectCollection(where: { slug: "${slug}" }, preview: ${
      preview ? "true" : "false"
    }, limit: 1) {
        items {
          ${PROJECT_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  const entries = await fetchGraphQL(
    `query {
      listCollection {
        items {
          itemsCollection {
            items {
              ... on Project {
                title
                slug
              }
            }
          }
        }
      }
    }`,
    preview
  );
  return {
    project: extractProject(entry),
    moreProjects: extractProjectEntries(entries),
  };
}

// BLOG

function extractArticle(fetchResponse) {
  return fetchResponse?.data?.articleCollection?.items?.[0];
}
function extractArticleEntries(fetchResponse) {
  return fetchResponse?.data?.articleCollection?.items;
}

export async function getPreviewArticleBySlug(slug) {
  const entry = await fetchGraphQL(
    `query {
      articleCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${ARTICLE_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  );
  return extractArticle(entry);
}

export async function getAllArticlesForBlog() {
  const entries = await fetchGraphQL(
    `query {
      articleCollection(order: date_DESC) {
        items {
          ${ARTICLE_GRAPHQL_FIELDS}
        }
      }
    }`
  );
  return extractArticleEntries(entries);
}

export async function getAllArticlesWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      articleCollection(where: { slug_exists: true }) {
        items {
          ${ARTICLE_GRAPHQL_FIELDS}
        }
      }
    }`
  );
  return extractArticleEntries(entries);
}

export async function getArticleAndMoreArticles(slug, preview) {
  const entry = await fetchGraphQL(
    `query {
      articleCollection(where: { slug: "${slug}" }, preview: ${
      preview ? "true" : "false"
    }, limit: 1) {
        items {
          ${ARTICLE_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  const entries = await fetchGraphQL(
    `query {
      articleCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
      preview ? "true" : "false"
    }) {
        items {
          ${ARTICLE_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  return {
    article: extractArticle(entry),
    moreArticles: extractArticleEntries(entries),
  };
}

export const sendContactForm = async (data) =>
  fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  });