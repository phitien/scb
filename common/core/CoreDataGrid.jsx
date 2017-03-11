import React from 'react'
import CoreComponent from './CoreComponent'
import Modal from 'react-modal'

export default class CoreDataGrid extends CoreComponent {
    get mainClassName() {return `core-data-grid ${this.gridClassName}`}
    get gridClassName() {return ''}
    get columns() {return this.props.columns}
    get header() {return <thead>
        {this.columns.map((item,i) => <th>{item.name}</th>)}
    </thead>}
    get body() {return null}
    get footer() {return null}
    render() {
        return <table className={this.className}>
            {this.header}
            {this.body}
            {this.footer}
        </table>
    }
}
