import React from 'react'
import CoreComponent from 'common/core/CoreComponent'
import NewModuleService from 'apps/new_module/Service'
import NewModuleSettings from 'apps/new_module/Settings'

export default class NewModuleBaseComponent extends CoreComponent {
    init() {this.service = NewModuleService}
    get settings() {return NewModuleSettings}
}
