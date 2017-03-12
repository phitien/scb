import React from 'react'
import NavigationBaseComponent from './Component'
import LoginModal from '../modals/LoginModal'
import SignupModal from '../modals/SignupModal'
import CoreButton from '../../CoreButton'

export default class LoginSignupBoxComponent extends NavigationBaseComponent {
    get mainClassName() {return 'login-signup-box'}

    render() {
        return <div className={this.className}>
            <CoreButton className='btn-style-small' type='button'
                onClick={() => this.modal = <LoginModal/>}
                >Log in</CoreButton>
        </div>
    }
}
