const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  released: collection =>
    collection.getFilteredByTag('post').filter(p => !isProd || !p.data.draft)
};
