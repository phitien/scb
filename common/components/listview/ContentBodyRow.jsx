import React from 'react';
import BaseComponent from 'common/components/listview/BaseComponent';
import ContentBodyCell from 'common/components/listview/ContentBodyCell';

export default class ContentBodyRow extends BaseComponent {
    get mainClassName() {return 'tbl-row list-view-content-body-row';}

    render() {
        if (this.rendererHas('renderListViewBodyRow'))
            return this.renderer.renderListViewBodyRow(
                this.props.rowdata,
                this.props.rowindex,
            );
        if (this.isNotATable === true) {
            return (<div className={this.className}>
                {Object.keys(this.props.rowdata).map((cellname, i) =>
                    <ContentBodyCell {...this.properties}
                        rowdata={this.props.rowdata}
                        rowindex={this.props.rowindex}
                        celldata={this.props.rowdata[cellname]}
                        cellname={cellname}
                        cellindex={i} />)}
            </div>);
        }
        return (<tr className={this.className}>
            {Object.keys(this.props.rowdata).map((cellname, i) =>
                <ContentBodyCell {...this.properties}
                    rowdata={this.props.rowdata}
                    rowindex={this.props.rowindex}
                    celldata={this.props.rowdata[cellname]}
                    cellname={cellname}
                    cellindex={i} />)}
        </tr>);
    }
}
