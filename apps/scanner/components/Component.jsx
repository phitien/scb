import React from 'react'
import CoreComponent from '../../../common/core/CoreComponent'
import ScannerService from '../services/Service'

export default class ScannerComponent extends CoreComponent {
    init() {this.service = ScannerService}
}
