import React from 'react'
import NavigationModal from 'apps/navigation/modals/Modal'
import LoginSignupSocialNetworksComponent from 'apps/navigation/components/LoginSignupSocialNetworks'
import LoginForm from 'apps/navigation/components/forms/LoginForm'

export default class LoginModal extends NavigationModal {
    get subModalClassName() {return `fullscreen-modal-dialog login-modal-dialog`}
    get content() {
        return (
            <div className='modal-content'>
                <h3 className='modal-title'>Log in</h3>
                <LoginSignupSocialNetworksComponent />
                <LoginForm />
                {this.closeButton}
            </div>
        )
    }
}
