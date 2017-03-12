import React from 'react'
import CoreComponent from '../../../common/core/CoreComponent'
import NewAppService from '../services/Service'

export default class NewAppComponent extends CoreComponent {
    init() {this.service = NewAppService}
}
