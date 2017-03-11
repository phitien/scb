import React from 'react';
import BaseComponent from 'common/components/listview/BaseComponent';

export default class ContentNoItem extends BaseComponent {
    get mainClassName() {return 'tbl-body tbl-body-no-item list-view-content-no-item';}

    render() {
        if (this.rendererHas('renderListViewNoItem')) return this.renderer.renderListViewNoItem();
        if (this.isNotATable === true) {
            return (<div className={this.className}>There is no item</div>);
        }
        return (<tbody className={this.className}><tr><td>There is no item</td></tr></tbody>);
    }
}
