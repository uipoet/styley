var
  autoprefixer = require('autoprefixer'),
  CleanCSS = require('clean-css'),
  fs = require('fs'),
  mkdirp = require('mkdirp'),
  npm = require('rework-npm'),
  path = require('path'),
  resolve = require('./resolve'),
  rework = require('rework'),
  shade = require('rework-shade'),
  variables = require('rework-vars');

function writeFile(options, next) {
  var
    output = options.output;

  if (path.extname(output) !== '.css') {
    output = path.join(output, 'bundle.css');
    console.log(output);
  }

  fs.writeFile(output, options.source, function (error) {
    var
      asynchronous = typeof next === 'function';

    if (error) {
      if (asynchronous) {
        next(error);
      } else {
        console.error(error);
      }
    } else if (asynchronous) {
      next();
    }
  });
}

module.exports = function (options, next) {
  options = options || {};

  var
    cwd = options.cwd || process.cwd(),
    input = path.resolve(cwd, options.input || 'index.css'),
    output = path.resolve(cwd, options.output || 'bundle.css');

  resolve({
    path: input
  }, function (error, input) {
    if (error) {
      console.error(error);
    } else {
      var
        source = fs.readFileSync(input, 'utf8');

      source = rework(source, {
        source: input
      })
        .use(npm({
          root: process.cwd()
        }))
        .use(variables())
        .use(shade())
        .toString({
          sourcemap: options.sourcemap
        });

      source = autoprefixer().process(source, {
        from: input
      }).css;

      if (options.minify) {
        source = new CleanCSS().minify(source);
      }

      resolve({
        name: 'bundle',
        path: output
      }, function (error, output) {
        if (error) {
          fs.stat(output, function (error, stats) {
            var
              directory;

            if (!error && stats.isFile()) {
              directory = path.dirname(output);
            } else {
              directory = output;
            }

            mkdirp(directory, function (error) {
              if (error) {
                console.error(error);
              } else {
                writeFile({
                  output: output,
                  source: source
                }, next);
              }
            });
          });
        } else {
          writeFile({
            output: output,
            source: source
          }, next);
        }
      });
    }
  });
};
