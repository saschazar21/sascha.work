import { join } from 'path';
import { unlink } from 'fs/promises';
import sharp from 'sharp';

export default {
  'eleventy.after': [
    async ({ directories, runMode, results }) => {
      if (runMode !== 'build') {
        return;
      }

      await Promise.all(
        results.map(async (result) => {
          const assetsImgDir = `./${join(directories.output, 'assets/img')}/`;
          const postDir = `./${join(directories.output, 'posts')}/`;
          if (
            (result.outputPath.startsWith(postDir) ||
              result.outputPath.startsWith(assetsImgDir)) &&
            result.outputPath.endsWith('.svg')
          ) {
            return sharp(result.outputPath)
              .png({ compressionLevel: 9, effort: 10 })
              .resize({ width: 1200 })
              .toFile(result.outputPath.replace('.svg', '.png'))
              .then(() => unlink(result.outputPath));
          }
        }),
      );
    },
  ],
};
