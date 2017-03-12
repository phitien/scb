import React from 'react'
import UserProfileComponent from './Component'

export default class UserProfileContent extends UserProfileComponent {
    get content() {return null}
    render() {
        return this.content
    }
}
