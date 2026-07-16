This contains information about the pk-gov codebase, such as what technologies we use and how files are organised. For information on how to contribute to pk-gov, refer to [CONTRIBUTING.md](CONTRIBUTING.md)

## pk-gov Tech Stack 

- Vanilla JS and CSS are used, no frameworks or anything (for now)
- 11ty is used to generate all pages on this website (but some pages still use regular html for the actual content), for more information refer to the 'Using 11ty' section below
- Vite is used to minify and bundle code 
- ESLint and Prettier are in use to ensure code style remains consistent
- lottie-web is used for the ministry animations (all other animations are made using only CSS)
- Open-Meteo API is used to provide the weather service
- Supabase and its API are used for PIBSS
- browser-image-compression is used to compress plushie images before being uploaded to Supabase
- Chart.js is used to generate charts in the PIBSS statistics page

## Structure of this website
The general file structure and structure of the webiste will be listed here. In most cases, you should only be touching stuff in the `src/` folder. Everything outside of that is for dependencies and other dev tools. All pages use the `global.js` file (though some may use additional .js files for specialised functions), while all CSS files are located in `assets/styles/`.

### _includes/

This is where 11ty templates which are used more than once (such as info pages and news articles) are located. `content-page.njk` is used by most pages such as about pages and news articles. `ministry.njk` is used by all ministry pages. `service.njk` is used by all services (the actual service itself, not the introductory service page).

### about/

This is where the 'about pk-gov' and 'government identity guidelines pages are located. The pages here are generated with 11ty.

### assets/

This is where assets like fonts, pictures and CSS files are located.

- `downloadable/` is where the downloadable gov assets are located (they are stored as .zip files)
- `favicons/` is where all favicons are located, pages without their own favicon use `generic.svg`
- `fonts/` is where the font files are stored
- `icons` contains several generic icons used throughout pk-gov, such as the loading animation used by the weather page
- `info-media` is where all media such as images used by 'info pages' are stored. They are grouped into folders which have the same name as the page that uses them
- `lottie/` is where the lottie animations used by the ministry pages are stored
- `news-media` is where all media such as images used by news articles are stored. They are grouped into folders which have the same name as the page that uses them
- `pictures/` is where all pictures used by other pages are stored. Currently, only minister pictures are here, but they are kept in a `ministers/` folder in case other types of pictures are added in the future
- `styles/` is where all .css files are stored, including `global.css`, which loads the custom fonts from `fonts/`, resets some default css styling and contains some styles commonly used throughout pk-gov
- `weather-icons/` is where all weather icons used in the weather page are obtained

### info/

This is where the 'life in the plushie kingdom' pages are located. Any assets they use (such as photos) are taken from `info-media/`. Within `info-media/`, there should be a folder for each info page that uses media, named the same name as their corresponding .md file. All pages are generated with 11ty, so there is a template file provided. 

### ministries/

This is where all the ministry pages (the icons in the homepage) are located. Any assets they use are taken directly from `assets/`. All pages are generated with 11ty, the template file is in `_includes`. All ministry pages share the `ministries.js` file.

### news/

This is where the 'government news' pages are located. Any assets they use (such as photos) are taken from `news-media/`. Within `news-media/`, there should be a folder for each news article that uses media, named the same name as their corresponding .md file. All thumbnails MUST be named `thumbnail`, any extension is fine (but we recommend .webp). All pages are generated with 11ty, so there is a template file provided. 

### pibss/

This contains all PIBSS pages that can be accessed from its service page. These pages are generated with 11ty using the `service.njk` template in `_includes/`. All 4 pages share the  `pibss-common.js` file which creates a supabase client, the other .js files are used by their respective njk files.

### weather/

This contains the weather service's njk and js file. These pages are generated with 11ty using the `service.njk` template in `_includes/`. Weather icons are obtained from `assets/weather-icons/`.

### root (src/)

In the root of `src/`, `index.njk` is the file for the homepage The homepage's CSS file is also named `home.css`. Any assets it uses are taken directly from `assets/`. `global.js` is also located here, as it is used by all pages for general tasks such as importing `global.css` and the share button.

## Using 11ty

pk-gov uses 11ty to generate its pages, as it enables faster page creation and template layouts. Here's how we use it and how it works.

- for pages that are only 'generated' once, such as the news homepage, there is an `index.njk` file where the 'index.html' file would be
- for pages that are generated multiple times, such as news articles, there is a .njk template file located in `_includes/`
- njk = Nunjucks, a templating language that allows for some dynamic content in pages (that's mainly what we use it for, for more details you can check out the <a class='link' href='https://mozilla.github.io/nunjucks/templating.html' target='_blank' rel='noreferrer'>documentation</a>)
- Pages that use a template from `_includes` are written using Markdown (.md) EXCEPT ministry and about pages, which currently still use regular HTML. This enables easier writing compared to writing actual HTML (this <a class='link' href='https://www.markdown-cheatsheet.com/' target='_blank' rel='noreferrer'>Markdown cheat sheet</a> can help you to learn the syntax if you're unfamiliar)
- Content from those .md and .html files are dynamically 'filled in' to replace `{{ content | safe }}` in the .njk template

## .md guidelines

This is how we use Markdown for writing pages generated by 11ty. All .md elements are automatically targeted and styled with CSS, so follow these guidelines to ensure consistency!

### \#\# (Heading 2/h2)

h2 elements are used for main titles of different topics. All h2 elements must be immediately followed by a horizontal rule.

### \--- (Horizontal rule/hr)

hr elements are used to give emphasis to h2 elements, and should only be used immediately after h2 elements.

### \#\#\# (Heading 3/h3)

h3 elements are used for smaller/sub-titles, such as different categories/points within a certain topic. h3 elements DO NOT require a horizontal rule after them.

### Regular text (p)

Regular text or text without any special elements are used for the content of the article and any attributions. They automatically have margin-bottom applied to them to separate paragraphs.

### \- (Unordered list/ul)

Unordered lists are used when multiple things have to be listed and the order is not important, such as requirements to use a service. Styles such as margins are automatically handled.

### 1. 2. 3. ... (Ordered list/ol)

Ordered lists are used when multiple things have to be listed in a specific order, such as steps to use a service. Styles such as margins are automatically handled.

### \![alt text](link to img) (image/img)

Image elements are used for placing images in content. Use an absolute path (beginning with `/assets/`) to link to images.

### links (`<a>`)

For links, please use the actual HTML syntax: `<a href='link to stuff' class='link'>LINK TEXT HERE</a>`, as CSS classes cannot be added on to .md elements. Links without class='link' have their text-decoration (underline) removed, making them indistinguishable from regular text (this may be changed in the future, so that regular .md links can be used). For links to external content such as other websites, add `target='_blank' rel='noreferrer'` inside the `<a>` tag.