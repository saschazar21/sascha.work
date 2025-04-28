import eleventyFetch from '@11ty/eleventy-fetch';

const FEATURED_PROJECTS = [
  'vorchdorf-dot-media/weather',
  'saschazar21/webassembly',
  'saschazar21/jpeg-butcher',
  'saschazar21/esfliegt-esfliegt',
  'saschazar21/go-web-push-server',
  'saschazar21/eleventy-wordpress',
];

const query = `query repository($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    url
    description
    homepageUrl
    languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
      edges {
        node {
          name
          color
        }
        size
      }
    }
    name
    owner {
      login
    }
    pushedAt
    releases(first: 1, orderBy: { field: CREATED_AT, direction: DESC }) {
      nodes {
        tagName
        name
        publishedAt
      }
    }
    stargazerCount
  }
}`;

export default async () =>
  Promise.all(
    FEATURED_PROJECTS.map(async (project) => {
      const [owner, name] = project.split('/');
      const data = await eleventyFetch('https://api.github.com/graphql', {
        duration: '1d',
        fetchOptions: {
          method: 'POST',
          headers: {
            ...(process.env.GITHUB_TOKEN
              ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
              : {}),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables: { owner, name },
          }),
        },
        type: 'json',
      }).catch((error) => {
        console.error('Error fetching projects:', error);
        return [];
      });
      console.log(data.data.repository);
      return data.data.repository;
    }),
  )
    .then((projects) => {
      return projects
        .map((project) => {
          const { languages, ...rest } = project;
          const total = languages.edges.reduce(
            (acc, { size }) => acc + size,
            0,
          );
          return {
            ...rest,
            languages: languages.edges
              .map(({ node, size }) => ({
                ...node,
                size: Math.round((size / total) * 100),
              }))
              .filter((lang) => lang.size > 0),
            owner: project.owner.login,
            release: project.releases.nodes[0],
          };
        })
        .sort((a, b) => new Date(b.pushedAt) - new Date(a.pushedAt));
    })
    .catch((error) => {
      console.error('Error fetching projects:', error);
      return [];
    });
