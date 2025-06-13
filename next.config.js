const withTM = require("next-transpile-modules")([
  "three",
  "framer-motion-3d",
  "@react-three/fiber",
]);

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/work",
        destination: "/",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["images.ctfassets.net"],
  },
  reactStrictMode: true,
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
};

module.exports = withTM(nextConfig);
