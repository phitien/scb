import React from 'react'
import NavigationBaseComponent from './Component'
import UserAccountWidgetComponent from './UserAccountWidget'
import LoginSignupBoxComponent from './LoginSignupBox'
import FollowUsComponent from './FollowUs'

const location = typeof window != 'undefined' ? window.location : {hash: '', search: '', href: ''};

export default class SideNavigationComponent extends NavigationBaseComponent {
    get mainClassName() {return 'side-navigation'}
    get extraMenu() {
        return this.user.isLoggedIn ? [
            {url: '/about-us', title: 'About', className: 'extra'},
            {url: '/contact-us', title: 'Contact Us', className: 'extra'},
            {url: '/app/user-profile', title: 'My Profile', className: 'extra'},
            {onClick: (e) => this.authService.logout('', '/api/logout'), title: 'Log out', className: 'extra'},
        ] : [
            {url: '/about-us', title: 'About', className: 'extra'},
            {url: '/contact-us', title: 'Contact Us', className: 'extra'},
        ]
    }
    get followUs() {return <FollowUsComponent />}
    get universalMenu() {return <ul className='side-universal-menu'>
        {this.store.universalMenu.concat(this.extraMenu).map((item,i) => <li key={i}
            className={`${item.expanded ? 'expanded' : ''} ${item.url == this.store.rootPath ? 'active' : 'not-active'} ${item.className ? item.className : ''}`}>
            {this.link(item)}
            {this.icon(item)}
            {this.subMenu(item.children)}
        </li>)}
    </ul>}

    link = (item) => !item.url || location.pathname == item.url ?
        (item.onClick ? <a onClick={item.onClick}><span>{item.title}</span></a> : <a><span>{item.title}</span></a>) :
        <a href={item.url}><span>{item.title}</span></a>
    icon = (item) => {
        return !item.children ? null : item.expanded ? <div className='do-collapse' onClick={() => {
            item.expanded = false
            this.store.emitChange()
        }}></div> : <div className='do-expand' onClick={() => {
            this.store.universalMenu.map(item => item.expanded = false)
            item.expanded = true
            this.store.emitChange()
        }}></div>
    }
    subMenu = (children) => children ? <ul>
        {children.map((item,i) => <li key={i}>
            {this.link(item)}
            {this.subMenu(item.children)}
        </li>)}
    </ul> : null
    onCloseNavigation = () => this.store.showSideMenu = false
    render() {
        return <div className={this.className}>
            <div className='side-navigation-close-area' onClick={this.onCloseNavigation}></div>
            <div className='side-navigation-content'>
                {this.user.isLoggedIn ? <UserAccountWidgetComponent /> : <LoginSignupBoxComponent />}
                {this.universalMenu}
                {this.followUs}
                <i className='side-navigation-close-icon' onClick={this.onCloseNavigation}></i>
            </div>
        </div>
    }
}
