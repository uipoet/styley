var
  path = require('path'),
  preprocess = require('./preprocess'),
  write = require('./write');

module.exports = function (options, next) {
  options = options || {};

  var
    asynchronous = typeof next === 'function',
    cwd = options.cwd || process.cwd(),
    output = options.output;

  preprocess(options, function (error, source) {
    if (error) {
      if (error.source) {
        console.error('ERROR:', error.message, 'of', error.filename);
        console.error(error.source);
      } else {
        console.error(error);
      }
    } else {
      if (output) {
        write({
          output: output,
          source: source
        }, function (error, output) {
          if (error) {
            if (asynchronous) {
              next(error);
            } else {
              console.error(error);
            }
          } else {
            if (asynchronous) {
              next();
            } else {
              console.log('created:', path.resolve(cwd, output));
            }
          }
        });
      } else if (asynchronous) {
        next(null, source);
      } else {
        console.log(source);
      }
    }
  });
};
