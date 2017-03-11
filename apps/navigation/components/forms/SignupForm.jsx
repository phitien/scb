import React from 'react'
import FormComponent from 'apps/navigation/components/forms/Form'
import LoginModal from 'apps/navigation/modals/LoginModal'
import VerificationEmailModal from 'apps/navigation/modals/VerificationEmailModal'
import CoreInput from 'common/core/CoreInput'
import CoreButton from 'common/core/CoreButton'

export default class SignupForm extends FormComponent {
    get formClassName() {return 'sign-form'}

    validate = () => this.validateFieldNotEmpty('firstNameInput', 'Please enter your first name.')
        && this.validateFieldNotEmpty('lastNameInput', 'Please enter your last name.')
        && this.validateFieldEmail('emailInput', 'Password enter a valid email.')
        && this.validateFieldNotEmpty('passwordInput', 'Please enter your password.')
        && this.validateFieldMinLength('passwordInput', 6, 'Password must have at least 6 characters.')
        ? this.removeError() : false

    onSubmit = () => {
        this.disabled = true
        if (this.validate()) {
            this.authService.signup({
                firstName: this.firstNameInput.value,
                lastName: this.lastNameInput.value,
                email: this.emailInput.value,
                password: this.passwordInput.value
            })
            .then(res => this.modal = <VerificationEmailModal user={res}/>)
            .catch(err => {
                this.state.disabled = false
                let message = <div className='error'>Something went wrong. Please contact administrator.</div>
                if (err.data.email !== undefined && err.data.email[0] === 'A user is already registered with this e-mail address.') {
                    message = <div className='error'>Email address {this.email} is already in use.</div>
                }
                this.modalMessage = message
            })
        }
    }

    render() {
        return <div className={this.className}>
            <div className='names'>
                <CoreInput type='text' placeholder='First name'
                    ref={e => this.firstNameInput = e}
                    errorMessage={this.state.errorField == 'firstNameInput' ? this.state.message : null}/>
                <CoreInput type='text' placeholder='Last name'
                    ref={e => this.lastNameInput = e}
                    errorMessage={this.state.errorField == 'lastNameInput' ? this.state.message : null}/>
            </div>
            <CoreInput type='email' placeholder='Email'
                ref={e => this.emailInput = e}
                errorMessage={this.state.errorField == 'emailInput' ? this.state.message : null}/>
            <CoreInput type='password' placeholder='Password'
                ref={e => this.passwordInput = e}
                errorMessage={this.state.errorField == 'passwordInput' ? this.state.message : null}/>
            <CoreButton className='btn-style-regular btn-signup' type='button'
                onClick={this.onSubmit} disabled={this.disabled}
                >Sign up</CoreButton>
            <div className='bottom-link'>
                Already have an account? <a onClick={() => this.modal = <LoginModal/>}>Log in</a>
            </div>
            <div className='aggrement'>
                By signing up, you agree with Asia Finance’s<br/>
                <a>Terms of Service</a> and <a>Privacy Policy</a>.
            </div>
        </div>
    }
}
