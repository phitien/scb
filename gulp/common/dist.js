var runSequence = require(`run-sequence`);

module.exports = exports = function(settings) {
    return function () {
        runSequence(
            `clean:${settings.application}${settings.prod()}`,
            `sass:${settings.application}${settings.prod()}`,
            `jsx:${settings.application}${settings.prod()}`,
            `inject:${settings.application}${settings.prod()}`,
        )
    }
}
