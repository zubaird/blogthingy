'use strict'
const filestream = require('fs');


const Helpers = (function(fs){
  return {
    readFile: function(filePath) {
      return new Promise( (resolve,reject) => {
        fs.readFile(filePath,'utf8', function(err,data) {
          if (err) {
            console.log(err);
            reject(err);
          }
            console.log(data);
            resolve(data);
        })
      })
    }
  }

})(filestream)


module.exports = Helpers;
