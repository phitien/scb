import React from 'react'
import NavigationModal from 'apps/navigation/modals/Modal'
import ResetPasswordForm from 'apps/navigation/components/forms/ResetPasswordForm'

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
