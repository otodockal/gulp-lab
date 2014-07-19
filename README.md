gulp-lab
========

Gulp test runner for [Lab](https://github.com/spumko/lab).

Gulp-lab supports the same [options as Lab](https://github.com/spumko/lab#command-line).

## Install

```
npm install gulp-lab --save-dev
```

## Example 1

```js
// gulpfile.js
var gulp = require('gulp');
var lab = require('gulp-lab');

gulp.task('test', function () {
    return gulp.src('test')
      .pipe(lab());
});

gulp.task('default', 'test');
```


## Example 2 - options by String

```js
// gulpfile.js
var gulp = require('gulp');
var lab = require('gulp-lab');

gulp.task('test', function () {
    return gulp.src('test')
      .pipe(lab('-v -l'));
});

gulp.task('default', 'test');
```

## Example 3 - options by Array

```js
// gulpfile.js
var gulp = require('gulp');
var lab = require('gulp-lab');

gulp.task('test', function () {
    return gulp.src('test')
      .pipe(lab(['-v','-l']));
});

gulp.task('default', 'test');
```


## Example 4 - more complex example

```js
// gulpfile.js
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var lab = require('gulp-lab');

gulp.task('test', function () {
    return gulp.src('./test/**/*.js')
      .pipe(lab('-v -l'))
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

// Restart the server for changes.
gulp.task('default', function () {
  nodemon({ script: 'server.js', ext: 'html js css' })
    .on('start', 'test');
});
```