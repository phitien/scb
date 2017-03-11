import React from 'react'
import UserProfileComponent from 'apps/user_profile/components/Component'
import FileUploadAndPreviewField from 'common/components/form_components/FileUploadAndPreviewField'

export default class ProfilePictureComponent extends UserProfileComponent {
    render() {
        return (<div className='profile-picture'>
            <FileUploadAndPreviewField action='create' noStyle={true} isUserProfile={true}
                defaultImgUrl='/public/static/images//team-member-default-new.png'
                onImageUploaded={e => this.authService.updateBvUserProfile({profile_picture: e})}
                imgUrl={this.authStore.userInfo.profilePicture}/>
        </div>)
    }
}
