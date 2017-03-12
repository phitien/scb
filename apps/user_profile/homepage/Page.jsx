import React from 'react'
import UserProfilePage from '../components/Page'
import UserProfileHomepageContent from './Content'

export default class UserProfileHomepagePage extends UserProfilePage {
    get mainClassName() {return 'user-profile-page user-profile-homepage-page'}
    get content() {return this.user.isLoggedIn ?
        <UserProfileHomepageContent ref={e => this.contentElement = e}
            onSaveClick={this.onSaveClick}
            onChangePasswordClick={this.onChangePasswordClick}
            params={this.props.params}/> : null}
    onSaveClick = () => {
        if (this.contentElement.changed && this.contentElement.validate()) {
            let data = {
                is_bv_user: true,
                email: this.authStore.getUserInfoProp('email'),
                first_name: this.contentElement.firstNameInput.value,
                last_name: this.contentElement.lastNameInput.value,
                mobile_number: this.contentElement.phoneNumber.value,
                linked_linkedin: this.contentElement.state.linkedLinkedin,
                linked_twitter: this.contentElement.state.linkedTwitter,
                linked_facebook: this.contentElement.state.linkedFacebook,
            }
            if (this.user.isNormalLoginUser) data.password = this.contentElement.passwordInput.value
            this.authService.updateBvUserProfile(data)
            .then(res => this.globalMessage = <div className='info'>Your account has been successfully updated.</div>)
            .catch(res => this.globalMessage = <div className='error'>Could not update your account at the moment.</div>)
        }
    }

}
