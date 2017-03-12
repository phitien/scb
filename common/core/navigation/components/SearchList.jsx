import React from 'react'
import NavigationBaseComponent from './Component'
import SearchArticleListComponent from './SearchArticleList'
import SearchEventListComponent from './SearchEventList'
import SearchDealListComponent from './SearchDealList'

export default class SearchListComponent extends NavigationBaseComponent {
    get mainClassName() {return 'search-list'}

    render() {
        if (!this.store.searchdata) return null
        return <div className={this.className}>
            <div className='container'>
                <SearchArticleListComponent className='block'/>
                <SearchEventListComponent className='block'/>
                <SearchDealListComponent className='block'/>
            </div>
        </div>
    }
}
