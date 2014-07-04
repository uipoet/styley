var
  stat = require('fs').stat,
  path = require('path'),
  extname = path.extname,
  join = path.join;

module.exports = function resolve(options, next) {
  var
    name = options.name || 'index',
    path = options.path;

  stat(path, function (error, stats) {
    if (error) {
      next(error.path + ' not found', path);
    } else {
      if (stats.isFile()) {
        switch(extname(path)) {
          case '.css':
            next(null, path);
          break;
          case '':
            resolve({
              path: path + '.css'
            }, next);
          break;
          default:
            next(path + ' is not a CSS file', path);
        }
      } else if (stats.isDirectory()) {
        resolve({
          path: join(path, name + '.css')
        }, next);
      }
    }
  });
};
