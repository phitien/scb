import React from 'react'
import CoreModal from 'common/core/CoreModal'
import ScannerService from 'apps/scanner/services/Service'

export default class ScannerModal extends CoreModal {
    init() {this.service = ScannerService}
    get modalClassName() {return `scanner-modal-dialog ${this.subModalClassName}`}
    get subModalClassName() {return ``}
    get closeButton() {return <i className='close-button' onClick={this.onClose}></i>}
    get message() {return this.nagivationStore.modalMessage ? <div className='modal-message'>
        {this.nagivationStore.modalMessage}
    </div> : null}

}
