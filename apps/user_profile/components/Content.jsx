import React from 'react'
import UserProfileComponent from 'apps/user_profile/components/Component'

export default class UserProfileContent extends UserProfileComponent {
    get content() {return null}
    render() {
        return this.content
    }
}
