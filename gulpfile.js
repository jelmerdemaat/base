/**
 * Required modules
 */

var gulp = require('gulp'),
    gulpif = require('gulp-if'),

    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
  	sourcemaps = require('gulp-sourcemaps'),
    scsslint = require('gulp-scss-lint'),

    sprity = require('sprity'),

    uglify = require('gulp-uglify'),

  	concat = require('gulp-concat'),
  	rename = require('gulp-rename');


/**
 * Application variables
 */

var app = require('./gulp-settings.js');


/**
 * Gulp tasks
 */

gulp.task('html', function () {
	gulp.src(app.html.src)
		.pipe(gulp.dest(app.html.dest));
});

gulp.task('scss', function () {
  gulp.src(app.scss.src)
    .pipe(scsslint())
    .pipe(scsslint.failReporter())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compact'
    }))
    .pipe(sourcemaps.write('./maps/'))
    .on('error', function(err) {
      console.log(err);
    })
    .pipe(gulp.dest(app.scss.dest));
});

gulp.task('scss:build', function () {
  gulp.src(app.scss.src)
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(csso())
    .on('error', function(err) {
      console.log(err);
    })
    .pipe(gulp.dest(app.scss.dest));
});

gulp.task('js', function () {
  gulp.src(app.js.src)
    .on('error', function(err) {
      console.log(err);
    })
    .pipe(gulp.dest(app.js.dest));
});

gulp.task('js:build', function () {
  gulp.src(app.js.src)
    .pipe(uglify())
    .on('error', function(err) {
      console.log(err);
    })
    .pipe(gulp.dest(app.js.dest));
});


/// TODO: Fix sprite task!

gulp.task('sprites', function () {
  console.log(sprite);

  return sprity.src({
    src: sprite.src,
    name: sprite.name,
    style: sprite.style,
    processor: 'sass'
  })
  .pipe(
    gulpif('*.png',
      gulp.dest('./dist/img/'),
      gulp.dest('./dist/css/'))
  );
});

gulp.task('develop', [
	'html',
	'scss',
	'js'
]);

gulp.task('build', [
  'html',
  'scss:build',
  'js:build'
]);

gulp.task('default', ['develop'], function () {
	gulp.watch(app.html.src, ['html']);
	gulp.watch(app.scss.src, ['scss']);
	gulp.watch(app.js.src, ['js']);
});
