import React from 'react'
import { render } from 'react-dom'
import NewModuleModule from 'apps/new_module/Module'
import NewModuleSettings from 'apps/new_module/Settings'

(() => {
    let container = NewModuleSettings.container ? NewModuleSettings.container : document.getElementById('new-module')
    if (container) {
        render(
            <NewModuleModule/>,
            container
        )
    }
})()
