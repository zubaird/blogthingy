'use strict'

const Post = require('../Post.js');

var name = process.argv[2];

if (!!name) {
  Post.newDraft(name).then( (err) => {
    if (err) {
      console.error(err);
    }
    console.log('post created: ', name);
  })
} else {
  console.log('You\'ll need to include an article name e.g. "blingy new awesomePost"');
}
