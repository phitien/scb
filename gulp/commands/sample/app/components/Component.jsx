import react from 'react'
import CoreComponent from 'common/core/CoreComponent'
import NewAppService from 'apps/new_app/services/Service'

export default class NewAppComponent extends CoreComponent {
    init() {this.service = NewAppService}
}
