import React from 'react'
import CorePageLeftSidebar from 'common/core/CorePageLeftSidebar'
import CorePageRightSidebar from 'common/core/CorePageRightSidebar'
import CorePageNoSidebar from 'common/core/CorePageNoSidebar'
import UserProfileComponent from 'apps/user_profile/components/Component'
import UserProfileSideBar from 'apps/user_profile/components/SideBar'

export default class UserProfilePage extends UserProfileComponent {
    componentDidMount() {
        this.store.addChangeListener(this.refresh)
        this.authStore.addChangeListener(this.refresh)
    }
    componentWillUnmount() {
        this.store.removeChangeListener(this.refresh)
        this.authStore.removeChangeListener(this.refresh)
    }
    get mainClassName() {return 'user-profile-page'}
    get noSidebar() {return false}
    get leftSidebar() {return true}
    get sidebar() {return <UserProfileSideBar params={this.props.params}/>}
    get isBlockingScreen() {return this.store.pageLoading || this.store.requesting}
    render() {
        if (!this.user.isLoggedIn) return null
        if (this.noSidebar) return <CorePageNoSidebar renderer={this} className={this.className}
            isBlockingScreen={this.isBlockingScreen}
            />
        else if (this.leftSidebar) return <CorePageLeftSidebar renderer={this} className={this.className}
            isBlockingScreen={this.isBlockingScreen}
            />
        else return <CorePageRightSidebar renderer={this} className={this.className}
            isBlockingScreen={this.isBlockingScreen}
            />
    }
}
