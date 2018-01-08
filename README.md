## Blingy (v1.0.x-alpha)

### Static blog/site generator with markdown

  - Write blog articles in .md that gets published in HTML
  - Use [handebarsjs](http://handlebarsjs.com/) in to your .md articles, includes useful helper commands like published date - `{{date}}`
  - Create/Update custom templates and add your own styling/layouts, just remember to run `blingy update-template` when you're done
  - CLI makes it easy to generate new drafts and publish them

### Command Line Interface, usage `blingy <command>`

 - help commands: `<help>`

 - setup commands: `<install>, <refresh>, <run>`

 - create commands: `<new>, <publish>, <list>`

 - remove commands: `<unpublish>, <delete>`

 - misc commands:`<update-template>, <watch>`


### Get started in CLI

  - `npm install --g blingy`

  - Terminal: `blingy install`

  - Update this file: `./javascripts/site.js` with your information

  - Terminal: `blingy refresh`

  - After you write your first blog, `blingy run` in a new tab/window, then check it out in browser at http://127.0.0.1:9966

### For command list in CLI just type `blingy`

### Write your first blog article with blingy

  - Terminal: `blingy new myPost`

  - Find it in `posts/myPost.md`, and add some markdown.

  - Turn it to HTML: `blingy publish myPost`

  - View it locally: `blingy run`, then goto http://127.0.0.1:9966

  - Profit: (Let me know once you've figured that part out!)

### Dependencies

  - Browserify (dealing with multiple JS files)
  - Watchify (watcher to update bundle.js on JS file changes)
  - Beefy (watch index.html for changes and serve locally)
  - Handlebars (templating and partials)
  - Markdown

### Todo

  - Create default template so it doesn't have that craigslist feel
  - Write more helpful helper commands
