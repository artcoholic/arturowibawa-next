const withPWA = require('next-pwa');

module.exports = withPWA({
  async redirects() {
    return [
      {
        source: '/work',
        destination: '/',
        permanent: true,
      }
    ]
  },
  images: {
    domains: ['images.ctfassets.net'],
  },
  reactStrictMode: true,
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US'
  },
  future: {
    webpack5: true,
  },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  }
})