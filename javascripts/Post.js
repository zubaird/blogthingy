const fs = require('fs');
const Handlebars = require('handlebars');
const postHelpers = require(`${__dirname}/post_helpers`);
const markdown = require('markdown').markdown;

const PostMethods = {

  stampedName(postName, stamp) {
    return `${stamp}_${postName}.md`;
  },

  makeTimestamp() {
    return Date.parse(new Date());
  },

  fullPath(path, stampedName) {
    return path + stampedName;
  },

  writeToPostsList(thisFile, stampedName, stamp) {
    return new Promise((resolve, reject) => {
      fs.readFile(thisFile, 'utf8', (err, data) => {
        const postsData = JSON.parse(data);

        postsData.posts.push({
          name: stampedName,
          content: '',
          date: new Date(stamp),
          published: false,
          categories: [],
        });

        const writableData = JSON.stringify(postsData);

        fs.writeFile(thisFile, writableData, (err) => {
          if (err) {
            throw err;
          }

          resolve();
        });
      });
    });
  },

  removeTimestampAndType(name) {
    const NAMEMATCH = /_([^\.]+)/;
    const matches = name.split(NAMEMATCH);
    return matches[1];
  },

  findPostFromList(name, list, cb) {
    for (let i = 0; i < list.length; i++) {
      const postFromList = PostMethods.removeTimestampAndType(list[i].name);
      if (name === postFromList) {
        cb(list[i], i);
      }
    }
  },

  findFullNamePostFromList(name, list, cb) {
    for (let i = 0; i < list.length; i++) {
      const postFromList = list[i].name;
      if (name === postFromList) {
        cb(list[i], i);
      }
    }
  },

  handleError(err) {
    if (err) {
      throw err;
    }
  },

  removeFromJSON(name) {
    return new Promise((resolve, reject) => {
      const file = './postsList.json';

      fs.readFile(file, 'utf8', (err, data) => {
        const postsList = JSON.parse(data);
        const posts = postsList.posts;
        let updatedContent;

        PostMethods.findPostFromList(name, posts, (post, index) => {
          posts.splice(index, 1);
          updatedContent = JSON.stringify(postsList);

          fs.writeFile(file, updatedContent, (err) => {
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

  deleteMDFile(name) {
    return new Promise((resolve, reject) => {
      const file = './postsList.json';

      fs.readFile(file, 'utf8', (err, data) => {
        const postsList = JSON.parse(data);
        const posts = postsList.posts;
        let path;

        PostMethods.findPostFromList(name, posts, (post, index) => {
          path = `./posts/${post.name}`;
          fs.unlink(path, (err) => {
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

  deleteHTMLFile(name) {
    return new Promise((resolve, reject) => {
      const file = './postsList.json';

      fs.readFile(file, 'utf8', (err, data) => {
        const postsList = JSON.parse(data);
        const posts = postsList.posts;
        let path;

        PostMethods.findPostFromList(name, posts, (post, index) => {
          const normalizedName = post.name.slice(0, post.name.length - 3);
          const htmlFile = `./posts/html/${normalizedName}.html`;
          console.log(htmlFile);
          fs.unlink(htmlFile, (err) => {
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

const Post = {
  newDraft(draftName) {
    return new Promise((resolve, reject) => {
      const content = '# Title \n*Published on: {{date}}*\n'
      const stamp = PostMethods.makeTimestamp()
      const stampedName = PostMethods.stampedName(draftName, stamp)
      const fullPath = PostMethods.fullPath('./posts/', stampedName);

      fs.writeFile(fullPath, content, (err) => {
        PostMethods.writeToPostsList('./postsList.json', stampedName, stamp).then(() => {
          resolve(err);
        });
      });
    });
  },

  remove(postName) {
    const stepOne = PostMethods.removeFromJSON(postName);
    const stepTwo = PostMethods.deleteMDFile(postName);
    return Promise.all([stepOne, stepTwo]);
  },

  find(postName) {
    return new Promise((resolve, reject) => {
      fs.readFile('./postsList.json', 'utf8', (err, data) => {
        const posts = JSON.parse(data).posts;
        if (err) {
          reject(err);
        }

        PostMethods.findPostFromList(postName, posts, (post, index) => {
          resolve(post);
        });
      });
    });
  },

  all() {
    return new Promise((resolve, reject) => {
      fs.readFile('./postsList.json', 'utf8', (err, data) => {
        const posts = JSON.parse(data).posts;
        err ? reject(err) : resolve(posts);
      });
    });
  },

  readPostListFile() {
    return new Promise((resolve, reject) => {
      fs.readFile('./postsList.json', 'utf8', (err, data) => {
        const file = JSON.parse(data);
        err ? reject(err) : resolve(file);
      });
    });
  },

  writeToPostListFile(content) {
    return new Promise((resolve, reject) => {
      fs.writeFile('./postsList.json', content, (err) => {
        if (err) {
          reject(err);
        }

        resolve();
      });
    });
  },

  updatePost(postName) {
    return new Promise((resolve, reject) => {
      this.find(postName).then((post) => {
        resolve();
      });
    });
  },

  addToPostsList(postName) {
    return new Promise((resolve, reject) => {
      this.readPostListFile().then((file) => {
        const posts = file.posts;
        PostMethods.findPostFromList(postName, posts, (post, index) => {
          post.published = new Date();
          file.posts = posts;
          const updatedContent = JSON.stringify(file);

          this.writeToPostListFile(updatedContent).then(() => {
            resolve(post.published);
          }).catch((err) => {
            reject(err);
          });
        });
      });
    });
  },

  toHTML(postName) {
    return new Promise((resolve, reject) => {
      this.readPostListFile().then((file) => {
        const posts = file.posts;
        PostMethods.findPostFromList(postName, posts, (post, index) => {
          const normalizedName = post.name.slice(0, post.name.length - 3);
          const mdFile = `./posts/${post.name}`;
          const htmlFile = `./posts/html/${normalizedName}.html`;

          fs.readFile(mdFile, 'utf8', (err, data) => {
            postHelpers.getTemplateHelpers(postName).then((helpers) => {
              const template = Handlebars.compile(data)(helpers);
              const htmlContent = markdown.toHTML(template);

              fs.writeFile(htmlFile, htmlContent, (err) => {
                err ? reject(err) : resolve(htmlContent);
              });
            });
          });
        });
      });
    });
  },

  unpublish(postName) {
    return new Promise((resolve, reject) => {
      this.readPostListFile().then((file) => {
        const posts = file.posts;
        PostMethods.findPostFromList(postName, posts, (post, index) => {
          post.published = false;

          const updatedContent = JSON.stringify(file);

          fs.writeFile('./postsList.json', updatedContent, (err) => {
            if (err) {
              reject(err);
            }

            PostMethods.deleteHTMLFile(postName).then(() => {
              resolve(updatedContent);
            });
          });
        });
      });
    });
  },

};

module.exports = Post;
