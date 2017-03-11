import React from 'react'
import FormComponent from 'apps/navigation/components/forms/Form'
import CoreInput from 'common/core/CoreInput'
import CoreButton from 'common/core/CoreButton'
import ChangePasswordSuccessModal from 'apps/navigation/modals/ChangePasswordSuccessModal'

export default class ResetPasswordForm extends FormComponent {
    get formClassName() {return 'reset-password-form'}

    validate = () => this.validateFieldNotEmpty('passwordInput', 'Please enter your password.')
        && this.validateFieldMinLength('passwordInput', 6, 'Password must have at least 6 characters.')
        && this.validateValuesMatched('passwordInput', 'confirmPassword', 'Passwords are not matched.')
        ? this.removeError() : false

    onSubmit = () => {
        this.disabled = true
        if (this.validate()) {
            this.authService.resetPasswordConfirm(this.util.queries.uid, this.util.queries.token, this.passwordInput.value)
            .then(res => {
                this.modal = <ChangePasswordSuccessModal/>
            })
            .catch(err => {
                this.state.disabled = false
                this.modalMessage = <div className='error'>Something went wrong. Please contact administrator.</div>
            })
        }
    }

    render() {
        return <div className={this.className}>
            <CoreInput type='password' placeholder='New password'
                ref={e => this.passwordInput = e}
                errorMessage={this.state.errorField == 'password' ? this.state.message : null}/>
            <CoreInput type='password' placeholder='Retype new password'
                ref={e => this.confirmPasswordInput = e}
                errorMessage={this.state.errorField == 'confirmPassword' ? this.state.message : null}/>
            <CoreButton className='btn-style-regular btn-reset-password' type='button'
                onClick={this.onSubmit} disabled={this.disabled}
                >Submit</CoreButton>
        </div>
    }
}
