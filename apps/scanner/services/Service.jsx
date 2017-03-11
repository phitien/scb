import {EVENTS, CoreStore, CoreActions, CoreService} from 'common/core/CoreService'

EVENTS.sure('scanner', 'fetch_griddata')

class Actions extends CoreActions {
}

class Store extends CoreStore {
    get griddata() {return this.getProp('griddata', [
        { id: 1, title: 'Title 1' },
        { id: 2, title: 'Title 2' },
        { id: 3, title: 'Title 3' },
        { id: 4, title: 'Title 4' },
        { id: 5, title: 'Title 5' },
    ])}
    set griddata(v) {this.setProp('griddata', v, true)}
}

class Service extends CoreService {
    get baseUrl() {
        return `/api/scanner`
    }
    fetch = () => null
}

export default new Service(EVENTS.SCANNER, new Store(), new Actions())
