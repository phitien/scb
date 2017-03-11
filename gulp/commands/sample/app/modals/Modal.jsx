import React from 'react'
import CoreModal from 'common/core/CoreModal'
import NewAppService from 'apps/new_app/services/Service'

export default class NewAppModal extends CoreModal {
    init() {this.service = NewAppService}
    get modalClassName() {return `new-app-modal-dialog ${this.subModalClassName}`}
    get subModalClassName() {return ``}
    get closeButton() {return <i className='close-button' onClick={this.onClose}></i>}
    get message() {return this.nagivationStore.modalMessage ? <div className='modal-message'>
        {this.nagivationStore.modalMessage}
    </div> : null}

}
