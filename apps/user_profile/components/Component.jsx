import react from 'react'
import CoreComponent from 'common/core/CoreComponent'
import UserProfileService from 'apps/user_profile/services/Service'

export default class UserProfileComponent extends CoreComponent {
    init() {this.service = UserProfileService}
}
