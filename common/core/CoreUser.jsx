import _ from 'lodash'
import CoreObject from './CoreObject'
import {userHasValidToken, getUserProfile, isNormalLoginUser, isUserAccredited} from 'common/utils/AuthUtil'
import AuthStore from 'apps/authentication/stores/AuthStore'
/**
 * @class CoreUser
 */
export default class CoreUser extends CoreObject {
    get authStore() {return AuthStore}
    get isNormalLoginUser() {return this.authStore.isNormalLoginUser}
    get isLoggedIn() {return this.authStore.isLoggedIn()}
    get email() {return this.authStore.email}
    get profilePic() {return this.authStore.profilePic}
    get firstName() {return this.authStore.firstName}
    get lastName() {return this.authStore.lastName}
    get fullName() {
        if (!this.firstName || !this.lastName) return this.email
        return `${this.firstName} ${this.lastName}`
    }
    get lastLogin() {
        try {
            return jQuery.format.date(new Date(this.authStore.lastLogin), 'MMM dd yyyy')
        } catch (e) {
            return this.authStore.lastLogin
        }
    }
    get hasValidToken() {return userHasValidToken()}
    get loginAsNormal() {return isNormalLoginUser()}
    get userProfile() {return getUserProfile()}
    get isAccredited() {return isUserAccredited()}
    logout = () => this.authStore.userInfo = null
}
