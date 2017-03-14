'use strict'
const Post = require('../Post.js');

Post.all().then( posts => {
  posts.forEach(post => {
    let postName = post.name.match(/(_.+\.)/)[0]
    console.log("\n\t ===============", postName.substr(1, postName.length - 2), "===============");
    console.log("\t Date: \t\t", post.date);
    console.log("\t Published: \t", post.published);
    console.log("\t File: \t\t", post.name);
  })
}).catch( err => {
  console.error(err);
})
