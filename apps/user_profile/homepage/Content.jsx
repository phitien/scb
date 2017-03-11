import React from 'react'
import CoreSection from 'common/core/CoreSection'
import CoreInput from 'common/core/CoreInput'
import CoreButton from 'common/core/CoreButton'
import UserProfileContent from 'apps/user_profile/components/Content'
import ConfirmUnlinkModal from 'apps/user_profile/modals/ConfirmUnlinkModal'
import ProfilePictureComponent from 'apps/user_profile/homepage/ProfilePicture'
import LinkedAccountsComponent from 'apps/user_profile/homepage/LinkedAccounts'
import PhoneNumberComponent from 'apps/user_profile/homepage/PhoneNumber'
import ChangePasswordModal from 'apps/navigation/modals/ChangePasswordModal'

export default class UserProfileHomepageContent extends UserProfileContent {
    get changed() {return this.firstNameInput.changed
        || this.lastNameInput.changed
        || this.phoneNumber.changed
        || this.linkedAccounts.changed
    }
    validate = () => (this.validateFieldNotEmpty('firstNameInput', 'Please enter your first name.')
        && this.validateFieldNotEmpty('lastNameInput', 'Please enter your last name.')
        && this.phoneNumber.validate()
        && (!this.user.isNormalLoginUser || (this.user.isNormalLoginUser && this.validateFieldNotEmpty('passwordInput', 'Please enter your password.'))))
        ? this.removeError() : false
    get passwordField() {
        if (!this.user.isNormalLoginUser) return null
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
                            {this.user.isNormalLoginUser ? <CoreButton className='btn-style-regular btn-style-hilighted btn-change-password'
                                onClick={() => this.modal = <ChangePasswordModal/>}>Change password</CoreButton> : null}
                            <CoreButton className='btn-style-regular btn-save' onClick={this.props.onSaveClick}>Save</CoreButton>
                        </div>
                    </div>
                </div>
            </CoreSection>
        )
    }
}
