# cssmod

Casading Style Sheets, modernized...

## with:
- modules, `@import` like commonjs `require()`
- variables, like future CSS specification
- color adjustment

## without:
- vendor prefixes

## command line interface

```bash
npm install cssmod -g

cssmod example build

# modifies ./example/index.css (and any imported modules) into ./build/bundle.css
```

## application program interface

```bash
npm install cssmod --save-dev
```

```JavaScript
var
	cssmod = require('cssmod');

cssmod({
	input: 'example',
	output: 'build'
});
```

Resolving input/output file paths mimicks Node.js

`input` option resolves in order:
- PATH/FILENAME.css
- PATH/index.css
- ./index.css
- error

`output` option resolves in order:
- PATH/FILENAME.css
- PATH/bundle.css
- ./build/bundle.css

`output` will create directories and files as needed.
