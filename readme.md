# styley

Freaky Styley Sheets

## Turn `./index.css`...
```CSS
@import './variable';

:root {
	--color: white;
}

body {
	background-color: var(--background-color);
	color: var(--color);
}

@import './module/index';
```
## and `./variable.css`...
```CSS
:root {
	--background-color: black;
}
```

## and `./module/index.css`...
```CSS
.module {
	background-color: var(--background-color);
	color: var(--color);
	display: flex;
}
```

## ...into `./build/bundle.css`:
```CSS
body {
  background-color: black;
  color: white;
}

.module {
  background-color: black;
  color: white;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}
```

## command line interface

```bash
npm install styley -g

styley examples

```

## application program interface

```bash
npm install styley --save-dev
```

```JavaScript
var
	styley = require('styley');

styley({
	input: 'examples'
}, function (error, css) {
	console.log(css);
};
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
