import React from 'react'
import {connect} from 'react-redux'
import CoreViewport from '../../../common/core/CoreViewport'
import UserProfileService from '../services/Service'

export default class UserProfileViewport extends CoreViewport {
    init() {this.service = UserProfileService}
    get viewportClassName() {return 'user-profile'}
}
