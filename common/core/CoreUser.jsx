import AuthService from './auth/Service'
/**
 * @class CoreUser
 */
class CoreUser {
    get authService() {return AuthService}
    get authStore() {return this.authService.store}
    get isLoggedIn() {return this.authStore.isLoggedIn}
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
    logout = () => this.authStore.userInfo = null
}
export default new CoreUser()
