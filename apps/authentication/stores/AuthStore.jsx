import { toCamelCase } from 'common/utils/ObjectUtils'
import {EVENTS, CoreStore, CoreActions, CoreService} from 'common/core/CoreService'
import {
    OPEN_LOGIN_POPUP,
    LOGIN,
    LOGOUT_USER,
    SAVE_MAPPING,
    LOGIN_FAIL,
    ACTIVATE_ACCOUNT,
    SIGNUP_SUCCESS,
    RELOAD_USER_DATA,
    UPDATE_USER_PROFILE_PIC
} from '../constants/AuthConstants'
import CoreUtil from 'common/core/CoreUtil'
import { isNormalLoginUser } from 'common/utils/AuthUtil'

class AuthStore extends CoreStore {
    get userInfoKeysName() {return 'user-info-keys'}
    get authJWTKey() {return 'af-jwt'}
    get isNormalLoginUser() {return isNormalLoginUser()}

    isLoggedIn = () => this.util.getCookie(this.authJWTKey)
    constructor() {
        super()
        this.subscribe(() => this._registerToActions.bind(this))
        this.util = new CoreUtil
        this._userInfo = {}
        this._userInfoKeys = []
        try {
            this._userInfoKeys = this.util.getCookie(this.userInfoKeysName) ? this.util.getCookie(this.userInfoKeysName) : []
            if (this._userInfoKeys.length)
                this._userInfoKeys.map(k => {
                    this.setUserInfoProp(k, this.getUserInfoProp(k))
                })
        }
        catch(e) {
            this.clear()
        }
    }
    get profilePic() {return this.getUserInfoProp('profilePicture') ? this.getUserInfoProp('profilePicture') :
        '/public/static/images//team-member-default-new.png'}
    get failureMsg() {return this._failureMsg}
    get userInfo() {return this._userInfo}
    set userInfo(userInfo) {
        userInfo = userInfo ? toCamelCase(userInfo) : null
        if (userInfo && (userInfo.isBvAccountActivated || this.isBvAccountActivated)) {// logging in
            Object.keys(userInfo).map(k => {
                if (userInfo.hasOwnProperty(k)) this.setUserInfoProp(k, userInfo[k])
            })
            this.setUserInfoProp(this.authJWTKey, this.getUserInfoProp('token'))
        }
        else {// logging out
            if (this._userInfoKeys.length) {
                this._userInfoKeys.map(k => {
                    delete this[k]
                    delete this._userInfo[k]
                    this.util.deleteCookie(k)
                })
            }
            this.clear()
        }
        window.authStore = this
        this.emitChange()
    }
    clear = () => {
        this.util.deleteCookie(this.userInfoKeysName)
        this.util.deleteCookie(this.authJWTKey)
    }
    setUserInfoProp = (k,v) => {
        if (this._userInfoKeys.indexOf(k) < 0) this._userInfoKeys.push(k)
        this._userInfo[k] = !v ? '' : v
        try {this[k] = this._userInfo[k]} catch(e){console.log(e)}
        this.util.setCookie(k, this._userInfo[k])
        this.util.setCookie(this.userInfoKeysName, this._userInfoKeys)
    }
    getUserInfoProp = (k) => this._userInfo[k] ? this._userInfo[k] : this.util.getCookie(k)

    _registerToActions(action) {
        switch (action.actionType) {
            case UPDATE_USER_PROFILE_PIC:
            case RELOAD_USER_DATA:
            case LOGIN:
            case ACTIVATE_ACCOUNT:
            case SIGNUP_SUCCESS:
                this.userInfo = action.userInfo
                break
            case LOGOUT_USER:
                this.userInfo = null
                break
            case LOGIN_FAIL:
                this._failureMsg= action.error
                setTimeout(() => {//remove message after 10 seconds
                    this._failureMsg = ''
                    this.emitChange()
                }, 10000)
                this.emitChange()
                break
            case SAVE_MAPPING:
                this.cdBusinessRole = action.mappings.cdBusinessRole
                this.cdInterest = action.mappings.cdInterest
                this.cdSource = action.mappings.cdSource
                this.emitChange()
                break
            case OPEN_LOGIN_POPUP:
                this.popupIsOpened = true
                this.redirectUrl = action.redirectUrl
                this.emitChange()
                break
            default:
                break
        }
    }
}

export default new AuthStore()
