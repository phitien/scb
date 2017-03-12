import React from 'react'
import { Provider } from 'react-redux'
import AppStore from '../../../apps/AppStore'
import NavigationBaseComponent from './components/Component'
import LogoComponent from './components/Logo'
import UniversalMenuComponent from './components/UniversalMenu'
import SiteMenu from './components/SiteMenu'
import ActionsMenuComponent from './components/ActionsMenu'
import SideNavigationComponent from './components/SideNavigation'
import SearchComponent from './components/Search'
import LoginModal from './modals/LoginModal'
import ResetPasswordModal from './modals/ResetPasswordModal'
import MessageComponent from './components/Message'

export default class HeaderComponent extends NavigationBaseComponent {
    get mainClassName() {return 'container header-container'}
    get logo() {return <LogoComponent/>}
    get universalMenu() {return <UniversalMenuComponent/>}
    get siteMenu() {return <SiteMenu/>}
    get actionsMenu() {return <ActionsMenuComponent/>}
    get sideNavigation() {return this.store.showSideMenu ? <SideNavigationComponent/> : null}
    get searchComponent() {return this.store.showSearchComponent ? <SearchComponent/> : null}
    get message() {return <MessageComponent/>}

    componentDidMount() {
        this.store.addChangeListener(this.refresh)
        this.authStore.addChangeListener(this.showModal)
        if (this.props.rootPath) this.store.rootPath = this.props.rootPath
        addEventListener('hashchange', this.showModal, false)
        addEventListener('cookie_updated', this.showModal, false)
        addEventListener('cookie_deleted', this.showModal, false)
        addEventListener('beforeunload', () => this.util.deleteCookie('login-required'), false)
        this.showModal()
    }
    componentWillUnmount() {
        this.store.removeChangeListener(this.refresh)
        this.authStore.removeChangeListener(this.showModal)
    }

    showModal = () => this.modal = this.showResetPassword ? <ResetPasswordModal/> : (this.showLogin ? <LoginModal/> : null)

    render() {
        return(
            <Provider store={AppStore}>
                <div className={this.className}>
                    {this.message}
                    {this.modal}
                    <div className='container universal-navigation'>
                        {this.logo}
                        {this.universalMenu}
                        {this.actionsMenu}
                    </div>
                    <div className='site-navigation'>
                        <div className='container'>
                            {this.siteMenu}
                            <i className='icon-search' onClick={() => this.store.showSearchComponent = true}></i>
                        </div>
                    </div>
                    {this.sideNavigation}
                    {this.searchComponent}
                </div>
            </Provider>
        )
    }
}
