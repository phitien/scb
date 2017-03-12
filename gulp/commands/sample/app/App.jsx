import React from 'react'
import CoreApplication from '../../common/core/CoreApplication'

export default class NewAppApplication extends CoreApplication {
    afterRender = () => {
        this.util.addAppStylesAndJSScripts()
    }
}
