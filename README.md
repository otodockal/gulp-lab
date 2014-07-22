gulp-lab
========

Gulp test runner for [Lab](https://github.com/spumko/lab).

Gulp-lab supports the same [options as Lab](https://github.com/spumko/lab#command-line).

## Install

```
npm install gulp-lab --save-dev
```

## New API!

Gulp-lab can emit an Error when tests fails now. 
Simply use new options object with property "emitLabError" on true! By default, "emitLabError" is false.

Property "args" is optional!

```js
// gulpfile.js
var gulp = require('gulp');
var lab = require('gulp-lab');

gulp.task('test', function () {
  return gulp.src('./test/**/*.js')
    .pipe(lab({
      args: '-v',
      opts: {
        emitLabError: true
      }
    }));
});

gulp.task('default', 'test');
```

NOTE: You can still use string options like

```js
lab('-v')
```

or 

```js
lab();
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


## Example 2 - options by a String

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

## NEW: Example 3 - options by an Object

```js
// gulpfile.js
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var lab = require('gulp-lab');

gulp.task('test', function () {
  return gulp.src('./test/**/*.js')
    .pipe(lab({
      args: '-v',
      opts: {
        emitLabError: true
      }
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
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