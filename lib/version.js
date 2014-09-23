var
  package = require('../package.json');

module.exports = function () {
  console.log('v' + package.version);
};
