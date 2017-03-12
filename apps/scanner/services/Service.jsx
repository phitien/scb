import {EVENTS, CoreStore, CoreActions, CoreService} from '../../../common/core/CoreService'

EVENTS.sure('scanner', 'fetch_griddata')

class Actions extends CoreActions {
}

class Store extends CoreStore {
    get griddata() {return this.getProp('griddata', [
        { id: 1, col1: 'Row 1.1' },
        { id: 2, col1: 'Row 2.1' },
        { id: 3, col1: 'Row 3.1' },
        { id: 4, col1: 'Row 4.1' },
        { id: 5, col1: 'Row 5.1' },
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
