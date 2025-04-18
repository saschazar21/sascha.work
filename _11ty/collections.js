export default {
  published: (collections) =>
    collections
      .getFilteredByTag('post')
      .filter(
        (post) => process.env.CONTEXT !== 'production' || post.data.public,
      )
      .reverse(),
  tags: (collections) => {
    const tags = new Set();
    collections.getAll().forEach((item) => {
      if ('tags' in item.data) {
        item.data.tags.forEach((tag) => tag !== 'post' && tags.add(tag));
      }
    });
    return [...tags];
  },
};
