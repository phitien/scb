import React from 'react'
import ReactDOM from 'react-dom'
import NewModuleModule from './Module'
import NewModuleSettings from './Settings'

(() => {
    let container = NewModuleSettings.container ? NewModuleSettings.container : document.getElementById('new-module')
    if (container) {
        ReactDOM.render(
            <NewModuleModule/>,
            container
        )
    }
})()
