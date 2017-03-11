var gulp = require(`gulp`)
var settings = require('./settings')

gulp.task(`rm`, [], function() {
    if (settings.appInvalid()) {
        settings.logger(`Name ${settings.app} is invalid. It should start by [a-z], end with [a-z0-9], contain only [a-z_0-9]`)
        return
    }
    if (settings.moduleInvalid()) {
        settings.logger(`Module ${settings.newmodule} is invalid. It should start by [a-z], end with [a-z0-9], contain only [a-z_0-9]`)
        return
    }
    if (settings.app && settings.newmodule) {
        settings.removeAppModule()
    }
    else {
        settings.removeApp()
        settings.logger(`'${settings.app}' is removed`)
    }
})
