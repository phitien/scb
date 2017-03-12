import when from 'when'
import {EventEmitter} from 'events'
import AppDispatcher from '../dispatchers/AppDispatcher'
import {save, update, fetch, remove, convertAndPrepare} from '../utils/RESTUtil'
import coreUtil from './CoreUtil'
import events from './Events'

export const EVENTS = events

export const ObjectAssign = require('object-assign')

export const CoreServiceConstants = {
    LOAD_ITEMS: 'LOAD_ITEMS',
    LOAD_ITEMS_ERROR: 'LOAD_ITEMS_ERROR',
    HANDLE_ERROR: 'HANDLE_ERROR',
}

export const DEFAULT_PAGE_SIZE = 10
export const DEFAULT_PAGE = 1
export const DEFAULT_ORDERBY = '-id'

function getConstants(constants) {return ObjectAssign({}, CoreServiceConstants, constants)}

export class CoreActions {
    get util() {return coreUtil}
    dispatch = (actionType, resp) => AppDispatcher.dispatch({actionType, data: resp})
    loadlist(resp, message) {
        AppDispatcher.dispatch({
            actionType: this.constants.LOAD_ITEMS,
            data: resp,
            message: message
        })
    }
    handleError = (actionType, error) => AppDispatcher.dispatch({actionType, error})
    showError = (error) => this.handleError(this.constants.HANDLE_ERROR, error)
    loadlisterror = (error) => this.handleError(this.constants.LOAD_ITEMS_ERROR, error)
}

export class CoreStore extends EventEmitter {
    constructor() {
        super()
        this._data_storage = {}
        this.init()
    }
    get util() {return coreUtil}
    get constants() {return this._constants}
    set constants(v) {this.setConstants(v)}
    setConstants(v) {
        this._constants = v
        this.subscribe(() => this.register.bind(this))
    }
    showData() {console.log(this._data_storage)}
    getProp(p, d) {
        if (!this._data_storage.hasOwnProperty(p)) this._data_storage[p] = typeof d != 'undefined' ? d : null
        return this._data_storage[p]
    }
    setProp(p, v, e) {
        this._data_storage[p] = v
        if (e) this.emitChange()
        return this
    }
    subscribe = (actionSubscribe) => {
        try {
            if (actionSubscribe()) this.dispatchToken = AppDispatcher.register(actionSubscribe())
        } catch (e) {
            console.error(e.stack)
        }
    }
    emitChange = () => this.emit('CHANGE')
    addChangeListener = (cb) => this.on('CHANGE', cb)
    removeChangeListener = (cb) => this.removeListener('CHANGE', cb)
    get dispatchToken() {return this.getProp('dispatchToken')}
    set dispatchToken(v) {this.setProp('dispatchToken', v)}

    get pageLoading() {return this.getProp('pageLoading', false)}
    set pageLoading(v) {this.setProp('pageLoading', v, false)}
    get requesting() {return this.getProp('requesting', false)}
    set requesting(v) {this.setProp('requesting', v, false)}

    get maxNumber() {return this.getProp('maxNumber', 999999999)}
    set maxNumber(v) {this.setProp('maxNumber', v, true)}

    get page_size() {return this.getProp('page_size', DEFAULT_PAGE_SIZE)}
    set page_size(v) {this.setProp('page_size', v)}
    get page() {return this.getProp('page', DEFAULT_PAGE)}
    set page(v) {this.setProp('page', v)}
    get orderby() {return this.getProp('orderby', DEFAULT_ORDERBY)}
    set orderby(v) {this.setProp('orderby', v)}
    get filters() {return this.getProp('filters', {})}
    set filters(v) {this.setProp('filters', v)}
    get results() {return this.getProp('results', [])}
    set results(v) {this.setProp('results', v)}
    get next() {return this.getProp('next')}
    set next(v) {this.setProp('next', v)}
    get previous() {return this.getProp('previous')}
    set previous(v) {this.setProp('previous', v)}
    get error() {return this.getProp('error')}
    set error(v) {
        if (v) {
            let err = typeof v == 'string' ? {title: null, description: v} : v
            this.setProp('message', err.description)
            this.setProp('error', err, true)
        }
        else {
            this.setProp('message', null)
            this.setProp('error', null, true)}
        }
    get message() {return this.getProp('message')}
    set message(v) {this.setProp('message', v)}
    get count() {return this.getProp('count', 0)}
    set count(v) {this.setProp('count', v)}
    get defaultPageSize() {return DEFAULT_PAGE_SIZE}
    get defaultPage() {return DEFAULT_PAGE}
    get filterQueryString() {
        var queries = [`page=${this.page}`, `page_size=${this.page_size}`]
        for (var filter in this.filters) {
            if (this.filters.hasOwnProperty(filter)) {
                queries.push(`${filter.replace(/([A-Z])/g, '_$1').toLowerCase()}=${this.filters[filter]}`)
            }
        }
        queries.push('orderby=' + this.orderby)
        queries.push('rand=' + Math.random())
        return queries.join('&')
    }
    get hasNoItem() {return !this.results || !this.results.length}
    get numPages() {return this.hasNoItem ? 0 : Math.ceil(this.count/this.page_size)}
    get noPagination() {return this.numPages <= 1}
    get rates() {return this.getProp('rates', {})}
    set rates(v) {this.setProp('rates', v, true)}

    init() {}
    clear = () => this._data_storage = {}
    filter = (name, value) => {
        let filters = this.filters
        if (value !== undefined) return filters[name] = value
        else if (filters.hasOwnProperty(name)) return filters[name]
    }
    removeFilter = (name) => {if (this.filters.hasOwnProperty(name)) delete this.filters[name]}
    handleError = (action) => this.error = action.error
    setSuccess(o, message) {ObjectAssign(this, o.data, {message: message === true ? '' : message, error: null})}
    setMessage(message) {
        this.message = message
        this.emitChange()
    }
    setErrorMessage(message) {this.error = message}
    clearMessage() {ObjectAssign(this, {message: null, error: null})}
    /**
     * No overriden
     */
    register(action) {
        if (action.error) this.handleError(action)
        else
        switch (action.actionType) {
            case this.constants.LOAD_ITEMS:
                this.setSuccess(action, action.message)
                break
            default:
                this.handleChange(action)
                break
        }
    }
    /**
     * No overriden
     */
    handleChange(action) {
        if (action && action.actionType) {
            let actionType = action.actionType.toLowerCase()
            if (this.constants.hasOwnProperty(actionType)) {
                if (this.hasOwnProperty(actionType)) this[actionType](action.data)
                else {
                    const arr = actionType.split('_')
                    const prop = arr[arr.length - 1]
                    if (typeof this[prop] != 'undefined') this[prop] = action.data
                    else //Call function or set property manually
                        this.enhancedChangeHandler(action)
                }
            }
            else //Call function or set property manually
                this.enhancedChangeHandler(action)
        }
        else //Call function or set property manually
            this.enhancedChangeHandler(action)
    }
    /**
     * This function is for sub class to Override
     */
    enhancedChangeHandler(action) {

    }
}

export class CoreService {
    constructor(constants, store, actions) {
        this.util.assign(this, {store: store, actions: actions, constants: getConstants(constants)})
        this.util.assign(this.store, {service: this, constants: this.constants})
        this.util.assign(this.actions, {service: this, constants: this.constants})
    }
    get util() {return coreUtil}
    get successful() {return this._successful}
    set successful(v) {this._successful = v}
    get baseUrl() {return this.rest_uri ? this.rest_uri : `/api/`}
    showError = (title, error) => this.actions.showError({title, description: error, show: true})
    failure = error => this.showError('Server error', 'The server responses an error. Please verify your input.')
    rest = (url, data, method) => convertAndPrepare(url)(data)(method)
    restWithHandlers = (url, data, method, success, failure, callback) => {
        if (url) {
            this.store.requesting = true
            if (method == fetch) url = url.indexOf('?') >=0 ? `${url}${this.buildQuery(data)}` : `${url}?${this.buildQuery(data)}`
            let rest = this.rest(url, data, method)
            return rest.then(resp => {
                this.store.requesting = false
                this.successful = true
                success(resp)
                return resp
            }).catch(resp => {
                this.store.requesting = false
                this.successful = false
                if (failure) failure(resp)
                else this.failure(resp)
                return resp
            })
        }
        return this.noop()
    }
    buildUrl= (type, query) => `${this.baseUrl}/${type ? `${type}/` : ''}${query ? `?${query}` : ''}`
    buildFilterUrl= (type) => this.buildUrl(type, this.store.filterQueryString)
    buildQuery= json => json ? Object.keys(json).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(json[k] ? json[k] : '')}`).join('&') : ''

    query = (url, data, success, failure, callback) => this.restWithHandlers(url, data, fetch, success, failure ? failure : () => {}, callback)
    post = (url, data, success, failure, callback) => this.restWithHandlers(url, data, save, success, failure, callback)
    update = (url, data, success, failure, callback) => this.restWithHandlers(url, data, update, success, failure, callback)
    remove = (url, data, success, failure, callback) => this.restWithHandlers(url, data, remove, success, failure, callback)

    list = (type, success, failure, callback) => this.query(this.buildFilterUrl(type), {}, success, failure, callback)
    next = (success, failure, callback) => this.store.next ? this.query(this.store.next, {}, success, failure, callback) : null
    previous = (success, failure, callback) => this.store.previous ? this.query(this.store.previous, {}, success, failure, callback) : null
    /**
     * Override this function to fetch data
     */
    fetch = (callback) => {}
    noop = () => when(() => {})
}
