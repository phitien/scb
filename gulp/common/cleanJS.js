var del = require('del');

module.exports = exports = function(settings) {
    return function() {
        if (!settings.is_component && settings.production)
        del.sync([
            `${settings.DIST_DIR}/${settings.bundleName()}.js`,
            `${settings.DIST_DIR}/${settings.bundleName()}.js.map`
        ])
    }
}
