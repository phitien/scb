import React from 'react'
import NavigationBaseComponent from './Component'

const location = typeof window != 'undefined' ? window.location : {hash: '', search: '', href: ''};

export default class TermsAndConditionsComponent extends NavigationBaseComponent {
    get mainClassName() {return 'terms-and-conditions'}

    link = (item) => !item.url || location.pathname == item.url ? <a><span>{item.title}</span></a> : <a href={item.url}><span>{item.title}</span></a>
    render() {
        return <ul className={this.className}>
            {this.store.termsAndConditionsMenu.map((item,i) => <li key={i}>
                {this.link(item)}
            </li>)}
        </ul>
    }
}
