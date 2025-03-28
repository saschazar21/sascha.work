export default {
  eleventyComputed: {
    entries(data) {
      return data.collections.published.filter(
        (post) => data.tag && post.data.tags.includes(data.tag),
      );
    },
  },
};
