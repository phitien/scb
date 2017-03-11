import React from 'react';
import CorePage from './CorePage';

export default class CorePageNoSidebar extends CorePage {
    get mainClassName() {return `${this.containerClassName} content-sidebar content-no-sidebar`}
    render() {
        return (
            <div className={this.className}>
                {this.content}
                {this.pageLoadingIndicator}
            </div>
        );
    }
}
