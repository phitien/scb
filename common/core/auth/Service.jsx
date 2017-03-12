import jwtDecode from 'jwt-decode'
import AppDispatcher from '../../dispatchers/AppDispatcher'
import {EVENTS, CoreStore, CoreActions, CoreService} from '../CoreService'

EVENTS.sure('auth', 'search_searchdata')

class Actions extends CoreActions {

}

class Store extends CoreStore {
    init() {
        if (this.isLoggedIn) this.getProp('userInfo', jwtDecode(this.authJWTKey))
    }
    get userInfo() {return this.getProp('userInfo')}
    set userInfo(v) {this.setProp('userInfo', v, true)}
    get authJWTKey() {return this.util.getCookie('app-jwt')}
    get isLoggedIn() {
        const token = this.authJWTKey
        if (!token || token.length <= 0) return false
        const decodedToken = jwtDecode(token)
        const currentTime = (new Date()).getTime()
        if (decodedToken.exp <= Math.floor(currentTime/1000)) {
            this.util.deleteCookie('app-jwt')
            return false
        }
        return true
    }
    clear = () => this.util.deleteCookie(this.authJWTKey)
}

class Service extends CoreService {
    get baseUrl() {return `/api/auth`}
}

export default new Service(EVENTS.AUTH, new Store(), new Actions())
