var gulp = require('gulp')
var inject = require('gulp-inject')
var replace = require(`gulp-replace`)
var gutil = require('gulp-util')

module.exports = exports = function(settings) {
    return function() {
        if (!settings.is_component) {
            inject.transform.html.js = filepath => `<script async defer src='${filepath}'></script>`
            gulp.src(`${settings.TEMPLATE_DIR}/index.html`)
                .pipe(inject(gulp.src([
                    `${settings.DIST_DIR}/${settings.bundleName()}.css`,
                    `${settings.DIST_DIR}/${settings.bundleName()}.js`,
                ], {
                    read: false
                })))
                .pipe(replace(`{{{title}}}`, settings.data.title))
                .pipe(replace(`{{{meta_description}}}`, settings.data.meta_description))
                .pipe(replace(`{{{meta_keywords}}}`, settings.data.meta_keywords))
                .pipe(settings.production && settings.serverside ? gutil.noop() : replace(`{{{meta}}}`, ''))
                .pipe(replace(`{{{linkedin_api_key}}}`, settings.data.linkedin_api_key))
                .pipe(gulp.dest(settings.DIST_DIR, {overwrite: true}))
            gulp.src([`${settings.TEMPLATE_DIR}/404.html`, `${settings.TEMPLATE_DIR}/500.html`])
                .pipe(inject(gulp.src([
                    `${settings.DIST_DIR}/${settings.bundleName()}.css`,
                    `${settings.DIST_DIR}/${settings.bundleName()}.js`,
                ], {
                    read: false
                })))
                .pipe(gulp.dest(settings.DIST_DIR, {overwrite: true}))
            gulp.src([`${settings.TEMPLATE_DIR}/manifest.json`])
                .pipe(replace(`{{{name}}}`, settings.data.name))
                .pipe(replace(`{{{short_name}}}`, settings.data.short_name))
                .pipe(replace(`{{{start_url}}}`, settings.data.start_url))
                .pipe(gulp.dest(settings.DIST_DIR, {overwrite: true}))
        }
    }
}
