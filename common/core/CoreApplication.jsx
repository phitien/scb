import React from 'react'
import ReactDOM from 'react-dom'
import {match, Router, browserHistory} from 'react-router'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import coreUtil from 'common/core/CoreUtil'

const location = typeof window != 'undefined' ? window.location : {hash: '', search: '', href: ''};

export const onEnterAuthenticated = (nextState, replace) => {
    coreUtil.setCookie('login-required', 1)
    coreUtil.setCookie('params', nextState.params)
}
export const onEnterUnauthenticated = (nextState, replace) => {
    coreUtil.setCookie('login-required', 0)
    coreUtil.setCookie('route-params', nextState.params)
}

export default class CoreApplication {
    get util() {return coreUtil}
    get history() {return browserHistory}
    static defaultStore = createStore(
        applyMiddleware(
            thunk
        )
    )
    get store() {return this._store}
    set store(v) {this._store = v}
    get routes() {return this._routes}
    set routes(v) {
        this._routes = v
        this.init()
    }
    init = () => {
        if (!this.store) throw 'Your have not set application store'
        this.render()
    }
    afterRender = () => {}
    render = () => ReactDOM.render(
        <Provider store={this.store}>
            <Router routes={this.routes} history={this.history}/>
        </Provider>,
        document.getElementById('content'),
        this.afterRender
    )
}
