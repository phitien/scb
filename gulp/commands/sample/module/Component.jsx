import React from 'react'
import CoreComponent from '../../../common/core/CoreComponent'
import NewModuleService from './Service'
import NewModuleSettings from './Settings'

export default class NewModuleBaseComponent extends CoreComponent {
    init() {this.service = NewModuleService}
    get settings() {return NewModuleSettings}
}
