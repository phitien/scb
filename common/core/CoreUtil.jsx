import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import cookie from 'react-cookie'
import {formatDatetime} from 'common/utils/DateTimeUtils'
import DateTimeFormatter from 'common/utils/DateTimeFormatter'
import ObjectAssign from 'object-assign'
import { browserHistory } from 'react-router'

const location = typeof window != 'undefined' ? window.location : {hash: '', search: '', href: ''};

export default class CoreUtil {
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
    dateOf = o => formatDatetime(o, 'MMMM Do YYYY')
    beautyDateOf = o => DateTimeFormatter.formatDatetime(o)
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

    addAppStylesAndJSScripts = () => {
        this.addStuffGoogle()
        this.addStuffFacebook()
        this.addStuffLinkedIn()
        this.addStuffOneSignal()
        this.addStyles()
    }
    addStuffFacebook = () => {
        this.addJsScript('//connect.facebook.net/en_US/sdk.js', 'facebook-jssdk')
        if (!this.isServerSideRendering()) {
            const FB_APP_ID = "1563228833967568"
            window.fbAsyncInit = function() {
                FB.init({
                    appId      : FB_APP_ID,
                    xfbml      : true,
                    version    : 'v2.5',
                    status     : true
                })
            }
        }
    }
    addStuffGoogle = () => {
        this.addJsScript(null, 'google-tag-manager', `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-W8K93S');`)
    }
    addStuffLinkedIn = () => {
        this.addJsScript('//platform.linkedin.com/in.js', 'linkedin-sdk',
        `api_key: 78x0bfyd7eg3mb
        authorize: true`)
    }
    addStuffOneSignal = () => {
        this.addLink('/manifest.json', {rel: 'manifest'}, 'onesignal-manifest')
        this.addJsScript('//cdn.onesignal.com/sdks/OneSignalSDK.js', 'onesignal-sdk')
    }
    addStyles = () => {
        this.addCssLink('/public/static/css/dist/css/react-bootstrap-table-all.min.css', 'bootstrap-table-css')
    }
    addJsScript = (src, id, innerHTML) => {
        this.appendTag('script', {src}, id, innerHTML)
    }
    addCssLink = (href, id) => {
        this.addLink(href, {
            type: 'text/css',
            rel: 'stylesheet',
        }, id)
    }
    addLink = (href, props, id) => {
        this.appendTag('link', {
            href, ...props
        }, id)
    }
    addMeta = (name, content, id) => {
        this.appendTag('meta', {name, content}, id)
    }
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
    getCookie = cname => cookie.load(cname)
    get JWTToken() {return this.getCookie('af-jwt')}
    get CSRFToken() {return this.getCookie('csrftoken')}
    setCookie(cname, cval, expiryDays) {
        cookie.save(cname, cval, {
            expires: expiryDays,
            domain: location.hostname,
            path: '/'
        })
        if (typeof window != 'undefined') {
            dispatchEvent(new CustomEvent('cookie_updated', {name: cname, value: cval}))
        }
    }
    deleteCookie(cname) {
        cookie.remove(cname, {
            domain: location.hostname,
            path: '/'
        })
        if (typeof window != 'undefined') {
            dispatchEvent(new CustomEvent('cookie_deleted', {name: cname}))
        }
    }
    getQueryValue(name) {
        var url = location.href
        var name = name.replace(/[\[\]]/g, '\\$&')
        var regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
            results = regex.exec(url)
        if (!results) return null
        if (!results[2]) return ''
        return decodeURIComponent(results[2].replace(/\+/g, ' '))
    }
    isServerSideRendering = () => typeof window == 'undefined'
    noop = () => {
        //do nothing, this function is importantly created to do nothing, so please do not do anything here
    }
}
