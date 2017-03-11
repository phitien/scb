import { fetch, save, prepare, convertAndPrepare } from 'common/utils/RESTUtil'
import { toCamelCase, toSnakeCase } from 'common/utils/ObjectUtils'
import {
    LINKEDIN_LOGIN,
    CHANGE_PASSWORD_URL,
    TWITTER_REQUEST_LOGIN_URL,
    TWITTER_REQUEST_LINK_URL,
    TWITTER_REQUEST_LOGIN_URL_REDIRECT,
    LOGIN_URL,
    LOGOUT_URL,
    FB_LOGIN_URL,
    SIGNUP_URL,
    BV_UPDATE_URL,
    BV_ACTIVATE_URL,
    BV_MAPPING_URL,
    BV_RENSEND_EMAIL_URL,
    FORGET_PW_URL,
    RESET_PW_URL
} from '../constants/UrlsConstants'
import { COOKIE_JWT, COOKIE_USER } from '../constants/AuthConstants'
import { login, loginFail, logoutUser, saveMappings, changePassword, activateAccount, signupSuccess, reloadUserProfile, updateUserProfilePic } from '../actions/AuthActions'
import MessageConstants from 'common/message/MessageConstants'
import MessageActions from 'common/message/MessageActions'
import history from 'common/utils/History'
import AuthStore from '../stores/AuthStore'
import Cookies from 'js-cookie'
import CoreUtil from 'common/core/CoreUtil'

class AuthenticationServices {
    constructor() {
        this.util = new CoreUtil()
        if (AuthStore.isLoggedIn()) this.reloadUserProfile()
        if (this.util.queries.oauth_token && this.util.queries.oauth_verifier) {
            this.linkTwitterAccountCallback(this.util.queries)
            .then(() => {
                this.util.history.replace({}, '/app/user-profile')
            })
        }
    }
    authenticateUser(url, userInfo, isLogin, source) {
        return prepare(url)(JSON.stringify(userInfo))(save)
        .then(res => {
            if (isLogin) login(res, source)
            return res
        })
    }

    login = (userInfo) => this.authenticateUser(LOGIN_URL, userInfo, true)
    facebookLogin = (userInfo) => this.authenticateUser(FB_LOGIN_URL, userInfo, true, 'Facebook')
    linkedInLogin = (userInfo) => this.authenticateUser(LINKEDIN_LOGIN, userInfo, true, 'LinkedIn')
    googleLogin = (userInfo) => this.authenticateUser('/api/google-login/', userInfo, true, 'Google')

    logout = (message, logoutUrl = LOGOUT_URL) => prepare(logoutUrl)()(save).then(res => logoutUser())
    forgetPw = (email) => prepare(FORGET_PW_URL)(JSON.stringify({ email }))(save)
    resetPasswordConfirm(uid, token, newPassword) {
        const new_password1 = newPassword
        const new_password2 = newPassword

        const promise = prepare(RESET_PW_URL)(JSON.stringify({uid, token, new_password1, new_password2}))(save)

        return promise.then(response => {
            return response
        })
    }


    requestTTAuthURL() {
        const ttAuthURL = prepare(TWITTER_REQUEST_LOGIN_URL)()(fetch)
        ttAuthURL.then(res => {
            window.location = res.url
        })
    }

    linkTwitterAccount() {
        const ttAuthURL = prepare(TWITTER_REQUEST_LINK_URL)()(fetch)
        ttAuthURL.then(res => {
            window.location = res.url
        })
    }

    linkTwitterAccountCallback(token) {
        const ttAuthURL = prepare(TWITTER_REQUEST_LINK_URL)(token)(save)
        return ttAuthURL.then(res => this.reloadUserProfile)
    }

    requestTTAccessToken(token) {
        const ttAuthURL = prepare(TWITTER_REQUEST_LOGIN_URL_REDIRECT)(token)(save)
        ttAuthURL.then(res => {
            if (res === 'Unable to retrieve email') {
                MessageActions.addError(MessageConstants.COMMON_MESSAGE, "Your email is not verified by Twitter.", true)
                setTimeout(()=>MessageActions.clearMessages(MessageConstants.COMMON_MESSAGE), 5000)
            } else if (res === 'Error logging in to Twitter') {
                MessageActions.addError(MessageConstants.COMMON_MESSAGE, "Error while logging in with Twitter.", true)
                setTimeout(()=>MessageActions.clearMessages(MessageConstants.COMMON_MESSAGE), 5000)
            } else {
                res = toCamelCase(res)
                login(res, 'Twitter')
                history.push({ pathname: '/business-vault' })
            }
        })
    }

    changePassword(oldPassword, newPassword1) {
        var new_password1 = newPassword1
        var new_password2 = newPassword1
        var old_password = oldPassword
        var data = JSON.stringify({
            old_password,
            new_password1,
            new_password2
        })
        var promise = prepare(CHANGE_PASSWORD_URL)(data)(save)

        return promise.then(response => {
            if(response && response.success){
                changePassword()
            }
        })
    }

    reloadUserProfile() {
        return prepare('/api/user-profiles/')()(fetch)
        .then(res => {
            reloadUserProfile(res)
            return res
        })
        .catch(res => {
            if (res.status == 401) logoutUser()
            return res
        })
    }

    loadBvMappings() {
        const mappingProm = convertAndPrepare(BV_MAPPING_URL)()(fetch)
        mappingProm.then(mappings => saveMappings(mappings))
    }

    signup(userInfo) {
        const _userInfo = toSnakeCase(userInfo)
        _userInfo.password1 = userInfo.password
        _userInfo.password2 = userInfo.password
        delete _userInfo.password

        return this.authenticateUser(SIGNUP_URL, _userInfo, false, 'Email')
    }

    updateBvUserProfile(userInfo) {
        return prepare('/api/user-profiles/')(JSON.stringify(userInfo))(save)
        .then(res => {
            reloadUserProfile(res)
            return res
        })
    }

    activateBvAccount(token) {
        return prepare(BV_ACTIVATE_URL + token)({'region':'bv'})(save)
        .then(res => {
            const _res = toCamelCase(res)
            login(_res)
            return _res
        })
    }

    resendEmail = email => {
        return prepare(BV_RENSEND_EMAIL_URL)(JSON.stringify(email))(save)
        .then(res => console.log(res))
    }

    promptSuccess(msg) {
        MessageActions.addSuccess(
            MessageConstants.COMMON_MESSAGE,
            msg,
            true)
        setTimeout(() => MessageActions.clearMessages(MessageConstants.COMMON_MESSAGE), 5000)
    }

    handleError(error) {
        const data = error.data
        let errorMsg = 'Unexpected error, please contact our client service.'
        if (error.status === 400) {
            if (data.email) {
                errorMsg = data.email[0]
            } else if (data.non_field_errors) {
                errorMsg = data.non_field_errors[0]
            } else if (data.token) {
                errorMsg = 'Cannot reset password with a invalid token'
            }
        } else if (error.status === 401) {
            if (data.code === 'B') {
                errorMsg = data.response
            }
        }
        loginFail(errorMsg)
    }
}

export default new AuthenticationServices()
