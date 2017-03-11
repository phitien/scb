import React from 'react'
import CoreApplication from 'common/core/CoreApplication'

export default class UserProfileApplication extends CoreApplication {
    afterRender = () => {
        this.util.addAppStylesAndJSScripts()
    }
}
