import React from 'react'
import NavigationBaseComponent from './Component'

export default class UserAccountWidgetComponent extends NavigationBaseComponent {
    get mainClassName() {return 'user-widget'}
    get profileMenu() {
        if (!this.store.showProfileMenu) return null
        return <ul className='profile-menu'>
            <li><a href='/app/user-profile'><span>My Profile</span></a></li>
            <li><a onClick={(e) => this.authService.logout('', '/api/logout')}><span>Log out</span></a></li>
        </ul>
    }

    componentDidMount() {
        addEventListener('mousedown', this.viewportClick, false);
    }
    viewportClick = (e) => this.store.showProfileMenu = jQuery(e.target).closest(`.${this.mainClassName}`).length > 0
    showProfileMenu = (e) => this.store.showProfileMenu = !this.store.showProfileMenu
    render() {
        return <div className={this.className}>
            <div className ='user-profile-info'>
                <div className='picture' style={{backgroundImage: `url(${this.user.profilePic})`}}></div>
                <div className='firstname'>{this.user.firstName}</div>
            </div>
            {this.profileMenu}
        </div>
    }
}
