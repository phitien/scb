import React from 'react';
import BaseComponent from 'common/components/listview/BaseComponent';

export default class ContentHeaderCell extends BaseComponent {
    get mainClassName() {return `tbl-header-cell list-view-content-header-cell ${this.props.cellname}`;}

    render() {
        if (this.rendererHas('renderListViewHeaderCell'))
            return this.renderer.renderListViewHeaderCell(
                this.props.rowdata,
                this.props.celldata,
                this.props.cellname,
                this.props.cellindex,
            );
        return (<th className={this.className}>{this.props.cellname}</th>);
    }
}
