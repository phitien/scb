import ObjectAssign from 'object-assign'

export default ObjectAssign({
    container: 'navigation',
}, typeof global_navigation_settings != 'undefined' ? global_navigation_settings : {
    rootPath: '/apps/scanner',
})
