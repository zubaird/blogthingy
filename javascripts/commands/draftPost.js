'use strict'

const Post = require('../Post.js');

var name = process.argv[2];

Post.newDraft(name).then( (err) => {
  if (err) {
    console.error(err);
  }
  console.log('post created: ', name);
})
