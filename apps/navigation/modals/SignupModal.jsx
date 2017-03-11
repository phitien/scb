import React from 'react'
import NavigationModal from 'apps/navigation/modals/Modal'
import LoginSignupSocialNetworksComponent from 'apps/navigation/components/LoginSignupSocialNetworks'
import SignupForm from 'apps/navigation/components/forms/SignupForm'

export default class SignupModal extends NavigationModal {
    get subModalClassName() {return `fullscreen-modal-dialog signup-modal-dialog`}
    get content() {
        return (
            <div className='modal-content'>
                <h3 className='modal-title'>Sign up</h3>
                <LoginSignupSocialNetworksComponent />
                <SignupForm/>
                {this.closeButton}
            </div>
        )
    }
}
