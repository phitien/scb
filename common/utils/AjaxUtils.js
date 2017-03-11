// import reqwest from 'reqwest';
import request from 'superagent';
import axios from 'axios';
import Cookies from 'js-cookie';
import log from 'loglevel';

import MessageActions from 'common/message/MessageActions';
import AuthenticationServices from 'apps/authentication/services/AuthenticationServices';

var send = function(jsonStr, url, method, cbError, cbSuccess) {
    log.debug('url: ', url);
    log.debug('jsonStr: ', jsonStr);
    if (typeof window !== 'undefined') {
        let csrfToken = Cookies.get('csrftoken');
        try {
            axios({
                url: url,
                method: method,
                data: jsonStr,
                // timeout: 3000,
                headers: {
                    'X-CSRFToken': csrfToken,
                    'Content-Type': 'application/json'
                },
                validateStatus: function (status) {
                    // return status >= 200 && status < 1000; // default
                    return true;
                }
            })
            .then(function handeResponse(resp) {
                log.info('HTTP response status', resp.status);
                if (resp && resp.status === 200) {
                    log.info('success', resp);
                    if (cbSuccess) cbSuccess(resp.data);
                }
                else {
                    log.error('status not 200', resp);
                    handleErrorDefault(resp);
                }
            })
            // .catch(function handeException(resp) {
            //     log.error('exception caught', resp);
            //     // handleErrorDefault(resp, cbError);
            //     throw new Error('HTTP request error');
            // });
        } catch (e) {
            log.error('error with the http request', e.stack);
        }
    } else {
        logger.error('this cannot be used on server');
        log.error('this cannot be used on server');
        return;
    }
}

function handleErrorDefault(resp, cbError) {
    log.debug('handleErrorDefault');
    if (resp && resp.status && resp.status === 401) {
        switch (resp.status) {
            case 401:
            log.error('user is logged out in backend');
            let message = {unknown: 'You have been logged out due to a permission issue, please try to log in again'};
            AuthenticationServices.logout(message);
            break;
            case 404:
            log.warn('not found', resp);
            break;
            default:
            log.error('unknown error');
        }
    }
    // MessageActions.addError('cms authentication error', resp, true);
    if (cbError) cbError(resp);
}

module.exports = { send };
