var gulp = require(`gulp`)
var fs = require(`fs`)
var settings = require('./settings')

gulp.task(`create`, [], function() {
    if (!settings.type || !(settings.type == `app` || settings.type == `module`)) {
        settings.logger(`Type is not allowed. It shoud be 'app|module'`)
        return
    }
    if (settings.appInvalid()) {
        settings.logger(`Name ${settings.app} is invalid. It should start by [a-z], end with [a-z0-9], contain only [a-z_0-9]`)
        return
    }
    if (settings.moduleInvalid()) {
        settings.logger(`Modaule ${settings.newmodule} is invalid. It should start by [a-z], end with [a-z0-9], contain only [a-z_0-9]`)
        return
    }
    if (settings.app && settings.newmodule && !fs.existsSync(settings.modulepath())) {
        createModule()
    }
    else if (!fs.existsSync(settings.apppath())) {
        createApp()
    }
    else settings.logger(`${settings.type == `app` ? `App` : `Module`} ${settings.app} already exists`)
})
