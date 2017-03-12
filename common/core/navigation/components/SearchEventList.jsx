import React from 'react'
import NavigationBaseComponent from './Component'

export default class SearchEventListComponent extends NavigationBaseComponent {
    get mainClassName() {return 'block search-event-list'}
    get items() {
        return this.store.searchdata ? this.store.searchdata.events ? this.store.searchdata.events.results : [] : []
    }

    render() {
        if (!this.items || !this.items.length) return null
        return <div className={this.className}>
            <div className='block-title'>Events</div>
            <div className='block-items'>
                {this.items.map((item,i) => <div key={i} className='block-item'>
                    <a href={item.url}>{item.title}</a>
                </div>)}
            </div>
        </div>
    }
}
