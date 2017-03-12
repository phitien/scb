import React from 'react'
import NavigationBaseComponent from './Component'

const location = typeof window != 'undefined' ? window.location : {hash: '', search: '', href: ''};

export default class InfoMenuComponent extends NavigationBaseComponent {
    get mainClassName() {return 'info-menu'}

    link = (item) => !item.url || location.pathname == item.url ? <a><span>{item.title}</span></a> : <a href={item.url}><span>{item.title}</span></a>
    onMenuItemClick = (item) => () => {
        this.store.footerMenu.map(item => item.open = false)
        item.open = !item.open
        this.store.emitChange()
    }
    render() {
        return <ul className={this.className}>
            {this.store.footerMenu.map((item,i) => <li key={i} onClick={this.onMenuItemClick(item)} className={`${item.open ? 'open' : ''} ${item.children ? 'has-children' : ''}`}>
                {this.link(item)}
            </li>)}
        </ul>
    }
}
