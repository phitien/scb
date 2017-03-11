import React from 'react'
import NavigationBaseComponent from 'apps/navigation/components/Component'
import LogoComponent from 'apps/navigation/components/Logo'
import UniversalMenuComponent from 'apps/navigation/components/UniversalMenu'
import SiteMenuComponent from 'apps/navigation/components/SiteMenu'
import ActionsMenuComponent from 'apps/navigation/components/ActionsMenu'
import SideNavigationComponent from 'apps/navigation/components/SideNavigation'
import SearchComponent from 'apps/navigation/components/Search'
import FollowUsComponent from 'apps/navigation/components/FollowUs'
import InfoMenuComponent from 'apps/navigation/components/InfoMenu'
import CopyRightComponent from 'apps/navigation/components/CopyRight'
import TermsAndConditionsComponent from 'apps/navigation/components/TermsAndConditions'

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
