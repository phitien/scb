const createAction = (action, payload) => {
    if (action instanceof Function) {
        return action(payload)
    } else {
        return {
            type: action,
            payload
        }
    }
    return {}
}

const executeCallbacks = apiResponse => callbacks => {
    if (callbacks && callbacks.constructor === Array) {
        callbacks.forEach(callback => {
            if (callback instanceof Function) callback(apiResponse)
        })
    }
    if (callbacks instanceof Function) callbacks(apiResponse)
}

const makeAsyncAction = (successAction, failureAction, service, normalizer, serviceArgsCreator) => (serviceOptions, successCallbacks, failureCallbacks) => dispatch => {
    if (service instanceof Function) {
        const mergedServiceOptions = serviceArgsCreator instanceof Function ? serviceArgsCreator(serviceOptions) : serviceOptions
        const sendRequest = mergedServiceOptions && mergedServiceOptions.constructor === Array ? service(...mergedServiceOptions) : service(mergedServiceOptions)
        if (sendRequest.then instanceof Function) {
            sendRequest
                .then(res => {
                    const payload = normalizer instanceof Function ? normalizer(res) : res
                    const action = createAction(successAction, payload)
                    dispatch(action)
                    executeCallbacks(res)(successCallbacks)
                })
                .catch(err => {
                    const action = createAction(failureAction)
                    dispatch(action)
                    executeCallbacks(err)(failureCallbacks)
                })
        }
    }
}

export {
    makeAsyncAction
}
