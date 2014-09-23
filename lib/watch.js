var
  watch = require('fs').watchFile,
  tree = {};

module.exports = function (next) {
  return function (source, file) {
    if (!tree[file]) {
      watch(file, {
        interval: 500
      }, function (current, previous) {
        if (current.mtime !== previous.mtime) {
          next(file);
        }
      });
    }

    tree[file] = source;

    return source;
  };
};
