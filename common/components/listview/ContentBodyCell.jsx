import React from 'react';
import BaseComponent from 'common/components/listview/BaseComponent';

export default class ContentBodyCell extends BaseComponent {
    get mainClassName() {return 'tbl-cell list-view-content-body-cell';}

    render() {
        if (this.rendererHas('renderListViewBodyCell'))
            return this.renderer.renderListViewBodyCell(
                this.props.rowdata,
                this.props.rowindex,
                this.props.celldata,
                this.props.cellindex,
                this.props.cellname,
            );
        if (this.isNotATable === true)
            return (<div className={this.className}>{JSON.stringify(this.props.celldata)}</div>);
        return (<td className={this.className}>{JSON.stringify(this.props.celldata)}</td>);
    }
}
