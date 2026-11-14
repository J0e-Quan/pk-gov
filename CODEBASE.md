This contains information about the file structure of pk-gov. For information on how to contribute to pk-gov, refer to [CONTRIBUTING.md](CONTRIBUTING.md). For more detailed developer information, refer to [pk-dev](https://pk-gov.onrender.com/dev)

## Structure of this website

The general file structure and structure of the webiste will be listed here. In most cases, you should only be touching stuff in the `src/` folder. Everything outside of that is for dependencies and other dev tools (for more information about this, see the 'outside src/' section below). All pages use the `global.js` file (though some may use additional .js files for specialised functions), while all CSS files are located in `assets/styles/`. All pages use `global.css` for common styles, though most pages also use additional CSS files such as `content-page.css` for page-specific styles.

## Contents of `src/`

### _includes/

This is where 11ty templates which are used more than once (such as info pages and news articles) are located. ALL pages are based on `base.njk`, which contains the header and footer. `content-page.njk` is used by most pages such as about pages and news articles. `ministry.njk` is used by all ministry pages. `service.njk` is used by all services (the actual service itself, not the introductory Start Page). For more details,
refer to [Page templates](https://pk-gov.onrender.com/dev/code/page-templates) on pk-dev.

### about/

This is where the 'about pk-gov' page is located. It is generated from the `content-page.njk` template in `_includes/`.

### assets/

This is where assets like fonts, pictures and CSS files are located.

- `downloadable/` is where the downloadable gov assets are located (they are stored as .zip files)
- `favicons/` is where all favicons are located, pages without their own favicon use `generic.svg`
- `fonts/` is where the font files are stored
- `icons` contains several generic icons used throughout pk-gov, such as the loading animation used by the weather page
- `info-media` is where all media such as images used by 'info pages' are stored. They are grouped into folders which have the same name as the page that uses them
- `lottie/` is where the lottie animations used by the ministry pages are stored
- `ministry-icons/` is where SVGs of the ministry icons are located
- `news-media/` is where all media such as images used by news articles are stored. They are grouped into folders which have the same name as the page that uses them
- `pictures/` is where all pictures used by other pages are stored. Currently, only minister pictures are here, but they are kept in a `ministers/` folder in case other types of pictures are added in the future
- `styles/` is where all .css files are stored, including `global.css`, which resets some default css styling and contains some styles commonly used throughout pk-gov, and `variables.css`, which loads fonts from `fonts/` and contains css custom properties/design tokens used in pk-gov
- `weather-icons` is where all icons used by the weather service are located

### dev/

This is where all pages for pk-dev are located. `index.njk` is the pk-dev homepage. All pages are generated from the `content-page.njk` template in `_includes/`.

- `code/` contains pages related to the code of pk-gov, being `components.njk`, `page-templates.njk`, `style-rules.njk` and `technologies-used.njk`
- `design/` contains pages related to the design of pk-gov, being `download.njk`, `gov-identity.njk` and `variables.njk`

### info/

This is where the 'information' pages are located. Any assets they use (such as photos) are taken from `info-media/`. Within `info-media/`, there should be a folder for each info page that uses media, named the same name as their corresponding .md file. There is a template markdown file provided.

### ministries/

This is where all the ministry pages are located. Any assets they use are taken directly from `assets/`. All pages are generated using the `ministry.njk` template file in `_includes`. All ministry pages share the `ministries.js` file.

### news/

This is where the 'government news' pages are located. Any assets they use (such as photos) are taken from `news-media/`. Within `news-media/`, there should be a folder for each news article that uses media, named the same name as their corresponding .md file. All thumbnails MUST be named `thumbnail.webp`. There is a
template markdown file provided.

### services/

This is where all pages and .js files that pk-gov services use are located:

- `pibss/` contains all PIBSS pages that can be accessed from its Start Page. These pages are generated using the `service.njk` template in `_includes/`. All 4 pages share the `pibss-common.js` file which creates a supabase client, the other .js files are used by their respective njk files
- `timeline/` contains the Timeline service's njk and js file. These pages are generated using the `service.njk` template in `_includes/`
- `weather/` contains the weather service's njk and js file. These pages are generated using the `service.njk` template in `_includes/`. Weather icons are obtained from `weather-icons/` in `assets/`

### start/

This contains the Start Pages for pk-gov services. All Start Pages are written as .md files and generated
from the `content-page.njk` template in `_includes/`.

### root (src/)

In the root of `src/`, `index.njk` is the file for the homepage The homepage's CSS file is also named `home.css`. Any assets it uses are taken directly from `assets/`. `global.js` is also located here, as it is used by all pages for general tasks such as importing `global.css` and the share button. `feed.njk` is the template used to generate pk-gov's RSS feed. `404.njk` is the file for the 404 page that displays if a user enters an invalid URL in their address bar.

## Outside `src/`

Most files outside of `src/` are background/config tools that aren't commonly used in development.

### .github/

This folder contains files related to GitHub Issues and Actions.

- `ISSUE_TEMPLATE/` contains templates for the bug and feedback options in pk-gov-beta
- `workflows/` contains files for automatically triggered actions, `archive.yml` is the script that archives the entire site to the Internet Archive on each push to main, `push-notification.yml` is the script that sends a push notification if a new article is detected which uses the `send-push.js` script in `scripts/` and `supabase-keep-alive.yaml` is a cron job (scheduled script) that runs everyday, pinging PIBSS (supabase) to prevent the database from getting put to sleep

### public/

Contains files to be copied over by Vite. Currently contains OneSignal's service worker file.

### readme-assets/

Contains screenshots used in [README.md](/README.md).

### scripts/

Contains scripts used by GitHub actions, currently only `push-notification.yml` uses the `send-push.js` script here.

### Other files

- `.gitignore`, `.prettierignore`, `.prettierrc`, `eleventy.config.js`, `eslint.config.js`, `package-lock.json` and `package.json` are config files for various dev tools used in this repo
- `sent-posts.json` keeps track of existing news articles, used by the `push-notification.yml` action
