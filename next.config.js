const withPWA = require('next-pwa')

const options = {
  withPwa: {
    pwa: {
      dest: 'public',
      disable: process.env.NODE_ENV === 'development',
    },
    // dafault caching strategy https://github.com/shadowwalker/next-pwa/blob/master/cache.js
    // https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.RuntimeCachingEntry
    // runtimeCaching: [
    //   {
    //     urlPattern: /^https?.*/,
    //     handler: 'CacheFirst',
    //     options: {
    //       cacheName: 'offlineCache',
    //       expiration: {
    //         maxEntries: 1000,
    //       },
    //     },
    //   },
    // ],
  },
}

module.exports = withPWA(options.withPwa)
