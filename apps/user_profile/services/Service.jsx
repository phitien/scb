import {EVENTS, CoreStore, CoreActions, CoreService} from 'common/core/CoreService'

class Actions extends CoreActions {
}

class Store extends CoreStore {
    init = () => {

    }
}

class Service extends CoreService {
    get baseUrl() {
        return `/api/user-profile`
    }
    fetch = () => null
}

const Constants = {
    LOAD_ITEMS: 'load_user_profile_items',
    LOAD_ITEMS_ERROR: 'load_user_profile_items_error',
    HANDLE_ERROR: 'handle_user_profile_error',
}

export default new Service(Constants, new Store(), new Actions())
