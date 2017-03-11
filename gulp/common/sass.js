var buildStyle = require(`./bundleCSS`);

module.exports = exports = function (settings) {
    return function() {
        return buildStyle(
            settings.SCSS_FILES,
            settings.DIST_DIR,
            `${settings.application}.css`,
            settings.production,
            settings.is_component
        )
    }
}
