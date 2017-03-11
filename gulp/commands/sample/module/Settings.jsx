import ObjectAssign from 'object-assign'

export default ObjectAssign({
    container: 'new-module',
}, typeof global_new_module_settings != 'undefined' ? global_new_module_settings : {})
