const isProd = process.env.NODE_ENV === 'production';

const publicPosts = collection =>
  collection.getFilteredByTag('post').filter(p => !isProd || p.data.public);

module.exports = {
  public: publicPosts,
  tags: collection =>
    Array.from(
      publicPosts(collection)
        .reduce((map, current) => {
          current.data.tags.forEach(
            tag =>
              tag !== 'post' &&
              map.set(tag, [].concat(map.get(tag) || [], [current]))
          );
          return map;
        }, new Map())
        .entries()
    )
};
