import React from 'react'
import NavigationBaseComponent from './Component'

export default class SearchArticleListComponent extends NavigationBaseComponent {
    get mainClassName() {return 'block search-article-list'}
    get items() {
        return this.store.searchdata ? this.store.searchdata.posts ? this.store.searchdata.posts.results : [] : []
    }

    render() {
        if (!this.items || !this.items.length) return null
        return <div className={this.className}>
            <div className='block-title'>Articles</div>
            <div className='block-items'>
                {this.items.map((item,i) => <div key={i} className='block-item'>
                    <a href={item.url}>{item.title}</a>
                </div>)}
            </div>
        </div>
    }
}
