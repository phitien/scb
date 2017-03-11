import React from 'react';
import BaseComponent from 'common/components/listview/BaseComponent';

export default class ListViewPagination extends BaseComponent {
    get mainClassName() {return 'list-view-paginatio';}

    goToPage = newpage => {
        if (newpage && newpage >= 1 && newpage <= this.store.numPages && newpage != this.store.page) {
            this.store.page = newpage;
            this.service.fetch();
        }
    }
    onSwitch = e => this.goToPage($(e.target).attr('data-page'))
    onPrevious = e => this.goToPage(this.store.page - 1)
    onNext = e => this.goToPage(this.store.page + 1)
    onPageChange = e => this.goToPage(e.target.value)
    onPageSizeChange = e => {
        this.store.page_size = e.target.value;
        this.service.fetch();
    }
    render() {
        var me = this;
        var numPages = this.store.numPages;
        var pagination, pagesize;
        var count = 0;

        switch (this.props.type) {
            case 'classic':
                if (this.store.page > 1) {
                    pagination.push(<span onClick={this.onPrevious} className='previous' key={count}>Prev</span>);
                    count++;
                }
                for (var i = 1; i <= numPages; i++) {
                    pagination.push(<span onClick={this.onSwitch} data-page={i} key={count}
                        className={i == this.store.page ? 'active' : 'not-active'}>{i}</span>);
                    count++;
                }
                if (this.store.page >= 1 && this.store.page <= numPages) {
                    pagination.push(<span onClick={this.onNext} className='next' key={count}>Next</span>);
                }
                break;
            case 'modern':
                break;
            default:
                var opts = [], pagesizeOpts = [];
                for (var i = 0; i < numPages; i++) {
                    opts.push(i + 1);
                }
                for (var i = 1; i <= 10; i++) {
                    pagesizeOpts.push(10*i);
                }
                pagination = (<div className='list-view-page'>
                    <label>Page: </label>
                    <select onChange={this.onPageChange} value={this.store.page}>
                        {opts.map(i => <option value={i} key={i}>{i}</option>)}
                    </select>
                    <label className='list-view-count'>/ {numPages}</label>
                </div>);
                break;
        }
        pagesize = (<div className='list-view-pagesize'>
            <label>Show: </label>
            <select onChange={this.onPageSizeChange} value={this.store.page_size}>
                {pagesizeOpts.map(i => <option value={i} key={i}>{i}</option>)}
            </select>
            <label> on 1 page</label>
        </div>);
        if (!this.props.hidePagination) {
            return (
                <div className={this.className}>
                    <label className='list-view-found'>{this.store.count} item(s) found</label>
                    {this.store.noPagination ? null : pagination}
                    {this.props.hidePageSize === true ? null : this.store.noPagination ? null : pagesize}
                </div>
            );
        }
    }
}
