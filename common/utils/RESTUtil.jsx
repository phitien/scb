/* @flow weak */
/*
 * currying functions to do server calls
 */
import Cookies from 'js-cookie'
import RequestBuilder from './RequestBuilder'
import { toCamelCase, toSnakeCase } from './ObjectUtils'

const buildHeader = () => {
    const jwtToken = Cookies.get('app-jwt')

    if (jwtToken) {
        return {
            'X-CSRFToken': Cookies.get('csrftoken'),
            'Authorization': 'JWT ' + jwtToken,
            'Content-Type': 'application/json'
        }
    }
    return {
        'X-CSRFToken': Cookies.get('csrftoken'),
        'Content-Type': 'application/json'
    }
}

const _buildRequest = url => data => request =>
	request(url).
	addHeader(buildHeader()).
        addType('json').
        add('CrossOrigin', true).
        addData(data).
        build().then(response => response.data)

const save = RequestBuilder.post
const update = RequestBuilder.put
const fetch = RequestBuilder.get
const remove = RequestBuilder.delete
const options = RequestBuilder.options

const prepare = url => _buildRequest(url)

const convertAndPrepare = url => data => request => {
    const dataStr = JSON.stringify(toSnakeCase(data))
    return _buildRequest(url)(dataStr)(request).then(resp => toCamelCase(resp))
}

export {
    save, update, fetch, remove, options, prepare, convertAndPrepare
}
