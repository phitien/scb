import React from 'react'
import ResetPasswordForm from '../components/forms/ResetPasswordForm'
import NavigationModal from './Modal'

export default class ResetPasswordModal extends NavigationModal {
    get subModalClassName() {return `reset-password-modal-dialog`}
    get content() {
        return (
            <div className='modal-content'>
                <h3 className='modal-title'>Reset your password?</h3>
                <div className='intro'>
                    Please enter a new password for your account.
                </div>
                <ResetPasswordForm className='no-background'/>
                {this.closeButton}
            </div>
        )
    }
}
