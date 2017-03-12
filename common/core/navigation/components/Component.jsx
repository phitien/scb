import React from 'react'
import CoreComponent from '../../CoreComponent'
import NavigationSettings from '../Settings'

export default class NavigationBaseComponent extends CoreComponent {
    init() {this.service = this.navigationService}
    get settings() {return NavigationSettings}
}
