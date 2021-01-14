const globby = require('globby');
const { dirname, join } = require('path');
const sharp = require('sharp');

const svg2jpg = async () => {
  const svgs = await globby('./out/assets/posts/**/*.svg');
  return Promise.all(
    svgs.map(p =>
      sharp(p)
        .toFormat('jpeg')
        .toFile(join(dirname(p), '/teaser-card.jpg'))
    )
  );
};

module.exports = {
  afterBuild: [svg2jpg],
};
