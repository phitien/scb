import React from 'react'
import ForgetPasswordForm from '../components/forms/ForgetPasswordForm'
import NavigationModal from './Modal'

export default class ForgetPasswordModal extends NavigationModal {
    get subModalClassName() {return `forget-password-modal-dialog`}
    get content() {
        return (
            <div className='modal-content'>
                <h3 className='modal-title'>Forgot password?</h3>
                <div className='intro'>
                    Enter your email address to reset your password.<br/>
                    We will send you an email with a link to reset your password.
                </div>
                <ForgetPasswordForm className='no-background'/>
                {this.closeButton}
            </div>
        )
    }
}
