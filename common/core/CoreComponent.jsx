import React from 'react'
import ReactDOM from 'react-dom'
import CoreUser from './CoreUser'
import CoreUtil from './CoreUtil'
import {formatDatetime} from 'common/utils/DateTimeUtils'
import AuthenticationService from 'apps/authentication/services/AuthenticationServices'
import AuthStore from 'apps/authentication/stores/AuthStore'
import NavigationService from 'apps/navigation/Service'

const location = typeof window != 'undefined' ? window.location : {hash: '', search: '', href: ''};

export default class CoreComponent extends React.Component {
    constructor(props) {
        super(props)
        this.util = new CoreUtil()
        this._service = null
        this.state = {refresh: false}
        this.init()
    }
    init() {}
    componentDidMount() {this._mounted = true}
    componentWillUnmount() {this._mounted = false}

    get routeParams() {return this.util.getCookie('route-params')}

    get authStore() {return AuthStore}
    get authService() {return AuthenticationService}
    get navigationService() {return this.service && this.service == NavigationService ? this.service : NavigationService}
    get navigationStore() {return this.navigationService.store}
    get modal() {return this.navigationStore.modal}
    set modal(v) {
        this.navigationStore.modal = null
        this.navigationStore.modal = v}
    get modalMessage() {return this.navigationStore.modalMessage}
    set modalMessage(v) {this.navigationStore.modalMessage = v}
    get globalMessage() {return this.navigationStore.globalMessage}
    set globalMessage(v) {this.navigationStore.globalMessage = v}

    get service() {return this._service}
    set service(v) {this._service = v}
    get store() {return this.service ? this.service.store : null}
    get actions() {return this.service ? this.service.actions : null}
    get history() {return this.util.history}
    get gec_lates_data() {return this.props.hasOwnProperty('gec_latest_data') ? this.props.gec_latest_data : {}}
    get isMounted() {return this._mounted}
    get dom() {return jQuery(ReactDOM.findDOMNode(this))}
    get user() {return new CoreUser()}
    get isLoggedIn() {return this.user.isLoggedIn}
    get mainClassName() {return ''}
    get className() {return this.mainClassName + ' ' + (this.props.className ? this.props.className : '')}
    get uuid() {
        if (!this._uuid) this._uuid = 'gec_' + (new Date()).valueOf() + Math.random().toFixed(16).substring(2)
        return this._uuid
    }
    get showLogin() {return !this.user.isLoggedIn && (location.hash == '#login' || this.util.getCookie('login-required') == 1)}
    get showResetPassword() {return location.pathname == '/business-vault/reset-password'}
    refresh = (state) => {
        this.util.assign(this.state, state , {
            refresh: !this.state.refresh
        })
        this.setState(this.state, this.onAfterRefresh)
    }
    onAfterRefresh = () => {}
    renderChild = (child, i) => {
        try {
            var me = this
            var addonProps = {key:i}
            return React.cloneElement(child, addonProps)
        } catch (e) {
            return null
        }
    }
    onLogoutOut = (e) => this.user.logout()
    validate = () => this.removeError()
    validateFieldEmail = (field, message) => {
        const regex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (regex.test(this[field].value)) return true
        this.setError(field, message)
    }
    validateFieldNotEmpty = (field, message) => {
        if (this[field].value) return true
        this.setError(field, message)
    }
    validateFieldMinLength = (field, minLength, message) => {
        if (this[field].value && this[field].value.length >= minLength) return true
        this.setError(field, message)
    }
    validateFieldMaxLength = (field, maxLength, message) => {
        if (this[field].value && this[field].value.length <= maxLength) return true
        this.setError(field, message)
    }
    validateValuesMatched = (field1, field2, message) => {
        if (this[field1].value == this[field2].value) return true
        this.setError(field2, message)
    }
    setError = (field, message) => this.setState({
        disabled: false,
        message: message,
        errorField: field
    })
    removeError = () => {
        this.setState({
            message: null,
            errorField: null
        })
        return true
    }
}
