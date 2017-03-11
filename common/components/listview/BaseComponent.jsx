import React from 'react'
import _ from 'lodash'
import CoreComponent from 'common/core/CoreComponent'

export default class BaseComponent extends CoreComponent {
    get service() {return this.props.service}
    get results() {return this.store.results}
    get hasNoItem() {return this.store.hasNoItem}
    get noPagination() {return this.store.noPagination}
    get properties() {return _.pick(this.props, ['service', 'toolbarItems', 'renderer', 'hidePagination', 'hidePageSize', 'type'])}
    get renderer() {return this.props.renderer}
    get isNotATable() {return this.rendererHas('isNotATable') ? this.renderer.isNotATable : false}
    get numItems() {return this.rendererHas('numItems') ? this.renderer.numItems : this.results.length}

    rendererHas = (property) => this.renderer && this.renderer[property]
}
