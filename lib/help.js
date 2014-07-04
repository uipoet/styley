var
  options = require('./options'),
  table = require('text-table');

options = options.map(function (option) {
  var
    api = option.api,
    help = option.help,
    name = option.name;

  option = [
    '-' + name[0],
    '--' + name
  ];

  if (api) {
    option.push(name + ':');
  } else {
    option.push('');
  }

  option.push(help);

  return option;
});

module.exports = function () {
  console.log(table([
    ['cli:', 'cssmod <input> <output> [options]'],
    ['api:', 'cssmod({options}, function (error, source) {};'],
    ['options:']
  ]));
  console.log(table(options));
};
