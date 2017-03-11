const TEMPLATE_DIR = './template'
const PUBLIC_DIR = './public'
const STYLES_DIR = './styles/sass'
const CLIENT_DIR = './apps'

module.exports = function(name, is_component, serverside, production, scss_files, jsx_files, root_dirs, data) {
    function js_files(root) {
        return [
            `${root}/*.jsx`,
            `${root}/**/*.jsx`,
            `${root}/**/**/*.jsx`,
            `${root}/**/**/**/*.jsx`,
            `${root}/**/**/**/**/*.jsx`,
        ]
    }
    function css_files(root) {
        return [
            `${root}/mixins/*.scss`,
            `${root}/*.scss`,
            `${root}/responsive/*.scss`,
        ]
    }
    root_dirs = root_dirs ? root_dirs : []

    jsx_files = jsx_files ? jsx_files : []
    jsx_files_set = []
    jsx_root_dirs = [`./common`, `./asia_finance`, `${CLIENT_DIR}/${name}`]
    jsx_root_dirs = jsx_root_dirs.concat(root_dirs)
    for(var i=0;i<jsx_root_dirs.length;i++) {
        jsx_files_set = jsx_files_set.concat(js_files(jsx_root_dirs[i]))
    }

    scss_files = scss_files ? scss_files : []
    scss_files_set = []
    scss_root_dirs = [`${STYLES_DIR}/${name}`, `${CLIENT_DIR}/${name}/sass`]
    for(var i=0;i<root_dirs.length;i++) {
        scss_root_dirs.push(`${root_dirs[i]}/sass`)
    }
    for(var i=0;i<scss_root_dirs.length;i++) {
        scss_files_set = scss_files_set.concat(css_files(`${scss_root_dirs[i]}`))
    }
    scss_files_set = is_component ?
        [`${STYLES_DIR}/constants/*.scss`, `${STYLES_DIR}/mixins/*.scss`, `${STYLES_DIR}/share/*.scss`]
            .concat(css_files(`${CLIENT_DIR}/${name}/sass`))
            .concat(css_files(`${STYLES_DIR}/${name}`))
            .concat(scss_files) :
        [`${STYLES_DIR}/constants/*.scss`, `${STYLES_DIR}/mixins/*.scss`, `${STYLES_DIR}/share/*.scss`]
            .concat(css_files(`${CLIENT_DIR}/*/sass`))
            .concat(css_files(`${STYLES_DIR}/${name}`))
            .concat(scss_files)
    return {
        TEMPLATE_DIR: TEMPLATE_DIR,
        PUBLIC_DIR: PUBLIC_DIR,
        STYLES_DIR: STYLES_DIR,
        CLIENT_DIR: CLIENT_DIR,
        JSX_FILES: jsx_files_set.concat(jsx_files),
        SCSS_FILES: scss_files_set,
        rev: require('gulp-rev'),
        release: require('./release.js'),
        is_component: is_component,
        serverside: serverside,
        production: production,
        module_dir: `${CLIENT_DIR}/${name}`,
        application: `${name}`,
        DIST_DIR: `${PUBLIC_DIR}/gen/${name}`,
        name: `${name}`,
        data: data ? data : {
            name: 'Standard Chartered Bank',
            short_name: 'SCB',
            start_url: '/apps/',
            title: 'Standard Chartered Bank',
            meta_description: 'Standard Chartered Bank',
            meta_keywords: 'Standard Chartered Bank',
        },
        bundleName: function() {
            return this.production ? `${this.name}-*` : `${this.name}`
        },
        prod: function() {
            return this.production ? ':prod' : ''
        }
    }
}
