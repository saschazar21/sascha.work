const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  public: collection =>
    collection.getFilteredByTag('post').filter(p => !isProd || p.data.public)
};
