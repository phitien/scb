import React from 'react'
import CoreModal from 'common/core/CoreModal'
import NavigationService from 'apps/navigation/Service'

export default class NavigationModal extends CoreModal {
    init() {this.service = NavigationService}
    get modalClassName() {return `navigation-modal-dialog ${this.subModalClassName}`}
    get subModalClassName() {return ``}
    get closeButton() {return <i className='close-button' onClick={this.onClose}></i>}
    get message() {return this.modalMessage ? <div className='modal-message'>
        {this.modalMessage}
    </div> : null}
}
