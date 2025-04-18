export default {
  commit: process.env.SHORT_SHA,
  production: process.env.CONTEXT === 'production',
  url:
    process.env.CONTEXT === 'production'
      ? process.env.URL
      : process.env.DEPLOY_URL || 'http://localhost:8080',
};
