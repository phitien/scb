var gulp = require(`gulp`)
var replace = require(`gulp-replace`)
var del = require('del')
var argv = require(`../common/argv`)
var _ = require(`lodash`)
var logger = require(`../common/logger`)
var fs = require(`fs`)

const SAMPLE_DIR = `./gulp/commands/sample`
const APPS_DIR = `./apps`
const CORE_DIR = `./common/core`
const TEMPLATES_DIR = `./template`
const PUBLIC_DIR = `./public`
const GEN_DIR = `./public/apps`
const auto_generated_text = `/**AUTO_GENERATED**/`
const newapp = `/**NEW_APP**/`
const newgulp = `/**NEW_GULP**/`
const newscript = `"__new_script__": "",`
const newpage = `/**NEW_PAGE**/`
const newroute = `/**NEW_PAGE_ROUTE**/`
const app = argv.a ? argv.a.toLowerCase() : argv.app ? argv.app.toLowerCase() : ''
const newmodule = argv.m ? argv.m.toLowerCase() : argv.module ? argv.module.toLowerCase() : ''
const require_login =  argv.r ? argv.r : argv.require_login ? argv.require_login : false
const no_sidebar = argv.no_sidebar ? `true` : `false`
const left_sidebar = argv.left_sidebar ? `true` : `false`
const right_sidebar = argv.right_sidebar ? `true` : `false`

nameValid = name => /^[a-z][a-z_0-9]*[a-z0-9]$/.test(name)
appInvalid = () => _.isEmpty(app) || !/^[a-z][a-z_0-9]*[a-z0-9]$/.test(app)
moduleInvalid = () => !_.isEmpty(newmodule) && !/^[a-z][a-z_0-9]*[a-z0-9]$/.test(newmodule)
apppath = () => `${APPS_DIR}/${app}`
appname = () => _.capitalize(_.camelCase(app))
approute = () => app.replace(/\_/g, `-`)
modulepath = () => `${apppath()}/${newmodule}`,
modulename = () => _.capitalize(_.camelCase(newmodule))
moduleroute = () => newmodule.replace(/\_/g, `-`)

var type =  appInvalid() && !moduleInvalid() ? 'module' :
            argv.t ? argv.t.toLowerCase() : argv.type ? argv.type.toLowerCase() : `app`

app_content_update = (bundle, type, app, name, route) => bundle.pipe(replace(`new_${type}`, app))
    .pipe(replace(`NEW_${type.toUpperCase()}`, app.toUpperCase()))
    .pipe(replace(`New${_.capitalize(type)}`, name))
    .pipe(replace(`new-${type}`, route))
module_content_update = (bundle) => app_content_update(bundle, 'module', newmodule, modulename(), moduleroute())
    .pipe(replace(`__no_sidebar__`, no_sidebar))
    .pipe(replace(`__left_sidebar__`, left_sidebar))
    .pipe(replace(`__right_sidebar__`, right_sidebar))

gulp_task_text_comment = () => `// gulp ${app} | ${app}:prod`
gulp_task_text = () => `require('${apppath()}/gulp/gulp')`,
newapp_replacement = () => `${gulp_task_text_comment()}
${gulp_task_text()}
${newapp}`
newgulp_task = () => `'${app}:prod',`
newgulp_replacement = () => `${newgulp_task()}
${newgulp}`

package_json_script_text = () => `"start-${app}": "NODE_PATH=./:../:./server:./apps nodemon ${apppath()}/server/server.js --exec babel-node",`,
newscript_replacement = () => `${package_json_script_text()}
${newscript}`

cmp = () => `${modulename()}Page`,
cmp_import_text = () => `import ${cmp()} from 'apps/${app}/${newmodule}/Page'`,
newpage_replacement = () => `${cmp_import_text()}
${newpage}`

cmp_route_text = () => require_login ?
    `{path: '${moduleroute()}', component: ${cmp()}, onEnter: onEnterAuthenticated},` :
    `{path: '${moduleroute()}', component: ${cmp()}},`,
newroute_replacement = () => `${cmp_route_text()}
${newroute}`

createApp = () => {
    app_content_update(gulp.src([
        `${SAMPLE_DIR}/${type}/*`,
        `${SAMPLE_DIR}/${type}/**/*`,
        `${SAMPLE_DIR}/${type}/**/**/*`,
    ]), type, app, appname(), approute())
    .pipe(gulp.dest(apppath()))
    gulp.src(`./gulpfile.js`)
        .pipe(replace(newapp, newapp_replacement()))
        .pipe(replace(newgulp, newgulp_replacement()))
        .pipe(gulp.dest(`./`, {overwrite: true}))
    if (type == 'app') {
        gulp.src(`./package.json`)
            .pipe(replace(newscript, newscript_replacement()))
            .pipe(gulp.dest(`./`, {overwrite: true}))
        logger(`Package Json script added: npm run start-${app}`)
    }
    app_content_update(gulp.src(`${SAMPLE_DIR}/public/index.html`), type, app, appname(), approute())
    .pipe(gulp.dest(`${GEN_DIR}/${app}`))
    logger(`Gulp tasks are added: gulp ${app} or gulp ${app}:prod`)
    logger(`${type == `app` ? `App` : `Module`} '${app}' is created at ${apppath()}`)
}
createModule = () => {
    if (!fs.existsSync(settings.apppath())) return createApp()
    module_content_update(app_content_update(gulp.src([
        `${SAMPLE_DIR}/appmodule/*`,
        `${SAMPLE_DIR}/appmodule/**/*`,
        `${SAMPLE_DIR}/appmodule/**/**/*`,
    ]), 'app', app, appname(), approute()))
    .pipe(gulp.dest(modulepath()))
    gulp.src(`${apppath()}/Routes.jsx`)
    .pipe(replace(cmp_import_text() + "\r", '')).pipe(replace(cmp_import_text() + "\n", ''))
    .pipe(replace(cmp_route_text() + "\r", '')).pipe(replace(cmp_route_text() + "\n", ''))
    .pipe(replace(newpage, newpage_replacement()))
    .pipe(replace(newroute, newroute_replacement()))
    .pipe(gulp.dest(`${apppath()}`, {overwrite: true}))
    logger(`Module ${newmodule} of app ${app} is created at ${modulepath()}`)
}

removeApp = () => {
    del.sync([
        `${TEMPLATES_DIR}/${app}.html`,
        `${GEN_DIR}/${app}`,
        apppath()
    ])
    gulp.src(`./gulpfile.js`)
    .pipe(replace(gulp_task_text_comment() + "\r", '')).pipe(replace(gulp_task_text_comment() + "\n", ''))
    .pipe(replace(gulp_task_text() + "\r", '')).pipe(replace(gulp_task_text() + "\n", ''))
    .pipe(replace(newgulp_task() + "\r", '')).pipe(replace(newgulp_task() + "\n", ''))
    .pipe(gulp.dest(`./`, {overwrite: true}))
    gulp.src(`./package.json`)
    .pipe(replace(package_json_script_text() + "\r", '')).pipe(replace(package_json_script_text() + "\n", ''))
    .pipe(gulp.dest(`./`, {overwrite: true}))
}
removeAppModule = () => {
    logger(`TODO`)
}

const settings = {
    SAMPLE_DIR, APPS_DIR, TEMPLATES_DIR, PUBLIC_DIR, GEN_DIR,
    auto_generated_text, newapp, newgulp, newscript, newpage, newroute,
    type, app, newmodule, require_login, no_sidebar, left_sidebar, right_sidebar,
    nameValid, appInvalid, moduleInvalid,
    apppath, appname, approute, modulepath, modulename, moduleroute,
    createApp, createModule,
    removeApp, removeAppModule,
    logger
}

module.exports = exports = settings
