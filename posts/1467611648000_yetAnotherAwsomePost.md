# {{title}}

### A blog maker for

  - Easy templating
  - Markdown posts with Handbars ...because!
  - Generators

### Get started

  - Update this file: `./javascripts/site.js` with your information, then run: `npm run-script init`
  - Write your first post: `npm run-script make-post helloWorld!`
  - Turn it to HTML: `npm run-script compile-posts`
  - Read it: `npm run-script beefy`
  - Profit: (Let me know once you've figured that part out!)


### Commands

  `npm run-script [command]`

  - compile: Compiles handlebars templates in the `./javascripts/templates` directory
  - compile-posts: Turn markdown posts to HTML, then compiles any handlebars e.g. `\{{ }}` inside.
  - make-post [POST NAME]: Generates a blank markdown post in `./posts` with a timestamp.
  - beefy: Watches working directory
  - md-to-html:
  - init: Init based on site.js config

### Uses

  - Browserify (dealing with multiple JS files)
  - Watchify (watcher to update bundle.js on JS file changes)
  - Beefy (watch index.html for changes and serve locally)
  - Handlebars (templating and partials)
