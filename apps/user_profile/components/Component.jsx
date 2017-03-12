import React from 'react'
import CoreComponent from '../../../common/core/CoreComponent'
import UserProfileService from '../services/Service'

export default class UserProfileComponent extends CoreComponent {
    init() {this.service = UserProfileService}
}
