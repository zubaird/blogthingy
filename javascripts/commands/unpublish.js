'use strict'

const Post = require('../Post.js');

var name = process.argv[2];

Post.unpublish(name).then( (post) => {
  console.log('post unpublished: ', name);
})
