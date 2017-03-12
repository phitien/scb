import React from 'react'
import NavigationBaseComponent from './components/Component'
import LogoComponent from './components/Logo'
import UniversalMenuComponent from './components/UniversalMenu'
import SiteMenuComponent from './components/SiteMenu'
import ActionsMenuComponent from './components/ActionsMenu'
import SideNavigationComponent from './components/SideNavigation'
import SearchComponent from './components/Search'
import FollowUsComponent from './components/FollowUs'
import InfoMenuComponent from './components/InfoMenu'
import CopyRightComponent from './components/CopyRight'
import TermsAndConditionsComponent from './components/TermsAndConditions'

export default class FooterComponent extends NavigationBaseComponent {
    get mainClassName() {return 'container footer-container'}
    get logo() {return <LogoComponent/>}
    get universalMenu() {return <UniversalMenuComponent/>}
    get siteMenu() {return <SiteMenuComponent/>}
    get actionsMenu() {return <ActionsMenuComponent/>}
    get sideNavigation() {return this.store.showSideMenu ? <SideNavigationComponent/> : null}
    get searchComponent() {return this.store.showSearchComponent ? <SearchComponent/> : null}
    get followUs() {return <FollowUsComponent />}
    get infoMenu() {return <InfoMenuComponent />}
    get copyRight() {return <CopyRightComponent />}
    get termsAndConditions() {return <TermsAndConditionsComponent />}

    componentDidMount() {
        this.store.addChangeListener(this.refresh)
        this.authStore.addChangeListener(this.refresh)
    }

    componentWillUnmount() {
        this.store.removeChangeListener(this.refresh)
        this.authStore.removeChangeListener(this.refresh)
    }

    render() {
        return(
            <div className={this.className}>
                <div className='container container-desktop'>
                    <div className='logo-social-networks'>
                        {this.logo}
                        {this.copyRight}
                        {this.followUs}
                        {this.termsAndConditions}
                    </div>
                    {this.universalMenu}
                    {this.siteMenu}
                    {this.infoMenu}
                </div>
                <div className='container container-tablet'>
                    <div className='menus'>
                        {this.universalMenu}
                        {this.siteMenu}
                        {this.infoMenu}
                    </div>
                    <div className='info'>
                        {this.followUs}
                        {this.copyRight}
                        {this.termsAndConditions}
                    </div>
                </div>
                <div className='container container-mobile'>
                    {this.universalMenu}
                    <div className='menus'>
                        {this.siteMenu}
                        {this.infoMenu}
                    </div>
                    <div className='info'>
                        {this.followUs}
                        {this.copyRight}
                        {this.termsAndConditions}
                    </div>
                </div>
            </div>
        )
    }
}
