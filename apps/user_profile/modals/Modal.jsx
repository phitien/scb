import React from 'react'
import CoreModal from 'common/core/CoreModal'
import UserProfileService from 'apps/user_profile/services/Service'

export default class UserProfileModal extends CoreModal {
    init() {this.service = UserProfileService}
    get modalClassName() {return `user-profile-modal-dialog ${this.subModalClassName}`}
    get subModalClassName() {return ``}
    get closeButton() {return <i className='close-button' onClick={this.onClose}></i>}
    get message() {return this.modalMessage ? <div className='modal-message'>
        {this.modalMessage}
    </div> : null}

}
