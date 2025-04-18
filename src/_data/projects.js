const fetch = require('node-fetch');

const featured = [
  'vorchdorf-dot-media/shorts',
  'vorchdorf-dot-media/weather',
  'vorchdorf-dot-media/image-compressor',
  'saschazar21/webassembly',
];

const fetchRepo = async (repo) => {
  const authorization = process.env.GITHUB_TOKEN && {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
  };
  const res = await fetch(`https://api.github.com/repos/${repo}`, {
    method: 'GET',
    headers: {
      accept: 'application/vnd.github.v3+json',
      ...(authorization || {}),
    },
  });

  return res.json();
};

module.exports = async () => Promise.all(featured.map(fetchRepo));
