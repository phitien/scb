import AppDispatcher from 'common/dispatchers/AppDispatcher'
import {EVENTS, CoreStore, CoreActions, CoreService} from 'common/core/CoreService'
import {save, update, fetch, remove} from 'common/utils/RESTUtil'
import NavigationSettings from 'apps/navigation/Settings'
import Menus from 'apps/Menus'

EVENTS.sure('navigation', 'search_searchdata')

class Actions extends CoreActions {
    get settings(){return NavigationSettings}
}

class Store extends CoreStore {
    get settings(){return NavigationSettings}
    get rootPath() {return this.getProp('rootPath', this.settings.rootPath)}
    set rootPath(v) {this.setProp('rootPath', v, true)}
    get menus() {return this.getProp('menus', Menus)}
    get universalMenu() {return this.getProp('universalMenu', Menus.universalMenu)}
    get footerMenu() {return this.getProp('footerMenu', Menus.footerMenu)}
    get termsAndConditionsMenu() {return this.getProp('termsAndConditionsMenu', Menus.termsAndConditionsMenu)}
    get siteMenu() {return this.universalMenu.reduce((f, c, i) => {
        if (c.url == this.rootPath) f = c.children
        return f
    }, [])}
    get siteMenuItems() {return this.getProp('siteMenuItems', this.siteMenu)}
    set siteMenuItems(v) {this.setProp('siteMenuItems', v, true)}

    get modal() {return this.getProp('modal', null)}
    set modal(v) {
        this.setProp('modalMessage', null, false)
        this.setProp('modal', v, true)}
    get modalMessage() {return this.getProp('modalMessage', '')}
    set modalMessage(v) {this.setProp('modalMessage', v, true)}
    get globalMessage() {return this.getProp('globalMessage', '')}
    set globalMessage(v) {
        this.setProp('globalMessage', v, true)
        setTimeout(() => this.globalMessage = null, 5000)
    }

    get searchText() {return this.getProp('searchText', '')}
    set searchText(v) {this.setProp('searchText', v, true)}
    get showProfileMenu() {return this.getProp('showProfileMenu', false)}
    set showProfileMenu(v) {this.setProp('showProfileMenu', v, true)}
    get showSideMenu() {return this.getProp('showSideMenu', false)}
    set showSideMenu(v) {this.setProp('showSideMenu', v, true)}
    get showSearchComponent() {return this.getProp('showSearchComponent', false)}
    set showSearchComponent(v) {this.setProp('showSearchComponent', v, true)}

    get searchdata() {return this.getProp('searchdata')}
    set searchdata(v) {this.setProp('searchdata', v, true)}

}

class Service extends CoreService {
    get baseUrl() {return `/api/search`}
    get settings(){return NavigationSettings}
    fetch = (callback) => this.list(
        this.settings.searchPath,
        resp => this.actions.dispatch(EVENTS.get('navigation', 'search_searchdata'), resp),
        null, callback
    )
}

export default new Service(EVENTS.NAVIGATION, new Store(), new Actions())
