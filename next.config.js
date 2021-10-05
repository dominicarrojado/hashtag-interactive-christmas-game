const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  pageExtensions: ['page.tsx'],
  basePath: '/hashtag-interactive-christmas-game',
  assetPrefix: isProd ? '/hashtag-interactive-christmas-game' : '',
};
