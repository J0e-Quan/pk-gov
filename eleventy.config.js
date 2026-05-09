import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";


export default async function(eleventyConfig) {
  eleventyConfig.setServerOptions({
      port: 3000,
      watch: ["dist/**/*.js", "dist/**/*.css"],
    });

    eleventyConfig.setUseGitIgnore(false);
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ['webp'],
    widths: ["auto"],
  });


  eleventyConfig.addWatchTarget("./dist/*.js");
  eleventyConfig.addWatchTarget("./dist/*.css");

  // tells eleventy to ignore everything except news, _includes and info
  eleventyConfig.ignores.add("src/!(news|_includes|info)/**");
  // tells eleventy to ignore all .md files beginning with _
  eleventyConfig.ignores.add("src/**/_*.md");
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
