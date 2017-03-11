var gulp = require('gulp');
var gutil = require('gulp-util');
var rev = require('gulp-rev');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');

function buildStyle(scssSource, dest, bundleName, production, is_component) {
    return gulp.src(scssSource)
               .pipe(sourcemaps.init())
               .pipe(sass().on('error', sass.logError))
               .pipe(concat(bundleName))
               .pipe(!is_component && production ? rev(): gutil.noop()) // add version number to script name
               .pipe(production? gutil.noop(): sourcemaps.write(undefined, { sourceRoot: null }))
               .pipe(autoprefixer())
               .pipe(gulp.dest(dest));
}

module.exports = buildStyle;
