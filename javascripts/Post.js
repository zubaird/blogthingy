'use strict'
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const postHelpers = require(`${__dirname}/post_helpers`);
const markdown = require('markdown').markdown;

const PostMethods = {

  stampedName: function (postName, stamp) {
    return stamp + '_' + postName + '.md';
  },

  makeTimestamp: function () {
    return Date.parse(new Date());
  },

  fullPath: function (path, stampedName) {
    return path + stampedName;
  },

  writeToPostsList: function (thisFile, stampedName, stamp) {
    return new Promise((resolve, reject) => {
      fs.readFile(thisFile, 'utf8', function (err, data) {
        let postsData = JSON.parse(data);

        postsData.posts.push({
          name: stampedName,
          content: '',
          date: new Date(stamp),
          published: false,
          categories: [],
        });

        let writableData = JSON.stringify(postsData);

        fs.writeFile(thisFile, writableData, function (err) {
          if (err) {
            throw err;
          }

          resolve();
        });
      });
    });
  },

  removeTimestampAndType: function (name) {
    const NAMEMATCH = /_([^\.]+)/;
    let matches = name.split(NAMEMATCH);;
    return matches[1]
  },

  findPostFromList: function(name, list, cb) {
    for (var i = 0; i < list.length; i++) {
      let postFromList = PostMethods.removeTimestampAndType(list[i].name);
      if (name === postFromList) {
        cb(list[i], i);
      }
    }
  },

  findFullNamePostFromList: function (name, list, cb) {
    for (var i = 0; i < list.length; i++) {
      let postFromList = list[i].name;
      if (name === postFromList) {
        cb(list[i], i);
      }
    }
  },

  handleError: function (err) {
    if (err) {
      throw err;
    }
  },

  removeFromJSON: function (name) {
    return new Promise((resolve, reject) => {
      let file = './postsList.json';

      fs.readFile(file, 'utf8', function (err, data) {
        let postsList = JSON.parse(data);
        let posts = postsList.posts;
        let updatedContent;

        PostMethods.findPostFromList(name, posts, function (post, index) {
          posts.splice(index, 1);
          updatedContent = JSON.stringify(postsList);

          fs.writeFile(file, updatedContent, function (err) {
            if (err) {
              console.error('line 82 error Post.js', err);
              reject(err);
            }

            resolve();
          });
        });
      });
    });
  },

  deleteMDFile: function (name) {
    return new Promise((resolve, reject) => {
      let file = './postsList.json';

      fs.readFile(file, 'utf8', function (err, data) {
        let postsList = JSON.parse(data);
        let posts = postsList.posts;
        let path;

        PostMethods.findPostFromList(name, posts, function (post, index) {
          path = './posts/' + post.name;
          fs.unlink(path, function (err) {
            if (err) {
              console.error(err);
              reject(err);
            }

            resolve();
          });
        });

      });
    });
  },

  deleteHTMLFile: function (name) {
    return new Promise((resolve, reject) => {
      let file = './postsList.json';

      fs.readFile(file, 'utf8', function (err, data) {
        let postsList = JSON.parse(data);
        let posts = postsList.posts;
        let path;

        PostMethods.findPostFromList(name, posts, function (post, index) {

          let normalizedName = post.name.slice(0, post.name.length - 3);
          let htmlFile = `./posts/html/${normalizedName}.html`;
          console.log(htmlFile);
          fs.unlink(htmlFile, function (err) {
            if (err) {
              console.error(err);
              reject(err);
            }

            resolve();
          });
        });

      });
    });
  },
};

const Post  = {
  newDraft: function (draftName) {
    return new Promise((resolve, reject) => {
      let content = '# Title \n*Published on: {{date}}*\n',
          stamp = PostMethods.makeTimestamp(),
          stampedName = PostMethods.stampedName(draftName, stamp),
          fullPath = PostMethods.fullPath('./posts/', stampedName);

      fs.writeFile(fullPath, content, (err) => {
        PostMethods.writeToPostsList('./postsList.json', stampedName, stamp).then(() => {
          resolve(err);
        });
      });

    });
  },

  remove: function (postName) {
    let stepOne = PostMethods.removeFromJSON(postName);
    let stepTwo = PostMethods.deleteMDFile(postName);
    return Promise.all([stepOne, stepTwo]);
  },

  find: function (postName) {
    return new Promise((resolve, reject)=> {

      fs.readFile('./postsList.json', 'utf8', (err, data) => {

        let posts = JSON.parse(data).posts;
        if (err) {
          reject(err);
        }

        PostMethods.findPostFromList(postName, posts, (post, index) => {
          resolve(post);
        });
      });
    });
  },

  all: function () {
    return new Promise((resolve, reject) => {
      fs.readFile('./postsList.json', 'utf8', (err, data) => {
        let posts = JSON.parse(data).posts;
        err ? reject(err) : resolve(posts);
      });
    });
  },

  readPostListFile: function () {
    return new Promise((resolve, reject) => {
      fs.readFile('./postsList.json', 'utf8', (err, data) => {
        let file = JSON.parse(data);
        err ? reject(err) : resolve(file);
      });
    });
  },

  writeToPostListFile: function (content) {
    return new Promise((resolve, reject) => {
      fs.writeFile('./postsList.json', content, (err) => {
        if (err) {
          reject(err);
        }

        resolve();
      });
    });
  },

  updatePost: function (postName) {

    return new Promise((resolve, reject) => {

      this.find(postName).then((post)=> {
        resolve();
      });
    });
  },

  addToPostsList: function (postName) {
    return new Promise((resolve, reject) => {

      this.readPostListFile().then((file)=> {

        let posts = file.posts;
        PostMethods.findPostFromList(postName, posts, (post, index)=> {

          post.published = new Date();
          file.posts = posts;
          let updatedContent = JSON.stringify(file);

          this.writeToPostListFile(updatedContent).then(()=> {
            resolve(post.published);
          }).catch((err)=> {
            reject(err);
          });
        });
      });
    });
  },

  toHTML: function (postName) {
    return new Promise((resolve, reject) => {

      this.readPostListFile().then((file)=> {
        let posts = file.posts;
        PostMethods.findPostFromList(postName, posts, (post, index)=> {
          let normalizedName = post.name.slice(0, post.name.length - 3);
          let mdFile = `./posts/${post.name}`;
          let htmlFile = `./posts/html/${normalizedName}.html`;

          fs.readFile(mdFile, 'utf8', function (err, data) {

            postHelpers.getTemplateHelpers(postName).then((helpers)=> {
              let template = Handlebars.compile(data)(helpers);
              let htmlContent = markdown.toHTML(template);

              fs.writeFile(htmlFile, htmlContent, (err) => {
                err ? reject(err) : resolve(htmlContent);
              });
            });
          });
        });
      });
    });
  },

  unpublish: function (postName) {
    return new Promise((resolve, reject)=> {
      this.readPostListFile().then((file)=> {

        let posts = file.posts;
        PostMethods.findPostFromList(postName, posts, (post, index)=> {

          post.published = false;

          let updatedContent = JSON.stringify(file);

          fs.writeFile('./postsList.json', updatedContent, (err) => {
            if (err) {
              reject(err);
            }

            PostMethods.deleteHTMLFile(postName).then(()=> {
              resolve(updatedContent);
            });
          });
        });
      });
    });
  },

};

module.exports = Post;
