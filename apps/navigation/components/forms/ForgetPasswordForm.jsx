import React from 'react'
import FormComponent from 'apps/navigation/components/forms/Form'
import CoreInput from 'common/core/CoreInput'
import CoreButton from 'common/core/CoreButton'

export default class ForgetPasswordForm extends FormComponent {
    get formClassName() {return 'forget-password-form'}

    validate = () => this.validateFieldEmail('emailInput', 'Please enter a valid email.')
        ? this.removeError() : false
    onSubmit = () => {
        this.setState({disabled: true, buttonText: 'Send again'})
        if (this.validate()) {
            this.authService.forgetPassword(this.emailInput.value)
            .then(res => {
                this.state.disabled = false
                this.modalMessage = `An email has been sent to ${this.email} to reset your password.`
            })
            .catch(err => {
                this.state.disabled = false
                this.modalMessage = <div className='error'>Something went wrong. Please contact administrator.</div>
            })
        }
    }

    render() {
        return <div className={this.className}>
            <CoreInput type='email' placeholder='Email'
                ref={e => this.emailInput = e}
                errorMessage={this.state.errorField == 'email' ? this.state.message : null}/>
            <CoreButton className='btn-style-regular btn-forget-password' type='button'
                onClick={this.onSubmit} disabled={this.disabled}
                >{this.state.buttonText ? this.state.buttonText : 'Send link'}</CoreButton>
            <div className='bottom-link'>
                Still cannot recover your password? <a href='/contact-us'>Let us know</a>
            </div>
        </div>
    }
}
