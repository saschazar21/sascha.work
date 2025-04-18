---
layout: posts.njk
eleventyExcludeFromCollections: true
pagination:
  data: collections.published
  size: 5
  alias: entries
permalink: '/blog/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber + 1 }}/{% endif %}'
title: Blog
---
