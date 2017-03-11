import React from 'react'
import NavigationBaseComponent from 'apps/navigation/components/Component'
import SearchArticleListComponent from 'apps/navigation/components/SearchArticleList'
import SearchEventListComponent from 'apps/navigation/components/SearchEventList'
import SearchDealListComponent from 'apps/navigation/components/SearchDealList'

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
