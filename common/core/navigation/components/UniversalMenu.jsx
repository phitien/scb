import React from 'react'
import NavigationBaseComponent from './Component'

export default class UniversalMenuComponent extends NavigationBaseComponent {
    get mainClassName() {return 'universal-menu'}

    render() {
        return <ul className={this.className}>
            {this.store.universalMenu.map((item,i) => <li key={i} className={item.url == this.store.rootPath ? 'active' : 'not-active'}><a href={item.url}><span>{item.title}</span></a></li>)}
        </ul>
    }
}
