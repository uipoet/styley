module.exports = [
  {
    api: true,
    name: 'cwd',
    help: 'current working directory'
  },
  {
    name: 'help',
    help: 'output this information'
  },
  {
    api: true,
  	name: 'input',
  	help: 'path to read (./index.css by default)'
  },
  {
    api: true,
  	name: 'minify',
  	help: 'format for machines'
  },
  {
    api: true,
  	name: 'output',
  	help: 'path to write (./build/bundle.css by default)'
  },
  {
    api: true,
  	name: 'sourcemap',
  	help: 'inline map of original source'
  },
  {
  	name: 'version',
  	help: 'output current version'
  },
  {
    name: 'watch',
    help: 'monitor CSS modules for changes'
  }
];
