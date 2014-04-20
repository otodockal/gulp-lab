gulp-lab
========

Test runner for [Lab](https://github.com/spumko/lab).

## Example

```js
// gulpfile.js
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');

var lab = require('gulp-lab');

gulp.task('test', function () {
    gulp.src('./test/**/*.js')
      .pipe(lab())
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

// Restart the server for changes.
gulp.task('default', function () {

  nodemon({ script: 'server.js', ext: 'html js css' })
    .on('start', 'test');

});
```

## TODO

- Better examples.
- Tests
- Add to [Hapi-tutorial](https://github.com/otodockal/hapi-tutorial)
