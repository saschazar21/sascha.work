---
layout: posts.njk
eleventyExcludeFromCollections: true
pagination:
  data: collections.tags
  size: 1
  alias: tag
permalink: '/tags/{{ tag | slug }}/'
eleventyComputed:
  current: '{{ tag }}'
  title: 'Tag: {{ tag }}'
---
