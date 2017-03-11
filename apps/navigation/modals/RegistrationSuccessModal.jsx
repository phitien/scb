import React from 'react'
import NavigationModal from 'apps/navigation/modals/Modal'
import RegistrationSuccessForm from 'apps/navigation/components/forms/RegistrationSuccessForm'

export default class RegistrationSuccessModal extends NavigationModal {
    get subModalClassName() {return `registration-success-modal-dialog`}
    get content() {
        return (
            <div className='modal-content'>
                <div className='icon-like icon-like-big'></div>
                <h3 className='modal-heading'>You’re all set!</h3>
                <div className='intro'>
                    You successfully confirmed your email.
                </div>
                <RegistrationSuccessForm className='no-background'/>
                {this.closeButton}
            </div>
        )
    }
}
