var
  fs = require('fs'),
  mkdirp = require('mkdirp'),
  path = require('path');

module.exports = function (options, next) {
  var
    asynchronous = typeof next === 'function',
    filename = 'bundle.css',
    output = options.output;

  if (typeof output === 'boolean') {
    output = path.join('build', filename);
  }
  else if (path.extname(output) === '') {
    output = path.join(output, filename);
  }

  mkdirp(path.dirname(output), function (error) {
    if (error) {
      console.error(error);
    }
    else {
      fs.writeFile(output, options.source, function (error) {
        if (error) {
          if (asynchronous) {
            next(error);
          }
          else {
            console.error(error);
          }
        }
        else if (asynchronous) {
          next(null, output);
        }
      });
    }
  });
};
