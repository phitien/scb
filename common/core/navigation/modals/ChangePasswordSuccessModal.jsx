import React from 'react'
import ChangePasswordSuccessForm from '../components/forms/ChangePasswordSuccessForm'
import NavigationModal from './Modal'

export default class ChangePasswordSuccessModal extends NavigationModal {
    get subModalClassName() {return `change-password-success-modal-dialog`}
    get content() {
        return (
            <div className='modal-content'>
                <div className='icon-like icon-like-big'></div>
                <h3 className='modal-heading'>Password Changed</h3>
                <div className='intro'>
                    Now you can use your new password.
                </div>
                <ChangePasswordSuccessForm className='no-background'/>
                {this.closeButton}
            </div>
        )
    }
}
