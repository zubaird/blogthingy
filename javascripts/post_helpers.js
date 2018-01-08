const fs = require('fs');

function removeTimestampAndType(name) {
  const NAMEMATCH = /_([^\.]+)/;
  const matches = name.split(NAMEMATCH);
  return matches[1];
}

function findPostFromList(name, list, cb) {
  for (let i = 0; i < list.length; i++) {
    const postFromList = removeTimestampAndType(list[i].name);
    if (name === postFromList) {
      cb(list[i], i);
    }
  }
}

const helpers = {};

module.exports = {
  publishedDateFor(postName) {
    return new Promise((resolve, reject) => {
      fs.readFile('./postsList.json', 'utf8', (err, data) => {
        const postList = JSON.parse(data);

        findPostFromList(postName, postList.posts, (post, index) => {
          const publishedDate = post.published;
          const date = new Date(publishedDate).toLocaleString();
          resolve(date);
        });
      });
    });
  },

  getTemplateHelpers(postName) {
    return new Promise((resolve, reject) => {
      this.publishedDateFor(postName).then((date) => {
        helpers.date = date;
        resolve(helpers);
      });
    });
  },
};
