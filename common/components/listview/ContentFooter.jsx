import React from 'react';
import BaseComponent from 'common/components/listview/BaseComponent';

export default class ContentFooter extends BaseComponent {
    get mainClassName() {return 'tbl-footer list-view-content-footer';}

    render() {
        if (this.rendererHas('renderListViewFooter'))
            return this.renderer.renderListViewFooter();
        if (this.isNotATable === true) {
            return null;
        }
        return <tfoot className={this.className}></tfoot>;
    }
}
