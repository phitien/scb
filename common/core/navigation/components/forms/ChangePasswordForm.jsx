import React from 'react'
import CoreInput from '../../../CoreInput'
import CoreButton from '../../../CoreButton'
import ChangePasswordSuccessModal from '../../modals/ChangePasswordSuccessModal'
import FormComponent from './Form'

export default class ChangePasswordForm extends FormComponent {
    get formClassName() {return 'change-password-form'}

    validate = () => this.validateFieldNotEmpty('passwordInput', 'Please enter your current password.')
        && this.validateFieldNotEmpty('newPasswordInput', 'Please enter your new password.')
        && this.validateFieldMinLength('newPasswordInput', 6, 'Password must have at least 6 characters.')
        && this.validateValuesMatched('newPasswordInput', 'confirmPasswordInput', 'Passwords are not matched.')
        ? this.removeError() : false
    onClick = () => this.validate() ? this.onConfirm() : false
    onConfirm = () => {
        this.disabled = true
        this.authService.changePassword(this.passwordInput.value, this.newPasswordInput.value)
        .then(res => this.modal = <ChangePasswordSuccessModal/>)
        .catch(err => {
            this.state.disabled = false
            this.modalMessage = <div className='error'>{err.data && err.data.old_password ? 'Wrong current password' : 'Could not change password now.'}</div>})
    }
    render() {
        return <div className={this.className}>
            <CoreInput type='password' placeholder='Old password'
                ref={e => this.passwordInput = e}
                errorMessage={this.state.errorField == 'passwordInput' ? this.state.message : null}/>
            <CoreInput type='password' placeholder='New password'
                ref={e => this.newPasswordInput = e}
                errorMessage={this.state.errorField == 'newPasswordInput' ? this.state.message : null}/>
            <CoreInput type='password' placeholder='Confirm new password'
                ref={e => this.confirmPasswordInput = e}
                errorMessage={this.state.errorField == 'confirmPasswordInput' ? this.state.message : null}/>
            <div className='actions'>
                <CoreButton className='btn-style-regular' onClick={this.onClick} disabled={this.disabled}>Submit</CoreButton>
            </div>
        </div>
    }
}
