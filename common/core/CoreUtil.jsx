import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'
import _ from 'lodash'
import moment from 'moment'
import ObjectAssign from 'object-assign'
import coreCookie from './CoreCookie'

const location = typeof window != 'undefined' ? window.location : {hash: '', search: '', href: ''}

class CoreUtil {
    getPairs = (str) => {
        let rs = {}
        let pairs = str.split('&')
        for (var i = 0; i < pairs.length; i++) {
            let pair = pairs[i]
            if (pair.indexOf('=') > 0) {
                pair = pair.split('=')
                rs[pair[0]] = pair[1]
            }
            else rs[pair] = true
        }
        return rs
    }
    get history() {return browserHistory}
    get hash() {return this.getPairs((location.hash ? location.hash : '#').slice(1))}
    get queries() {return this.getPairs((location.search ? location.search : '?').slice(1))}
    get currencies() {
        return {
            'USD': {code: 'USD', sign: 'US$', name: 'US dollar'},
            'SGD': {code: 'SGD', sign: 'S$', name: 'Singapore dollar'}
        }
    }
    assign(target, source) {return ObjectAssign.apply(this, arguments)}
    getCurrency = code => this.currencies[code]
    numberWithCommas = x => this.formatNumber(x, ',')
    formatNumber = (x, s) => x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, s) : 0
    getMonth = i => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',' Oct', 'Nov', 'Dec'][i]
    isEmpty = o => _.isEmpty(o)
    isNumber = o => typeof o == 'number' || (o && parseFloat(o.toString().replace(/,/g,'')))
    numberOf = o => typeof o == 'number' ? o : o && parseFloat(o.toString().replace(/,/g,'')) ? parseFloat(o.toString().replace(/,/g,'')) : 0
    valueOf = (o, d) => this.isEmpty(o) ? d : o
    amountOf = (o) => this.numberWithCommas(o)
    convertMoney = (o, origin, converting, rates) => this.numberOf(o)*this.exchangeRate(origin, converting, rates)
    exchangeRate = (origin, converting, rates) => (
        origin == converting ||
        !rates ||
        (!rates[origin] && !rates[converting]) ||
        (rates[origin] && !rates[origin][converting]) ||
        (rates[converting] && !rates[converting][origin])
    ) ? 1 : rates[origin] ? rates[origin][converting] : 1/rates[converting][origin]
    idOf = (o, n) => new Array(n).join('0').slice((n || 2) * -1) + o
    dateOf = o => moment(o).format('MMMM Do YYYY')
    beautyDateOf = o => moment(o).format('MMMM Do YYYY')
    random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

    props = (origin, excluded) => {
        let props = {}
        Object.keys(origin).map(k => {
            if (origin.hasOwnProperty(k) && excluded.indexOf(k) < 0) {
                props[k] = origin[k]
            }
        })
        return props
    }

    hidePopup = el => jQuery(el).modal('hide')
    showPopup = (el, opts) => jQuery(el).modal(opts ? opts : 'show')
    openNewTab = link => window.open(link, '_blank')
    redirect = link => window.open(link)

    addAppStylesAndJSScripts = () => {}
    addJsScript = (src, id, innerHTML) => this.appendTag('script', {src}, id, innerHTML)
    addCssLink = (href, id) => this.addLink(href, {type: 'text/css',rel: 'stylesheet',}, id)
    addLink = (href, props, id) => this.appendTag('link', {href, ...props}, id)
    addMeta = (name, content, id) => this.appendTag('meta', {name, content}, id)
    appendTag = (tagName, props, id, innerHTML) => {
        if (typeof document == 'undefined' || document.getElementById(id)) return
        let tags    = document.getElementsByTagName(tagName),
            last    = tags[tags.length - 1],
            tag     = document.createElement(tagName)
        tag.id  = id
        Object.keys(props).map((k) => {
            if (props[k]) tag[k] = props[k]
        })
        if (innerHTML) try {tag.innerHTML = innerHTML} catch(e) {}
        last.parentNode.insertBefore(tag, last.nextSibling)
    }

    getCookie = name => coreCookie.getCookie(name)
    setCookie = (name, value, expiryDays) => coreCookie.setCookie(name, value, expiryDays)
    deleteCookie = (name) => coreCookie.deleteCookie(name)

    getQueryValue = name => {
        var url = location.href
        var name = name.replace(/[\[\]]/g, '\\$&')
        var regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
            results = regex.exec(url)
        if (!results) return null
        if (!results[2]) return ''
        return decodeURIComponent(results[2].replace(/\+/g, ' '))
    }
    isServerSideRendering = () => typeof window == 'undefined'
    noop = () => {}
}
export default new CoreUtil()
