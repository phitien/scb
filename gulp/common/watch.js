var gulp = require('gulp')
var runSequence = require('run-sequence')
var livereload = require('gulp-livereload')

module.exports = exports = function(settings) {
    return function() {
        if (!settings.production) {
            livereload.listen()
            gulp.watch(settings.JSX_FILES, function() {
                runSequence(`cleanJS:${settings.application}`, `jsx:${settings.application}`)
            })
            gulp.watch(settings.SCSS_FILES, function() {
                runSequence(`cleanCSS:${settings.application}`, `sass:${settings.application}`)
            })
            gulp.watch(`${settings.TEMPLATE_DIR}/*`, function() {
                runSequence(`inject:${settings.application}`)
            })
            gulp.watch(`${settings.DIST_DIR}/*.css`).on('change', livereload.reload)
            gulp.watch(`${settings.DIST_DIR}/*.js`).on('change', livereload.reload)
            gulp.watch(`${settings.DIST_DIR}/index.html`).on('change', livereload.reload)
        }
    }
}
