export default {
  purgeEmptyParagraphs(content) {
    return (this.page.outputPath ?? '').endsWith('.html')
      ? content.replace(/\s*<p><\/p>\s*/g, '').replace(/\s*\n\s*\n\s*/g, '')
      : content;
  },
};
