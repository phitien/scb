import React from 'react'
import NavigationBaseComponent from './Component'

const location = typeof window != 'undefined' ? window.location : {hash: '', search: '', href: ''};

export default class SiteMenuComponent extends NavigationBaseComponent {
    get mainClassName() {return 'site-menu'}
    get siteMenuItems() {return this.store.siteMenuItems}
    get openingItem() {return this.openingItem}
    set openingItem(v) {this.openingItem = v}

    componentDidMount() {
        addEventListener('mousedown', this.viewportClick, false)
    }
    componentDidUpdate() {
        jQuery('site-navigation a.current').parents('li').addClass('active')
    }
    viewportClick = (e) => {
        if (jQuery(e.target).closest(`.site-menu`).length > 0 && jQuery(e.target).closest(`.has-children`).length > 0) {
            const domEl = jQuery(e.target).closest(`.has-children`)
            this.siteMenuItems.map(item => item.open = domEl.data('title') == item.title)
        }
        else {
            this.siteMenuItems.map(item => item.open = false)
        }
        this.store.emitChange()
    }
    link = (item) => !item.url || location.pathname == item.url ? <a className={item.url == location.pathname ? 'current' : ''}><span>{item.title}</span></a> : <a href={item.url}><span>{item.title}</span></a>
    subMenu = (children) => children ? <ul className='sub-menu'>
        {children.map((item,i) => <li key={i}>
            {this.link(item)}
        </li>)}
    </ul> : null
    render() {
        return <ul className={this.className}>
            {this.siteMenuItems.map((item,i) => <li key={i}
                data-title={item.title}
                className={`${item.open ? 'open' : ''} ${item.children ? 'has-children' : ''}`}>
                {this.link(item)}
                {this.subMenu(item.children)}
            </li>)}
        </ul>
    }
}
