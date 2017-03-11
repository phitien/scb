import React from 'react'
import CoreComponent from 'common/core/CoreComponent'
import NavigationSettings from 'apps/navigation/Settings'

export default class NavigationBaseComponent extends CoreComponent {
    init() {this.service = this.navigationService}
    get settings() {return NavigationSettings}
}
