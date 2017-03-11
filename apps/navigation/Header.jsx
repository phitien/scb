import React from 'react'
import { Provider } from 'react-redux'
import NavigationBaseComponent from 'apps/navigation/components/Component'
import LogoComponent from 'apps/navigation/components/Logo'
import UniversalMenuComponent from 'apps/navigation/components/UniversalMenu'
import SiteMenu from 'apps/navigation/components/SiteMenu'
import ActionsMenuComponent from 'apps/navigation/components/ActionsMenu'
import SideNavigationComponent from 'apps/navigation/components/SideNavigation'
import SearchComponent from 'apps/navigation/components/Search'
import AppStore from 'apps/AppStore'
import LoginModal from 'apps/navigation/modals/LoginModal'
import ResetPasswordModal from 'apps/navigation/modals/ResetPasswordModal'
import MessageComponent from 'apps/navigation/components/Message'

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
