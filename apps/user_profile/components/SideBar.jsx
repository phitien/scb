import React from 'react'
import UserProfileComponent from './Component'

const location = typeof window != 'undefined' ? window.location : {hash: '', search: '', href: ''};

export default class UserProfileSideBar extends UserProfileComponent {
    render() {
        return (
            <ul>
                <li className={location.pathname.replace(/\/$/gi, '') == '/apps/user-profile' ? 'active' : ''}><a href='/app/user-profile'><span>Account</span></a></li>
            </ul>
        )
    }
}
