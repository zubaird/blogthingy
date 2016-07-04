var Markdown = require('markdown-to-html').Markdown;
var glob = require("glob");
var fs = require('fs');
var path = require('path');

glob("./posts/*.md", {}, function (er, files) {
  files.unshift('finished!');

  var length = files.length;

  convertFile(length, files, new Markdown() );
})

function convertFile(length,files, md){

    if (length === 0) {
      process.exit();
    }

    var fileName = files[files.length - 1];

    md.bufmax = 2048;
    md.debug = true;

    // Write a header.
    console.log('=====BEGIN WRITING TO HTML=======');
    console.log('working on:', fileName);

    // Write a trailer at eof.
    md.once('end', function() {
      var thing = files.pop();
      console.log(thing);
      console.log('=====TASK COMPLETE=======');
      var newFilesList = files;
      convertFile(files.length,newFilesList, new Markdown());
    });

    // var opts = {title: 'File $BASENAME in $DIRNAME', stylesheet: 'test/style.css'};
    md.render(fileName, {}, function(err) {
      if (err) {
        if (err == "Error: ENOENT: no such file or directory, open 'finished!'") {
          process.exit();
        }
        console.log('>>>' + err);
        process.exit();
      }

      var newFile = fileName.slice(8,fileName.length-3);
      var directree = path.format({
                        dir: './posts/html',
                        base: newFile+'.html',
                      });

      console.log('Creating:',path.normalize(directree));

      fs.writeFile(path.normalize(directree),'',function(err){
        if (err) {
          throw err;
        }
        var writeSteam =  fs.createWriteStream(path.normalize(directree));
        md.pipe(writeSteam);
      });

    });

}
