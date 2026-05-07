export default async function(eleventyConfig) {
  eleventyConfig.setServerOptions({
      port: 3000,
    });

    eleventyConfig.setUseGitIgnore(false);


  eleventyConfig.setWatchThrottleWaitTime(100)
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
