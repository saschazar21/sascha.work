module.exports = [
  {
    code: `
{
  "data": {
    "education": [
      {
        "institution": "University of Applied Sciences Upper Austria",
        "city": "Hagenberg im Mühlkreis",
        "programme": "Interactive Media",
        "start": {
          "month": 10,
          "year": 2015
        },
        "end": {
          "month": 7,
          "year": 2017
        },
        "graduation": "MSc",
        "url": "https://www.fh-ooe.at/en/hagenberg-campus/"
      }
    ],
    "work": [
      {
        "institution": "isiQiri interface technologies GmbH",
        "city": "Hagenberg im Mühlkreis",
        "position": "Junior Software Developer",
        "start": {
          "month": 7,
          "year": 2013
        },
        "end": {
          "month": 1,
          "year": 2015
        },
        "url": "https://www.sticht-technologie.com/"
      }
    ]
  }
}`,
    description:
      'A JSON API v1-conform endpoint, listing experience gained on-the-job and at the university.',
    url: '/experience.json',
    id: 'experience',
  },
  {
    code: `
{
  "version": "https://jsonfeed.org/version/1",
  "title": "The blog title",
  "home_page_url": "https://sascha.work",
  "feed_url": "https://sascha.work/feed.json",
  "items": [
    {
      "id": "/2020/a-blog-post",
      "url": "/2020/a-blog-post",
      "content_text": "This is the content of a blog post in plain text."
    }
  ]
}`,
    description: 'The JSON Feed v1 representation of this blog.',
    url: '/feed.json',
    id: 'feed',
  },
  {
    code: `
{
  "data": [
    {
      "name": "Home",
      "path": "/"
    }
  ]
}`,
    description:
      'A JSON API v1-conform endpoint, listing static URL mappings of the website (excluding dynamically generated blog post URLs).',
    url: '/routes.json',
    id: 'routes',
  },
  {
    code: `
{
  "data": [
    {
      "provider": "twitter",
      "username": "@saschazar",
      "profile": "https://twitter.com/saschazar"
    }
  ]
}`,
    description:
      'A JSON API v1-conform endpoint, listing selected social media account information.',
    url: '/social.json',
    id: 'social',
  },
];
