
-----------------
# This is a work in process
-----------------

## Blingy

### A blog maker for

  - Easy templating
  - Markdown posts with Handbars ...because!
  - Generators

### Get started

  - Update this file: `./javascripts/site.js` with your information, then run: `blingy init`

  - Write your first post: `blingy-draft helloWorld!`
    - Find it in `posts/helloWorld!.md`, and add some markdown.

  - Turn it to HTML: `blingy-make helloWorld`

  - View it locally: `blingy-run`

  - Profit: (Let me know once you've figured that part out!)

### Command Line Interface

  `blingy-`

  - compile: Compiles handlebars templates in the `./javascripts/templates` directory
  - draft-post [POST NAME]: Generates a blank markdown post in `./posts` with a timestamp.
  - pubish-post: turns post to HTML, compiles any handlebars, and publishes it.
  - beefy: Watches working directory
  - init: Init based on site.js config

  - Unpublish me with `blingy unpublish someBlogPost`
  - Remove me with `blingy remove someBlogPost`
  - Create a draft post with `blingy draft [new post name]`
  - List all draft posts with `blingy list-drafts`
  - Publish a post with `blingy make [post name]`
  - See changes locally with `blingy run`

### Uses

  - Browserify (dealing with multiple JS files)
  - Watchify (watcher to update bundle.js on JS file changes)
  - Beefy (watch index.html for changes and serve locally)
  - Handlebars (templating and partials)
  - Markdown to html
