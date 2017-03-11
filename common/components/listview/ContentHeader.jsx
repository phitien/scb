import React from 'react';
import BaseComponent from 'common/components/listview/BaseComponent';
import ContentHeaderCell from 'common/components/listview/ContentHeaderCell';

export default class ContentHeader extends BaseComponent {
    get mainClassName() {return 'tbl-header list-view-content-header';}

    render() {
        if (this.rendererHas('renderListViewHeader'))
            return this.renderer.renderListViewHeader();
        if (this.isNotATable === true) return null;
        if (this.hasNoItem) return null;
        var first = this.results[0];
        return (<thead className={this.className}><tr>
            {Object.keys(first).map((cellname, i) =>
                <ContentHeaderCell key={i}  {...this.properties}
                    rowdata={first}
                    cellname={cellname}
                    celldata={first[cellname]}
                    cellindex={i}/>)}
        </tr></thead>);
    }
}
