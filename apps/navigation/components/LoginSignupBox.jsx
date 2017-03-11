import React from 'react'
import NavigationBaseComponent from 'apps/navigation/components/Component'
import LoginModal from 'apps/navigation/modals/LoginModal'
import SignupModal from 'apps/navigation/modals/SignupModal'
import CoreButton from 'common/core/CoreButton'

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
