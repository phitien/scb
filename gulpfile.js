/**
 * NOTE
 * It's recommended to not manually change this file,
 * all gulp commands are listed below, and please use gulp gulp create or rm
 */
/**
 * create tasks
 * eg:  gulp create --a new_app --t app
 *      gulp create --a new_app --m new_appmodule --no_sidebar --left_sidebar --right_sidebar --require_login
 *      gulp create --m new_module
 */
require('./gulp/commands/create')
/**
 * remove task
 * eg:  gulp rm --a app|module
 *      gulp rm --a app --m removing_appmodule
 */
require('./gulp/commands/remove')
// gulp vendor
require('./gulp/vendor')
// gulp vendor:light
require('./gulp/vendor_light')
/**
 * For applications
 */
// gulp user_profile | user_profile:prod | up | up:prod
require('./apps/user_profile/gulp/gulp')
// gulp scanner | scanner:prod
require('./apps/scanner/gulp/gulp')
/**NEW_APP**/
/**IMPORTANT: Do not remove the above comment**/

var gulp = require('gulp')
var runSequence = require('run-sequence')
gulp.task('default', function() {
    runSequence(
'scanner:prod',
'user_profile:prod',
/**NEW_GULP**/
/**IMPORTANT: Do not remove the above comment**/
        'vendor:light',
        'vendor'
    )
})
