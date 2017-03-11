import React from 'react'
import ReactDOM from 'react-dom'
import {match, Router, browserHistory} from 'react-router'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import { userHasValidToken } from 'common/utils/AuthUtil'
import CoreUtil from 'common/core/CoreUtil'

const location = typeof window != 'undefined' ? window.location : {hash: '', search: '', href: ''};

export const isServerSideRendering = () => typeof window == 'undefined'
export const onEnterAuthenticated = (nextState, replace) => {
    const util = new CoreUtil()
    util.setCookie('login-required', 1)
    util.setCookie('params', nextState.params)
}
export const onEnterUnauthenticated = (nextState, replace) => {
    const util = new CoreUtil()
    util.setCookie('login-required', 0)
    util.setCookie('route-params', nextState.params)
}

export default class CoreApplication {
    static defaultStore = createStore(
        applyMiddleware(
            thunk
        )
    )
    constructor() {
        this.util = new CoreUtil
    }
    get store() {return this._store}
    set store(v) {this._store = v}
    get routes() {return this._routes}
    set routes(v) {
        this._routes = v
        this.init()
    }
    init = () => {
        if (!this.store) throw 'Your have not set application store'
        try {//for server side rendering
            match({ routes: this.routes, location: location.pathname }, (error, redirect, props) => this.render())
        } catch (e) {//normal rendering
            this.render()
        }
    }
    afterRender = () => {}
    render = () => ReactDOM.render(
        <Provider store={this.store}>
            <Router routes={this.routes} history={browserHistory}/>
        </Provider>,
        document.getElementById('content'),
        this.afterRender
    )
}
