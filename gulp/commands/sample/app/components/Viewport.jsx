import React from 'react'
import {connect} from 'react-redux'
import CoreViewport from '../../../common/core/CoreViewport'
import NewAppService from '../services/Service'

export default class NewAppViewport extends CoreViewport {
    init() {this.service = NewAppService}
    get viewportClassName() {return 'new-app'}
}
