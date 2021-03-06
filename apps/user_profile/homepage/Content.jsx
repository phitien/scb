import React from 'react'
import CoreSection from '../../../common/core/CoreSection'
import CoreInput from '../../../common/core/CoreInput'
import CoreButton from '../../../common/core/CoreButton'
import ChangePasswordModal from '../../../common/core/navigation/modals/ChangePasswordModal'
import UserProfileContent from '../components/Content'
import ConfirmUnlinkModal from '../modals/ConfirmUnlinkModal'
import ProfilePictureComponent from './ProfilePicture'
import LinkedAccountsComponent from './LinkedAccounts'
import PhoneNumberComponent from './PhoneNumber'

export default class UserProfileHomepageContent extends UserProfileContent {
    get changed() {return this.firstNameInput.changed
        || this.lastNameInput.changed
        || this.phoneNumber.changed
        || this.linkedAccounts.changed
    }
    validate = () => (this.validateFieldNotEmpty('firstNameInput', 'Please enter your first name.')
        && this.validateFieldNotEmpty('lastNameInput', 'Please enter your last name.')
        && this.phoneNumber.validate()
        && (this.validateFieldNotEmpty('passwordInput', 'Please enter your password.')))
        ? this.removeError() : false
    get passwordField() {
        return [
            <div key={0} className='field-label field-confirm-password-label'>Confirm current password</div>,
            <CoreInput key={1} type='password' defaultValue='' placeholder='Enter password to save changes'
                ref={e => this.passwordInput = e}
                errorMessage={this.state.errorField == 'passwordInput' ? this.state.message : null}/>
        ]
    }
    get content() {
        return (
            <CoreSection className='content' heading='Account'>
                <div className='wrapper'>
                    <ProfilePictureComponent ref={e => this.profilePicture = e}/>
                    <div className='page-form'>
                        <div className='names'>
                            <div className='field field-first-name'>
                                <div className='field-label'>First name</div>
                                <CoreInput type='text' defaultValue={this.authStore.getUserInfoProp('firstName')} placeholder='First name'
                                    ref={e => this.firstNameInput = e}
                                    errorMessage={this.state.errorField == 'firstNameInput' ? this.state.message : null}/>
                            </div>
                            <div className='field field-last-name'>
                                <div className='field-label'>Last name</div>
                                <CoreInput type='text' defaultValue={this.authStore.getUserInfoProp('lastName')} placeholder='Last name'
                                    ref={e => this.lastNameInput = e}
                                    errorMessage={this.state.errorField == 'lastNameInput' ? this.state.message : null}/>
                            </div>
                        </div>
                        <div className='accounts'>
                            <div className='field field-email'>
                                <div className='field-label'>Email</div>
                                <CoreInput disabled={true} type='text' defaultValue={this.authStore.getUserInfoProp('email')} placeholder='Email'
                                    ref={e => this.emailInput = e}
                                    errorMessage={this.state.errorField == 'emailInput' ? this.state.message : null}/>
                                <PhoneNumberComponent ref={e => this.phoneNumber = e}/>
                                {this.passwordField}
                            </div>
                            <LinkedAccountsComponent ref={e => this.linkedAccounts = e}/>
                        </div>
                        <div className='actions'>
                            <CoreButton className='btn-style-regular btn-style-hilighted btn-change-password'
                                onClick={() => this.modal = <ChangePasswordModal/>}>Change password</CoreButton>
                            <CoreButton className='btn-style-regular btn-save' onClick={this.props.onSaveClick}>Save</CoreButton>
                        </div>
                    </div>
                </div>
            </CoreSection>
        )
    }
}
