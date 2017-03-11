import React from 'react';
import CorePage from './CorePage';

export default class CorePageLeftSidebar extends CorePage {
    get mainClassName() {return `${this.containerClassName} content-sidebar content-sidebar-left`}
    render() {
        return (
            <div className={this.className}>
                {this.sidebar}
                {this.content}
                {this.pageLoadingIndicator}
            </div>
        );
    }
}
