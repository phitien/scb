import React from 'react'
import LoginSignupSocialNetworks from '../components/LoginSignupSocialNetworks'
import SignupForm from '../components/forms/SignupForm'
import NavigationModal from './Modal'

export default class SignupModal extends NavigationModal {
    get subModalClassName() {return `fullscreen-modal-dialog signup-modal-dialog`}
    get content() {
        return (
            <div className='modal-content'>
                <h3 className='modal-title'>Sign up</h3>
                <LoginSignupSocialNetworks />
                <SignupForm/>
                {this.closeButton}
            </div>
        )
    }
}
