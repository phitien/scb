var createBundle = require(`./bundleJS`);

module.exports = exports = function(settings) {
    return function() {
        return createBundle(
            `${settings.module_dir}/entry.jsx`,
            [
                `./`,
                `../`,
                `./asia_finance`,
                `./business_vault`,
                `./apps`,
            ],
            `${settings.application}.js`,
            settings.DIST_DIR,
            settings.production,
            settings.is_component,
            true
        )
    }
}
