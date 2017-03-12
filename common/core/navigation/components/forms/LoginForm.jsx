import React from 'react'
import CoreInput from '../../../CoreInput'
import CoreButton from '../../../CoreButton'
import ForgetPasswordModal from '../../modals/ForgetPasswordModal'
import SignupModal from '../../modals/SignupModal'
import FormComponent from './Form'

export default class LoginForm extends FormComponent {
    get formClassName() {return 'login-form'}

    get validateType() {return 'form'}

    resendActivationEmail = () => this.authService
        .resendEmail({email: this.emailInput.value})
        .then(res => this.store.message = 'An activation email was resent to your inbox.')

    validate = () => this.validateFieldEmail('emailInput', 'Please enter a valid email.')
        && this.validateFieldNotEmpty('passwordInput', 'Please enter your password.')
        && this.validateFieldMinLength('passwordInput', 6, 'Password must have at least 6 characters.')
        ? this.removeError() : this.setState({formError: true})

    onSubmit = () => {
        this.disabled = true
        if (this.validate()) {
            this.authService.login({
                email: this.emailInput.value,
                password: this.passwordInput.value
            })
            .then(res => this.modal = null)
            .catch(err => {
                this.state.disabled = false
                let message = <div className='error'>Something went wrong. Please contact administrator.</div>
                if (err.data && err.data.non_field_errors && err.data.non_field_errors[0] === 'Unable to log in with provided credentials.') {
                    this.password = ''
                    message = <div className='error'>Unable to log in with provided credentials.</div>
                }
                else if (err.data && err.data.response === 'Account is not activated') {
                    message = <div className='error'>
                        Your account was not activated. Click
                        <span onClick={this.resendActivationEmail}>
                            &nbsp<u>here</u>&nbsp
                        </span>
                        to resend the activation email.
                    </div>
                }
                this.modalMessage = message
            })
        }
    }

    render() {
        return <div className={this.className}>
            <CoreInput type='email' placeholder='Email' hideMessage={true}
                ref={e => this.emailInput = e}
                errorMessage={this.state.errorField == 'emailInput' ? this.state.message : null}/>
            <CoreInput type='password' placeholder='Password' hideMessage={true}
                ref={e => this.passwordInput = e}
                errorMessage={this.state.errorField == 'passwordInput' ? this.state.message : null}/>
            <a onClick={() => this.modal = <ForgetPasswordModal/>}
                className='forget-password-link'>Forget password?</a>
            <CoreButton className='btn-style-regular btn-login' type='button'
                onClick={this.onSubmit} disabled={this.disabled}
                >Login</CoreButton>
            <div className='bottom-link'>
                Don’t have an account? <a onClick={() => this.modal = <SignupModal/>}>Sign up</a>
            </div>
        </div>
    }
}
