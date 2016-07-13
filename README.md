
-----------------
# This is a work in process
-----------------

## Blingy

### A blog maker for

  - Easy templating
  - Markdown posts with Handbars ...because!
  - Generators

### Get started

  - Update this file: `./javascripts/site.js` with your information, then run: `npm run init`

  - Write your first post: `npm run draft-post helloWorld!`
    - Find it in `posts/helloWorld!.md`, and add some markdown.

  - Turn it to HTML: `npm run publish-post helloWorld`

  - View it locally: `npm run beefy`

  - Profit: (Let me know once you've figured that part out!)

### Commands

  `npm run [command]`

  - compile: Compiles handlebars templates in the `./javascripts/templates` directory
  - draft-post [POST NAME]: Generates a blank markdown post in `./posts` with a timestamp.
  - pubish-post: turns post to HTML, compiles any handlebars, and publishes it.
  - beefy: Watches working directory
  - init: Init based on site.js config

### Uses

  - Browserify (dealing with multiple JS files)
  - Watchify (watcher to update bundle.js on JS file changes)
  - Beefy (watch index.html for changes and serve locally)
  - Handlebars (templating and partials)
  - Markdown to html
