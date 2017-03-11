import React from 'react'
import NavigationBaseComponent from 'apps/navigation/components/Component'
import SearchListComponent from 'apps/navigation/components/SearchList'

export default class SearchComponent extends NavigationBaseComponent {
    get mainClassName() {return 'search-component'}

    componentDidMount() {
        addEventListener('mousedown', this.viewportClick, false)
        this.searchInput.focus()
    }
    viewportClick = (e) => this.store.showSearchComponent = jQuery(e.target).closest(`.${this.mainClassName}`).length > 0
    onSearchChange = (e) => {
        this.store.filter('search', this.store.searchText)
        this.service.fetch()
        this.store.searchText = e.target.value
    }
    render() {
        return <div className={this.className}>
            <div className='container'>
                <div className='control'>
                    <i className='icon-search'></i>
                    <input type='text' placeholder='What are you searching for?' ref={e => this.searchInput = e}
                        onChange={this.onSearchChange} value={this.store.searchText}/>
                    <i className='icon-cancel' onClick={() => this.store.showSearchComponent = false}></i>
                </div>
            </div>
            <SearchListComponent/>
        </div>
    }
}
