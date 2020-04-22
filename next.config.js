// next.config.js
const withCss = require("@zeit/next-css");

module.exports = withCss({
  cssLoaderOptions: {
    url: false,
  },
  exportTrailingSlash: true,
  exportPathMap: function () {
    return {
      // "/": { page: "/" },
      // "/chart/:id": { page: "/chart/[id]" },
    };
  },
});
