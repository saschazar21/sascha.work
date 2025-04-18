---
layout: default.njk
eleventyExcludeFromCollections: true
permalink: '/tags/'
title: Tags
---

{% css "tags" %}
:where([data-tags]) {
display: flex;
flex-wrap: wrap;
justify-content: center;
gap: var(--space-lg);
list-style: none;
padding: 0;
}

:where([data-tag]) {
padding: var(--space-sm) var(--space-lg);
padding-left: calc(var(--space-lg) + 1ch);
font-size: var(--font-size-h3);
}

:where([data-tag])::after {
font-size: inherit;
left: var(--space-md);
}
{% endcss %}

<style data-helmet="tags">
  {% getBundle "css", "tags" %}
</style>

# Tags

<ul data-tags>
{% for tag in collections.tags | sort %}
  <li>
    <a href="/tags/{{ tag | slugify }}" data-tag>{{ tag | slugify }}</a>
  </li>
{% endfor %}
</ul>
