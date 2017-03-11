import AppDispatcher from 'common/dispatchers/AppDispatcher'
import {EVENTS, CoreStore, CoreActions, CoreService} from 'common/core/CoreService'
import {save, update, fetch, remove} from 'common/utils/RESTUtil'
import NewModuleSettings from 'apps/new_module/Settings'

class Actions extends CoreActions {
}

class Store extends CoreStore {
    init = () => {

    }
}

class Service extends CoreService {
    get baseUrl() {
        return `/api/new-module`
    }
    fetch = () => console.log('No default api call')
}

const Constants = {
    LOAD_ITEMS: 'LOAD_NEW_MODULE_LISTS',
    LOAD_ITEMS_ERROR: 'LOAD_NEW_MODULE_LISTS_ERROR',
    HANDLE_ERROR: 'LOAD_NEW_MODULE_ITEM_ERROR',
}

export default new Service(Constants, new Store(), new Actions())
