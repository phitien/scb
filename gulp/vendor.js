var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');

var libs = require('./common/libs')
var DIST_DIR = './public/gen';

gulp.task('vendor', function() {
    var options = {
        debug: false
    };
    var bundler = browserify(options);
    libs.forEach(function(lib) {
        bundler.require(lib);
    });
    return bundler.bundle()
                    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
                    .pipe(source('vendor.js'))
                    .pipe(buffer())
                    .pipe(uglify())
                    .pipe(gulp.dest(DIST_DIR));
});
