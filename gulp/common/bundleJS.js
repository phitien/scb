var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var babelify = require('babelify');
var watchify = require('watchify');
var rev = require('gulp-rev');
var uglify = require('gulp-uglify');
var bundleCollapser = require('bundle-collapser/plugin');
var assign = require('lodash.assign');

var libs = require('./libs');
var DIST_DIR = './public/gen';

function createBundle(entry, paths, bundleName, dest, production, is_component) {
    var bundleConfig = {
        entries: [entry],
        extensions: ['.jsx'],
        debug: true,
        fullPaths: true,
        noBundleExternal: true,
        transform: [babelify],
        paths: paths
    };

    if (production) {
        bundleConfig.plugin = [bundleCollapser];
        bundleConfig.debug = false;
        bundleConfig.fullPaths = false;
    }
    else {
        bundleConfig.plugin = [watchify];
        bundleConfig = assign({}, watchify.args, bundleConfig);
    }
    var _bundle = browserify(bundleConfig);
    libs.forEach(function (lib) {
        _bundle.external(lib);
    });
    function doBundle() {
        if (!dest) dest = production ? `${DIST_DIR}/prod` : `${DIST_DIR}/dev`
        return _bundle
            .bundle()
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source(bundleName))
            .pipe(buffer())
            .pipe(production? gutil.noop() : sourcemaps.init({ loadMaps: true })) // loads map from browserify file
            .pipe(!is_component && production ? rev(): gutil.noop()) // add version number to script name
            .pipe(production? gutil.noop() : sourcemaps.write('./')) // writes .map file
            .pipe(production? uglify({ mangle: { keep_fnames: true } }): gutil.noop())
            .pipe(gulp.dest(dest))
    }
    _bundle.on('log', gutil.log.bind(gutil));
    _bundle.on('update', doBundle);
    return doBundle();
}

module.exports = createBundle;
