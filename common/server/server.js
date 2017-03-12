/**
 * Express server
 */
import Express from 'express'
import hbs from 'express-handlebars'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { Provider } from 'react-redux'
import { Promise } from 'bluebird'
import ObjectAssign from 'object-assign'
import bodyParser from 'body-parser'
import fs from 'fs'
import { toCamelCase } from '../utils/ObjectUtils'
import logger from './logger'

const LOG_LEVEL = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'warn'

logger.info(`Log level: ${LOG_LEVEL}`)

process.on('unhandledRejection', (reason, promise) => logger.error(reason))

export default class Server {
    constructor() {
        this._server = new Express()
    }
    get port() {return this._port}
    set port(v) {this._port = v}
    get views() {return this._view_tmp_dir}
    set views(v) {this._view_tmp_dir = v}
    get template() {return this._template}
    set template(v) {this._template = v}
    get store() {return this._store}
    set store(v) {this._store = v}
    get title() {return this._title}
    set title(v) {this._title = v}
    get meta_description() {return this._meta_description}
    set meta_description(v) {this._meta_description = v}
    get meta_keywords() {return this._meta_keywords}
    set meta_keywords(v) {this._meta_keywords = v}
    get meta() {return this._meta}
    set meta(v) {this._meta = v}
    get response() {return this._response}
    set response(v) {this._response = v}
    get request() {return this._request}
    set request(v) {this._request = v}

    get status() {return this._status ? this._status : 200}
    set status(v) {this._status = v}
    get props() {return this._props ? this._props : {}}
    set props(v) {this._props = v}
    get server() {return this._server}
    set server(v) {this._server = v}
    get data() {return this._data}
    set data(v) {this._data = v}
    get error() {return this._error}
    set error(v) {
        if (v) this.logger.error('**** Server Error: ', v)
        if (this.log_level == 'debug') {
            // this.status = 500
            // this._error = v
        }
    }
    get logger() {return console}
    get log_level() {return LOG_LEVEL}
    get params() {return this._params ? this._params : {
        title: this.title,
        meta_description: this.meta_description,
        meta_keywords: this.meta_keywords,
        meta: this.meta,
        html: this.html,
        error: this.error ? this.error.toString() : '',
        data: this.data,
    }}
    fetchMenu = () => Promise.all([])
    get handler() {return this._handler ? this._handler : function(props) {this.render(props)}}
    set handler(v) {this._handler = v}
    html = (props) => {
        try {
            this.status = 200
            return renderToString(
                <Provider store={this.store}><RouterContext {...props} /></Provider>
            )
        } catch (err) {
            this.error = err
            return ''
        }
    }
    render = (props) => {
        this.props = props
        if(!this.response.headersSent)
        this.response.status(this.status ? this.status : 200).render(
            this.status == 200 ? this.template : `${this.status}.html`,
            ObjectAssign({}, this.params, {html: this.html(props)})
        )
    }
    run = () => {
        const me = this
        me.server.engine('html', hbs({extname: 'html'}))
        me.server.set('view engine', 'html')
        me.server.set('views', me.views)
        me.server.locals.settings['x-powered-by'] = false
        //Handle error
        me.server.use((err, req, res, next) => {
            me.request = req
            me.response = res
            if (me.response.headersSent) return next(err)
            else {
                me.error = err
                return me.render()
            }
        })
        //Handle request
        me.server.use(bodyParser.json())
        me.server.use(bodyParser.urlencoded({ extended: true }))
        me.server.get('*', (req, res, next) => {
            me.request = req
            me.response = res
            match({routes: me.routes, location: me.request.url }, (err, redirect, props) => {
                if (!err && !redirect && !props) return me.render()
                if (err) {
                    me.logger.info('error')
                    me.error = err
                    return me.render(props)
                }
                else if (redirect) {
                    me.logger.info('redirect')
                    return me.response.redirect(302, `${redirect.pathname}${redirect.search}`)
                }
                else {
                    me.logger.info('normal')
                    me.handler(props)
                }
            })
        })
        me.server.listen(me.port, () => {
            me.logger.info(`Server listening on port ${me.port}, ${process.env.NODE_ENV} enviroment`)
            me.logger.info(`Template folder is ${me.views}`)
            me.logger.info(`Template is ${me.template}`)
        })
    }
}
