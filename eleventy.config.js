import { eleventyImageTransformPlugin } from '@11ty/eleventy-img'
import { IdAttributePlugin } from "@11ty/eleventy";
import EleventyVite from '@11ty/eleventy-plugin-vite';
import * as cheerio from "cheerio";
import path from "path";

export default async function (eleventyConfig) {
  eleventyConfig.setServerOptions({
    port: 3000,
    dir: 'dist'
  })
  eleventyConfig.addPlugin(IdAttributePlugin);

  eleventyConfig.addPlugin(EleventyVite, {
    tempFolderName: ".11ty-vite",
    
    viteOptions: {
      clearScreen: false,
      resolve: {
        alias: {
          // Allow references to `node_modules` folder directly
          "/node_modules": path.resolve(".", "node_modules"),
        },
      },
      build: {
        mode: "production",
        rolldownOptions: {
          // Explicitly tells Vite's bundler that the pagefind assets are external 
          // and should be left alone
          external: [
          '/pagefind/pagefind-component-ui.js',
          '/pagefind/pagefind-component-ui.css',
          /^\/pagefind\/.*$/
          ]        
        }
      }
    }
  });

  // code for generating table of contents
eleventyConfig.addTransform("injectNestedToc", function(content) {
  if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
    const $ = cheerio.load(content);
    const placeholder = $(".table-of-contents");

    if (placeholder.length > 0) {
      // only take headings in .page into account
      const headings = $(".page h2, .page h3, .page h4, .page h5, .page h6");
      if (headings.length === 0) return content;

      const $rootUl = $('<ul class="toc-list"></ul>');
      
      // The stack keeps track of active lists. Index 0 is always the root <ul>.
      const stack = [$rootUl];
      let currentLevel = 2;

      headings.each((i, el) => {
        const id = $(el).attr("id");
        if (!id) return;

        const level = parseInt(el.tagName.toUpperCase().replace("H", ""), 10);
        
        // Build the list item 
        const $li = $(`<li class="toc-item-${el.tagName.toLowerCase()}"></li>`);
        $li.append($('<a class="link"></a>').attr('href', `#${id}`).text($(el).text().trim()));

        if (level > currentLevel) {
          // Go Deeper: Add sub-lists inside the last <li> of the current active list
          for (let l = currentLevel; l < level; l++) {
            const $subUl = $(`<ul class="toc-sublist-level-${l + 1}"></ul>`);
            stack[stack.length - 1].children('li').last().append($subUl);
            stack.push($subUl); // Push new list to the top of the stack
          }
        } else if (level < currentLevel) {
          // Climb Up: Pop lists off the stack until we match the current header depth
          for (let l = currentLevel; l > level; l--) {
            if (stack.length > 1) stack.pop();
          }
        }

        // The active list container is now guaranteed to be at the top of the stack
        stack[stack.length - 1].append($li);
        currentLevel = level;
      });

      placeholder.empty().append($rootUl); 
      return $.html();
    }
  }
  return content;
});

  eleventyConfig.setUseGitIgnore(false)
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ['webp'],
    widths: ['auto']
  })

  eleventyConfig.addWatchTarget('./dist/*.js')
  eleventyConfig.addWatchTarget('./dist/*.css')
  eleventyConfig.addPassthroughCopy("src/**/*.js")
  // eleventyConfig.addPassthroughCopy("src/**/*.css")
  eleventyConfig.addPassthroughCopy("src/assets/")

  // tells eleventy to ignore all .md files beginning with _
  eleventyConfig.ignores.add('src/**/_*.md')
  eleventyConfig.ignores.delete('dist/**')


  eleventyConfig.addFilter('postDate', (dateObj) => {
    return dateObj.toLocaleString('en-GB', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  })

  return {
    templateFormats: ["md", "njk", "html"],
    dir: {
      input: 'src',
      output: 'dist'
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk'
  }
}
