var
  message = [
    'usage:',
    '  cssmod <input> <output> [options]',
    'options: %s'
  ].join('\n'),
	options = require('./options').map(function (option) {
		var
			name = option.name,
			n = name[0];

    return ('\n  -' + n + ' --' + name + ' = ' + option.help);
  }).join('');

module.exports = function () {
  console.log(message, options);
};
