export default {
  purgeEmptyParagraphs(content) {
    return (this.page.outputPath ?? '').endsWith('.html')
      ? content
          .trim()
          .replace(/\s*<p><\/p>\s*/g, '')
          .replace(/\s*\n\s*\n\s*/g, '')
      : content.trim();
  },
};
