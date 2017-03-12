import React from 'react'
import LoginSignupSocialNetworksComponent from '../components/LoginSignupSocialNetworks'
import LoginForm from '../components/forms/LoginForm'
import NavigationModal from './Modal'

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
