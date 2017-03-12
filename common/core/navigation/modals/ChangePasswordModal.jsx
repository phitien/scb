import React from 'react'
import ChangePasswordForm from '../components/forms/ChangePasswordForm'
import NavigationModal from './Modal'

export default class ChangePasswordModal extends NavigationModal {
    get subModalClassName() {return `change-password-modal-dialog`}
    get content() {
        return <div className='modal-content'>
            <h3 className='modal-title'>Change Password</h3>
            <ChangePasswordForm/>
            {this.closeButton}
        </div>
    }
}
