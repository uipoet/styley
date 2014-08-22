var
  autoprefixer = require('autoprefixer-core'),
  npm = require('rework-npm'),
  path = require('path'),
  rework = require('rework'),
  shade = require('rework-shade'),
  variables = require('rework-vars'),
  watch = require('./watch');

module.exports = function (options, next) {
  var
    filename = 'index.css',
    input = options.input || filename;

  if (path.extname(input) === '') {
    input = path.join(input, filename);
  }

  function preprocess() {
    try {
      var
        source = rework('@import \'./' + path.basename(input) + '\';', {
          source: input
        })
          .use(npm({
            prefilter: options.watch ? watch(function (file) {
              console.log('modified:', file);

              preprocess();
            }) : null,
            root: options.cwd || process.cwd()
          }))
          .use(variables())
          .use(shade())
          .toString({
            compress: options.minify,
            sourcemap: options.sourcemap
          });

      source = autoprefixer().process(source, {
        from: input
      }).css;

      next(null, source);
    } catch (error) {
      next(error);
    }
  }

  preprocess();
};
