var
  cssmod = require('../lib/cssmod'),
  fs = require('fs'),
  path = require('path'),
  test = require('tape');

test('build', function (t) {
  t.plan(1);

  cssmod({
    cwd: path.resolve(__dirname, '..'),
    input: 'examples',
    output: 'build',
    sourcemap: true
  }, function (error) {
    if (error) {
      t.fail(error);
    }
    else {
      var
        output = path.resolve(__dirname, '../build/bundle.css');

      if (fs.existsSync(output)) {
        t.pass();
      }
    }
  });
});

test('cleanup', function (t) {
  t.plan(1);

  cssmod({
    cwd: path.resolve(__dirname, '..'),
    input: 'examples',
    output: 'build',
    sourcemap: true
  }, function (error) {
    if (error) {
      t.fail(error);
    }
    else {
      var
        output = path.resolve(__dirname, '../build/bundle.css');

      fs.unlink(output, function (error) {
        if (error) {
          t.fail(error);
        }
        else {
          fs.rmdir(path.dirname(output), function (error) {
            if (error) {
              t.fail(error);
            }
            else {
              t.pass();
            }
          });
        }
      });
    }
  });
});
