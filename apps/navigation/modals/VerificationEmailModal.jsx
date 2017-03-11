import React from 'react'
import NavigationModal from 'apps/navigation/modals/Modal'
import VerificationEmailForm from 'apps/navigation/components/forms/VerificationEmailForm'

export default class VerificationEmailModal extends NavigationModal {
    get subModalClassName() {return `change-password-success-modal-dialog`}
    get content() {
        return (
            <div className='modal-content'>
                <div className='icon-mail icon-mail-big'></div>
                <h3 className='modal-heading'>Please verify your email</h3>
                <div className='intro'>
                    We sent you the link to your inbox.
                </div>
                <VerificationEmailForm className='no-background' user={this.props.user}/>
                {this.closeButton}
            </div>
        )
    }
}
