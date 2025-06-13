const withTM = require("next-transpile-modules")(["three"]);

export default withTM({
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
  // reactStrictMode: true,
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
});
