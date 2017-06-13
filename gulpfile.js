var gulp = require('gulp');
var babel = require('gulp-babel');
var minify = require('gulp-minify');

gulp.task('compile', function() {
  return gulp.src('src/*.es6')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('minify', ['compile'], function() {
  return gulp.src('dist/*.js')
    .pipe(minify({ 
      ext: {
        min: '.min.js'
      },
      ignoreFiles: ['*.min.js']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  return gulp.watch('src/**/*.js', ['minify']);
});