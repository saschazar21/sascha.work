export default {
  eleventyComputed: {
    breadcrumbs(data) {
      return '/blog/' + data.page.title;
    },
    date(data) {
      const slug = data.page.fileSlug;
      const match = slug.match(/(\d{4})-(\d{2})-(\d{2})_(.*)/);
      if (match) {
        const [, year, month, day] = match;
        return new Date(`${year}-${month}-${day}`);
      }
      return undefined;
    },
  },
  layout: 'post.njk',
  permalink: '/posts/{{ page.fileSlug | stripdate }}/index.html',
  tags: ['post'],
};
