import React from 'react'
import NavigationBaseComponent from 'apps/navigation/components/Component'

export default class SearchDealListComponent extends NavigationBaseComponent {
    get mainClassName() {return 'block search-deal-list'}
    get items() {
        return this.store.searchdata ? this.store.searchdata.deals ? this.store.searchdata.deals.results : [] : []
    }

    render() {
        if (!this.items || !this.items.length) return null
        return <div className={this.className}>
            <div className='block-title'>Deals</div>
            <div className='block-items'>
                {this.items.map((item,i) => <div key={i} className='block-item'>
                    <a href={`/business-vault/app/deals/${item.id}`}>{item.pitch.dealName} - {item.pitch.dealCaption}</a>
                </div>)}
            </div>
        </div>
    }
}
