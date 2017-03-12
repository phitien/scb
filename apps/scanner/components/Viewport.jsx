import React from 'react'
import {connect} from 'react-redux'
import CoreViewport from '../../../common/core/CoreViewport'
import ScannerService from '../services/Service'

export default class ScannerViewport extends CoreViewport {
    init() {this.service = ScannerService}
    get viewportClassName() {return 'scanner'}
}
