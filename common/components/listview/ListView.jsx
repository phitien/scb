import React from 'react';
import BaseComponent from 'common/components/listview/BaseComponent';
import Content from 'common/components/listview/Content';
import ListViewToolbar from 'common/components/listview/ListViewToolbar';
import ListViewPagination from 'common/components/listview/ListViewPagination';

export default class ListView extends BaseComponent {
    get mainClassName() {
        return  'list-view ' + (this.noPagination ? 'no-pagination ' : '');
    }
    get toolbarItems() {return this.props.toolbarItems;}

    componentDidMount() {
        this.store.addChangeListener(this.refresh);
        super.componentDidMount();
    }
    componentWillUnmount() {
        this.store.removeChangeListener(this.refresh);
        super.componentWillUnmount();
    }
    render() {
        var toolbar;
        if (this.toolbarItems) {
            toolbar = (<ListViewToolbar {...this.properties}>
                {this.toolbarItems}
            </ListViewToolbar>);
        }
        return (
            <div className={this.className}>
                {toolbar}
                <Content {...this.properties}/>
                <ListViewPagination {...this.properties}/>
            </div>
        );
    }
}
