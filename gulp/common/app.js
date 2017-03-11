var gulp = require('gulp');
module.exports = (name, is_component, serverside, scss_files, SCSS_FILES, JSX_FILES, ROOT_DIRS, data) => {
    require('./tasks')(
        require(`./settings`)(name, is_component, serverside, false, scss_files, SCSS_FILES, JSX_FILES, ROOT_DIRS, data)
    )
    require('./tasks')(
        require(`./settings`)(name, is_component, serverside, true, scss_files, SCSS_FILES, JSX_FILES, ROOT_DIRS, data)
    )
    return alias => {
        if (alias != name) {
            gulp.task(alias, [name])
            gulp.task(`${alias}:prod`, [`${name}:prod`])
        }
    }
}
