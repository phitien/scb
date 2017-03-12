import {EVENTS, CoreStore, CoreActions, CoreService} from '../../../common/core/CoreService'

class Actions extends CoreActions {
}

class Store extends CoreStore {
    init = () => {

    }
}

class Service extends CoreService {
    get baseUrl() {
        return `/api/new-app`
    }
    fetch = () => null
}

const Constants = {
    LOAD_ITEMS: 'load_new_app_items',
    LOAD_ITEMS_ERROR: 'load_new_app_items_error',
    HANDLE_ERROR: 'handle_new_app_error',
}

export default new Service(Constants, new Store(), new Actions())
