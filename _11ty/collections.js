module.exports = {
  released: collection =>
    collection.getFilteredByTag('post').filter(p => !p.data.draft)
};
