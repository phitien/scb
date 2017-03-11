import React from 'react'
import NavigationBaseComponent from 'apps/navigation/components/Component'
import UserAccountWidgetComponent from 'apps/navigation/components/UserAccountWidget'
import LoginSignupBoxComponent from 'apps/navigation/components/LoginSignupBox'

export default class ActionsMenuComponent extends NavigationBaseComponent {
    get mainClassName() {return 'actions-menu'}

    render() {
        return <div className={this.className}>
            {this.user.isLoggedIn ? <UserAccountWidgetComponent /> : <LoginSignupBoxComponent />}
            <i className='icon-search' onClick={() => this.store.showSearchComponent = true}></i>
            <i className='menu-icon' onClick={() => this.store.showSideMenu = true}></i>
        </div>
    }
}
