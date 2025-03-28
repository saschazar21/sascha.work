export default {
  purgeEmptyParagraphs(content) {
    return (this.page.outputPath ?? '').endsWith('.html')
      ? content.replace(/<p><\/p>/g, '')
      : content;
  },
};
