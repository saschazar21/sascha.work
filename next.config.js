/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const withMDXExtended = require('@saschazar/next-mdx-extended')();

module.exports = withMDXExtended({
  pageExtensions: ['tsx', 'ts', 'mdx', 'md']
});
