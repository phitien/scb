import cookie from 'react-cookie'

class CoreCookie {
    getCookie = name => cookie.load(name)
    setCookie(name, value, expiryDays) {
        cookie.save(name, value, {
            expires: expiryDays,
            domain: location.hostname,
            path: '/'
        })
        dispatchEvent(new CustomEvent('cookie_updated', {name, value}))
    }
    deleteCookie(name) {
        cookie.remove(name, {
            domain: location.hostname,
            path: '/'
        })
        dispatchEvent(new CustomEvent('cookie_deleted', {name}))
    }
}
export default new CoreCookie()
