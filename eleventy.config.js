export default async function(eleventyConfig) {
  eleventyConfig.setServerOptions({
      port: 3000,
      watch: ["dist/**/*.js", "dist/**/*.css"],
    });

    eleventyConfig.setUseGitIgnore(false);


  eleventyConfig.addWatchTarget("./dist/*.js");
  eleventyConfig.addWatchTarget("./dist/*.css");

  // tells eleventy to ignore everything except news and _includes
  eleventyConfig.ignores.add("src/!(news|_includes)/**");
  eleventyConfig.ignores.delete("dist/**");

  eleventyConfig.addFilter("postDate", (dateObj) => {
      return dateObj.toLocaleString('en-GB', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
  });
	
  return {
    dir: {
      input: "src",
      output: "dist",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
