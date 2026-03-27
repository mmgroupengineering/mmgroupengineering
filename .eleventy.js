module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("static");
  eleventyConfig.addPassthroughCopy("CNAME");

  eleventyConfig.addShortcode("year", () => String(new Date().getFullYear()));

  return {
    // Root-hosted site (custom domain or username.github.io). For project pages use "/repo-name/"
    pathPrefix: "/",
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
};
