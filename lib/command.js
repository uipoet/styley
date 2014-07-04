#!/usr/bin/env node

var
  cssmod = require('./cssmod'),
  help = require('./help'),
  minimist = require('minimist'),
  options = require('./options'),
  vectors = minimist(process.argv.splice(2)),
  version = require('./version');

if (vectors._.length) {
  vectors.input = vectors._.shift();
}

if (vectors._.length) {
  vectors.output = vectors._.shift();
}

options.forEach(function (option) {
  var
    name = option.name,
    n = name[0];

  if (!vectors[name] && vectors[n]) {
    vectors[name] = vectors[n];
  }
});

if (vectors.help) {
  help();
} else if (vectors.version) {
  version();
} else {
  cssmod(vectors);
}
