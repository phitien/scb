import React from 'react';
import CorePage from './CorePage';

export default class CorePageRightSidebar extends CorePage {
    get mainClassName() {return `${this.containerClassName} content-sidebar content-sidebar-right`}
    render() {
        return (
            <div className={this.className}>
                {this.content}
                {this.sidebar}
                {this.pageLoadingIndicator}
            </div>
        );
    }
}
