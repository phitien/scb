var gulp = require(`gulp`);
var runSequence = require(`run-sequence`);

module.exports = exports = function(options) {
    const settings = options
    gulp.task(`jsx:${settings.application}${settings.prod()}`, [], require('./jsx.js')(settings));
    gulp.task(`sass:${settings.application}${settings.prod()}`, [], require('./sass.js')(settings));
    gulp.task(`cleanJS:${settings.application}${settings.prod()}`, [], require(`./cleanJS.js`)(settings));
    gulp.task(`cleanCSS:${settings.application}${settings.prod()}`, [], require(`./cleanCSS.js`)(settings));
    gulp.task(`clean:${settings.application}${settings.prod()}`, [`cleanJS:${settings.application}${settings.prod()}`, `cleanCSS:${settings.application}${settings.prod()}`]);
    gulp.task(`inject:${settings.application}${settings.prod()}`, [], require(`./inject.js`)(settings));
    gulp.task(`watch:${settings.application}${settings.prod()}`, [], require(`./watch.js`)(settings));
    gulp.task(`build:${settings.application}${settings.prod()}`, [], require(`./build.js`)(settings));
    gulp.task(`${settings.application}${settings.prod()}`, [`build:${settings.application}${settings.prod()}`]);
}
